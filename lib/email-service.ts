import nodemailer from "nodemailer";

export class EmailDeliveryError extends Error {
  errorType: string;
  errorDetails: Record<string, unknown>;

  constructor(
    message: string,
    errorType: string = "general",
    errorDetails: Record<string, unknown> = {}
  ) {
    super(message);
    this.name = "EmailDeliveryError";
    this.errorType = errorType;
    this.errorDetails = errorDetails;
  }
}

function createTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_SERVER || "smtp.gmail.com",
    port: parseInt(process.env.SMTP_PORT || "587"),
    secure: false,
    auth: {
      user: process.env.SMTP_USERNAME,
      pass: process.env.SMTP_PASSWORD,
    },
  });
}

export async function sendContactEmail(
  name: string,
  email: string,
  subject: string,
  message: string
): Promise<boolean> {
  const transporter = createTransporter();

  try {
    await transporter.verify();
  } catch {
    throw new EmailDeliveryError(
      "Email service configuration error. Please try again later."
    );
  }

  const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Contact Form Submission</title>
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');

            body {
                font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
                line-height: 1.6;
                color: #333;
                background-color: #f9f9f9;
                margin: 0;
                padding: 0;
            }

            .container {
                max-width: 580px;
                margin: 0 auto;
                background: #fff;
                border: 1px solid #eaeaea;
                border-radius: 5px;
                overflow: hidden;
            }

            .header {
                padding: 25px;
                background-color: #c2410c;
                color: white;
                text-align: center;
            }

            .header h1 {
                margin: 0;
                font-size: 22px;
                font-weight: 600;
            }

            .content {
                padding: 25px;
            }

            .field {
                margin-bottom: 20px;
            }

            .field-label {
                display: block;
                font-size: 14px;
                color: #c2410c;
                font-weight: 500;
                margin-bottom: 5px;
            }

            .field-value {
                display: block;
                font-size: 16px;
                background-color: #f9f9f9;
                padding: 12px;
                border-radius: 4px;
                border: 1px solid #eaeaea;
            }

            .message {
                white-space: pre-wrap;
                word-wrap: break-word;
            }

            .timestamp {
                font-size: 13px;
                color: #777;
                margin-top: 20px;
                text-align: right;
                font-style: italic;
            }

            .footer {
                padding: 15px 25px;
                text-align: center;
                font-size: 13px;
                color: #777;
                border-top: 1px solid #eaeaea;
                background-color: #f9f9f9;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>Portfolio Contact Form</h1>
            </div>

            <div class="content">
                <div class="field">
                    <span class="field-label">Name</span>
                    <span class="field-value">${name}</span>
                </div>

                <div class="field">
                    <span class="field-label">Email</span>
                    <span class="field-value">${email}</span>
                </div>

                ${subject ? `
                <div class="field">
                    <span class="field-label">Subject</span>
                    <span class="field-value">${subject}</span>
                </div>
                ` : ""}

                <div class="field">
                    <span class="field-label">Message</span>
                    <span class="field-value message">${message}</span>
                </div>

                <div class="timestamp">
                    Submitted on ${new Date().toLocaleString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                </div>
            </div>

            <div class="footer">
                <p>&copy; ${new Date().getFullYear()} ErrorOp. All rights reserved.</p>
            </div>
        </div>
    </body>
    </html>
  `;

  const mailOptions = {
    from: `"${name}" <${process.env.SMTP_USERNAME}>`,
    to: process.env.COMPANY_EMAIL,
    replyTo: email,
    subject: `${subject || "Contact Form"} - from ${name}`,
    text: `
Name: ${name}
Email: ${email}
${subject ? `Subject: ${subject}\n` : ""}Message: ${message}

Timestamp: ${new Date().toISOString()}
    `,
    html: htmlContent,
  };

  try {
    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    if (error instanceof Error) {
      if (
        error.message.includes("authentication") ||
        error.message.includes("EAUTH")
      ) {
        throw new EmailDeliveryError(
          "Email authentication failed. Please check your email configuration."
        );
      } else if (error.message.includes("ECONNREFUSED")) {
        throw new EmailDeliveryError(
          "Unable to connect to email server. Please try again later."
        );
      } else if (error.message.includes("Invalid login")) {
        throw new EmailDeliveryError(
          "Invalid email credentials. Please verify your app password."
        );
      }
    }

    throw new EmailDeliveryError(
      "Failed to send email. Please try again later."
    );
  }
}
