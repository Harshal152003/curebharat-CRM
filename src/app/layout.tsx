import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CureBharat CRM — Enterprise PDF Template Management",
  description:
    "Professional enterprise-grade CRM platform for dynamic PDF template management, customer management, and premium document generation.",
  keywords: "CRM, PDF, template, insurance, wellness, certificate, CureBharat",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Outfit:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
