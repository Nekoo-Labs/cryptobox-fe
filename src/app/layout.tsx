import type { Metadata } from "next";
import { Audiowide } from "next/font/google";
import "@rainbow-me/rainbowkit/styles.css";
import "./globals.css";
import { Providers } from "./providers";
import { Navbar, Footer } from "@/components";

const audiowide = Audiowide({
  variable: "--font-audiowide",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "CryptoBox - Open Mystery Crypto Boxes",
  description:
    "Join the most secure and exciting platform for NFT mystery boxes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${audiowide.variable} antialiased flex flex-col min-h-screen`}
      >
        <Providers>
          <Navbar />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
