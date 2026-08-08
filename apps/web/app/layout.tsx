import {Montserrat, Inter} from "next/font/google";
import { Nunito_Sans } from "next/font/google";
import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import BackToTop from "../components/navigation/BackToTop";
import { createPageMetadata } from "./metadata";
import { BurritoThemeProvider } from "@burritolabs/ui";
import { burritoThemeBootstrapScript } from "@burritolabs/ui/theme-script";
import "@burritolabs/ui/tokens.css";

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
    icon: [
      { url: "/favicon.ico", type: "image/x-icon" },
      { url: "/burrito-favicon.png", type: "image/png", sizes: "64x64" },
    ],
    shortcut: "/favicon.ico",
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
      suppressHydrationWarning
      className={`${montserrat.variable} ${nunito.variable} ${inter.variable}`}
    >
      <head>
        <meta name="theme-color" content="#070D0B" />
      </head>
      <body className={`${montserrat.variable} ${nunito.variable} ${inter.variable}`}>
        <Script
          id="burrito-theme-bootstrap"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: burritoThemeBootstrapScript }}
        />
        <BurritoThemeProvider>
          {children}
          <BackToTop />
        </BurritoThemeProvider>
      </body>
    </html>
  );
}


