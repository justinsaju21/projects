import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Projects Hub | Justin Jacob Saju",
  description: "A curated collection of my experiments, demos, and live projects - VLSI, Embedded Systems, Web Apps, and more.",
  openGraph: {
    title: "Projects Hub | Justin Jacob Saju",
    description: "Explore my portfolio of VLSI designs, embedded systems, virtual labs, and web applications.",
    url: "https://projects.justinsaju.me",
    siteName: "Justin's Projects Hub",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects Hub | Justin Jacob Saju",
    description: "Explore my portfolio of VLSI designs, embedded systems, virtual labs, and web applications.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 z-50 glass">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <a href="https://justinsaju.me" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center text-white font-bold text-lg">
                J
              </div>
              <span className="text-lg font-semibold text-foreground group-hover:text-[var(--accent-cyan)] transition-colors">
                Justin Jacob Saju
              </span>
            </a>
            <div className="flex items-center gap-6">
              <a
                href="https://justinsaju.me"
                className="text-sm text-[var(--foreground-muted)] hover:text-[var(--accent-cyan)] transition-colors"
              >
                ← Back to Gateway
              </a>
            </div>
          </div>
        </nav>

        {children}
      </body>
    </html>
  );
}
