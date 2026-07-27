import {Montserrat, Inter} from "next/font/google";
import { Nunito_Sans } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";
import BackToTop from "../components/navigation/BackToTop";
import { createPageMetadata } from "./metadata";

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
export const metadata: Metadata = {
  metadataBase: new URL("https://burrito.money"),
  applicationName: "Burrito",
  ...createPageMetadata({
    title: "Burrito | Terra & Terra Classic",
    description:
      "Explore products and validator infrastructure for Terra and Terra Classic.",
    path: "/",
  }),
  icons: {
    icon: "/burrito-favicon.png",
    apple: "/apple-touch-icon.png",
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${montserrat.variable} ${nunito.variable} ${inter.variable}`}
    >
      <body className={`${montserrat.variable} ${nunito.variable} ${inter.variable}`}>
        {children}
        <BackToTop />
      </body>
    </html>
  );
}


