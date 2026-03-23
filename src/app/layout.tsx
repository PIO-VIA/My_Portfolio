import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { I18nProvider } from "@/context/I18nContext";
import PageTransition from "@/components/client/PageTransition";
import Navbar from "@/components/client/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pio-Via | Full-Stack Portfolio",
  description: "Modern portfolio of a Senior Full-Stack Engineer - High-end digital experiences.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning className="dark scroll-smooth">
      <body className={`${inter.className} bg-[#050505] text-[#ededed] antialiased`}>
        <I18nProvider>
          <Navbar />
          <PageTransition>
            <main>
              {children}
            </main>
          </PageTransition>
        </I18nProvider>
      </body>
    </html>
  );
}
