import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Naveen Bisht | DevOps + Web Dev",
  description:
    "Portfolio of Naveen Bisht - DevOps Engineer & Web Developer specializing in Cloud, CI/CD, and modern web technologies.",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Naveen Bisht | DevOps + Web Dev",
    description:
      "Portfolio of Naveen Bisht - DevOps Engineer & Web Developer specializing in Cloud, CI/CD, and modern web technologies.",
    url: "https://portfolio.errorop.com",
    siteName: "Naveen Bisht Portfolio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Naveen Bisht | DevOps + Web Dev",
    description:
      "Portfolio of Naveen Bisht - DevOps Engineer & Web Developer specializing in Cloud, CI/CD, and modern web technologies.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Naveen Bisht",
  jobTitle: "DevOps Engineer & Web Developer",
  url: "https://portfolio.errorop.com",
  sameAs: [
    "https://www.linkedin.com/in/naveen-bisht-775410221",
    "https://github.com/naveenbish",
    "https://instagram.com/errorop003",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      style={{ scrollBehavior: "smooth" }}
    >
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(localStorage.getItem("theme")==="dark"||(!localStorage.getItem("theme")&&window.matchMedia("(prefers-color-scheme:dark)").matches)){document.documentElement.classList.add("dark")}}catch(e){}`,
          }}
        />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
