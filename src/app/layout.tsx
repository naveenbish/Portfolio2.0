import type { Metadata, Viewport } from "next";
import {
  Caveat,
  Geist,
  Geist_Mono,
  IBM_Plex_Serif,
} from "next/font/google";

import { InlineScript } from "@/components/inline-script";
import { site } from "@/data/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "latin-ext"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin", "latin-ext"],
});

const plexSerif = IBM_Plex_Serif({
  variable: "--font-plex-serif",
  subsets: ["latin", "latin-ext", "vietnamese"],
  weight: "400",
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin", "latin-ext"],
});

export const metadata: Metadata = {
  title: site.name,
  description: site.description,
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#09090b" },
  ],
};

// Runs before first paint so the saved / system theme never flashes.
const themeScript = `(function(){try{var t=localStorage.getItem("theme");var d=t?t==="dark":matchMedia("(prefers-color-scheme: dark)").matches;document.documentElement.classList.toggle("dark",d)}catch(e){}})()`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${plexSerif.variable} ${caveat.variable}`}
    >
      <head>
        <InlineScript html={themeScript} />
      </head>
      <body className="min-h-svh font-sans antialiased">{children}</body>
    </html>
  );
}
