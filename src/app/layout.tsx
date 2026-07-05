import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";
import { CursorProvider } from "@/components/ui/CustomCursor";
import { SavedProvider } from "@/components/SavedContext";
import LenisProvider from "@/components/ui/LenisProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ECHO Projects | Justin Jacob Saju",
  description: "A curated collection of my experiments, demos, and live projects - VLSI, Embedded Systems, Web Apps, and more.",
  openGraph: {
    title: "ECHO Projects | Justin Jacob Saju",
    description: "Explore my portfolio of VLSI designs, embedded systems, virtual labs, and web applications.",
    url: "https://projects.justinsaju.me",
    siteName: "ECHO Projects",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ECHO Projects | Justin Jacob Saju",
    description: "Explore my portfolio of VLSI designs, embedded systems, virtual labs, and web applications.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider>
          <CursorProvider>
            <SavedProvider>
              <LenisProvider>
                <Navbar />
                <main>{children}</main>
                <Footer />
              </LenisProvider>
            </SavedProvider>
          </CursorProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
