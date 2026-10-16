import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "For My Purnima 🌹 · Happy Birthday My Love ✨",
  description: "A private, heartfelt birthday surprise created just for my Purnima.",
  robots: "noindex,nofollow",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="grain text-[var(--cream)] antialiased">
        {children}
      </body>
    </html>
  );
}
