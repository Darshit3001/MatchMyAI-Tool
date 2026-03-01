import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import { Providers } from "@/components/Providers";
import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";
import { TimelineSidebar } from "@/components/layout/TimelineSidebar";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { SearchModal } from "@/components/search/SearchModal";
import { PWARegistration } from "@/components/PWARegistration";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#7C5CFC",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: "APT AI — Find The Perfect AI Tool For Any Task",
  description:
    "Discover, compare, and choose from thousands of AI tools. APT AI is your intelligent AI tool directory with smart recommendations, comparisons, and community reviews.",
  keywords: [
    "AI tools",
    "artificial intelligence",
    "AI directory",
    "AI comparison",
    "AI recommendations",
  ],
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "APT AI",
  },
  openGraph: {
    title: "APT AI — Find The Perfect AI Tool For Any Task",
    description:
      "Discover, compare, and choose from thousands of AI tools.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${plusJakarta.variable} ${jetbrainsMono.variable} antialiased`}
        style={{ fontFamily: "var(--font-inter)" }}
      >
        <Providers>
          <div className="flex min-h-screen">
            {/* Left Sidebar - Desktop */}
            <Sidebar />

            {/* Timeline Sidebar */}
            <TimelineSidebar />

            {/* Main content area */}
            <div className="flex-1 flex flex-col min-w-0">
              {/* Top Navigation */}
              <Navbar />

              {/* Page content */}
              <main className="flex-1">
                <ErrorBoundary>
                  {children}
                </ErrorBoundary>
              </main>
            </div>
          </div>

          {/* Mobile Bottom Navigation */}
          <MobileBottomNav />

          {/* Search Modal (global) */}
          <SearchModal />

          {/* PWA Service Worker */}
          <PWARegistration />
        </Providers>
      </body>
    </html>
  );
}
