import { NextRequest, NextResponse } from "next/server";
import { sendContactEmail, EmailDeliveryError } from "@/lib/email-service";
import { checkRateLimit } from "@/lib/rate-limiter";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateContactForm(data: Record<string, unknown>) {
  const errors: Record<string, string> = {};

  if (!data.name || typeof data.name !== "string") {
    errors.name = "Name is required";
  } else if (data.name.length < 2 || data.name.length > 100) {
    errors.name = "Name must be between 2 and 100 characters";
  }

  if (!data.email || typeof data.email !== "string") {
    errors.email = "Email is required";
  } else if (!emailRegex.test(data.email)) {
    errors.email = "Invalid email format";
  }

  if (!data.message || typeof data.message !== "string") {
    errors.message = "Message is required";
  } else if (data.message.length < 2 || data.message.length > 2000) {
    errors.message = "Message must be between 2 and 2000 characters";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export async function POST(request: NextRequest) {
  try {
    const ip =
      request.headers.get("x-forwarded-for") ||
      request.headers.get("x-real-ip") ||
      "unknown";

    const rateLimitResult = checkRateLimit(ip);

    if (!rateLimitResult.allowed) {
      const resetTime = rateLimitResult.resetTime.toISOString();
      const minutesUntilReset = Math.ceil(
        (new Date(resetTime).getTime() - Date.now()) / (60 * 1000)
      );

      return NextResponse.json(
        {
          message: "Rate limit exceeded. Please try again later.",
          success: false,
          errors: {
            form: `You've reached the maximum number of submissions. Please try again in ${minutesUntilReset} minutes.`,
          },
        },
        {
          status: 429,
          headers: {
            "X-RateLimit-Limit": "20",
            "X-RateLimit-Remaining": rateLimitResult.remaining.toString(),
            "X-RateLimit-Reset": resetTime,
            "Retry-After": (minutesUntilReset * 60).toString(),
          },
        }
      );
    }

    const data = await request.json();

    const validation = validateContactForm(data);
    if (!validation.isValid) {
      return NextResponse.json(
        {
          message: "Invalid form data",
          success: false,
          errors: validation.errors,
        },
        { status: 400 }
      );
    }

    await sendContactEmail(
      (data.name as string).trim(),
      (data.email as string).toLowerCase().trim(),
      data.subject ? (data.subject as string).trim() : "",
      (data.message as string).trim()
    );

    return NextResponse.json(
      {
        message: "Thank you for your message. We will get back to you soon.",
        success: true,
        remaining: rateLimitResult.remaining,
      },
      {
        status: 200,
        headers: {
          "X-RateLimit-Limit": "20",
          "X-RateLimit-Remaining": rateLimitResult.remaining.toString(),
          "X-RateLimit-Reset": rateLimitResult.resetTime.toISOString(),
        },
      }
    );
  } catch (error) {
    if (error instanceof EmailDeliveryError) {
      return NextResponse.json(
        {
          message: "Failed to send your message. Please try again later.",
          success: false,
          errors: { email: error.message },
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        message: "An error occurred while processing your message",
        success: false,
        errors: {
          server:
            error instanceof Error ? error.message : "Unknown error",
        },
      },
      { status: 500 }
    );
  }
}
