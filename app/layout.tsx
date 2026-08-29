import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { portfolio } from "@/data/portfolio";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? portfolio.seo.siteUrl;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: portfolio.seo.title,
  description: portfolio.seo.description,
  keywords: [
    "AI developer",
    "software engineer",
    "full-stack developer",
    "machine learning engineer",
    "portfolio",
  ],
  authors: [{ name: portfolio.person.name }],
  creator: portfolio.person.name,
  openGraph: {
    type: "website",
    url: "/",
    title: portfolio.seo.title,
    description: portfolio.seo.description,
    siteName: `${portfolio.person.name} Portfolio`,
    images: [
      {
        url: "/og.png",
        width: 1731,
        height: 908,
        alt: `${portfolio.person.name} — ${portfolio.person.role}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: portfolio.seo.title,
    description: portfolio.seo.description,
    images: ["/og.png"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5f9ff" },
    { media: "(prefers-color-scheme: dark)", color: "#071426" },
  ],
};

const themeScript = `
  try {
    const saved = localStorage.getItem('portfolio-theme');
    const preferred = matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    document.documentElement.dataset.theme = saved === 'dark' || saved === 'light' ? saved : preferred;
  } catch (_) {}
`;

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
