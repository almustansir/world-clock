import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

/**
 * Configure Geist Sans font with a CSS variable.
 * This allows us to use 'var(--font-geist-sans)' in our Tailwind/CSS files.
 */
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

/**
 * Configure Geist Mono font.
 * Ideal for the digital clock display to ensure consistent character widths.
 */
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/**
 * Site-wide Metadata
 * -------------------
 * Used for SEO and browser tab titling.
 */
export const metadata: Metadata = {
  title: "🌍 World Digital Clocks",
  description:
    "A real-time global clock and weather dashboard built with Next.js 15 and Tailwind CSS v4.",
};

/**
 * Root Layout Component
 * ----------------------
 * The top-most layout that wraps all pages in the application.
 * It defines the <html> and <body> tags which are required for every Next.js app.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`
          ${geistSans.variable} 
          ${geistMono.variable} 
          antialiased 
          transition-colors 
          duration-300
        `}
      >
        {/* The {children} prop represents the content of the current page (page.tsx).
          By wrapping it here, we ensure the animated background and fonts 
          are applied to every view in the project.
        */}
        {children}
      </body>
    </html>
  );
}
