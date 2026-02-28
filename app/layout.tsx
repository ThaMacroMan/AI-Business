import type { Metadata, Viewport } from "next";
import { DM_Sans, Fraunces } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";

import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";

import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
});

const dmSans = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://prairiebusinessai.ca"),
  title: {
    default: "Prarie AI | Practical AI Implementation in Regina",
    template: "%s | Prarie AI",
  },
  description:
    "Prarie AI helps Regina businesses implement practical AI assistants, custom automations, and hands-on coaching.",
  applicationName: "Prarie AI",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Prarie AI",
    description:
      "Practical AI implementation for Regina businesses: assistants, automations, and coaching.",
    url: "https://prairiebusinessai.ca",
    siteName: "Prarie AI",
    locale: "en_CA",
    type: "website",
  },
  keywords: [
    "AI consultant Regina",
    "AI automation Regina",
    "business AI coaching",
    "AI assistant setup",
    "Prarie AI Regina",
  ],
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f6f1e7" },
    { media: "(prefers-color-scheme: dark)", color: "#14181d" },
  ],
  colorScheme: "light dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${fraunces.variable} ${dmSans.variable} antialiased`}>
        <a href="#main-content" className="skip-link">
          Skip to Main Content
        </a>
        <SiteHeader />
        {children}
        <SiteFooter />
        <Analytics />
      </body>
    </html>
  );
}
