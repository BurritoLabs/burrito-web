import {Montserrat, Inter} from "next/font/google";
import { Nunito_Sans } from "next/font/google";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import BackToTop from "../components/navigation/BackToTop";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-montserrat",
});
const nunito = Nunito_Sans({
  subsets: ["latin"],
  variable: "--font-nunito",
  weight: ["400", "500", "600", "700"],
});
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
export const metadata: Metadata = {
  title: "Burrito",
  description: "The Gateway to Terra Classic",
  icons: {
    icon: "/burrito-favicon.png",
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${montserrat.variable} ${nunito.variable} ${inter.variable}`}>
  <body className={`${montserrat.variable} ${nunito.variable} ${inter.variable}`}>
    {children}
    <BackToTop />
  </body>
</html>
  );
}


