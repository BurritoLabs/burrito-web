import type { Metadata } from "next";
import { Inter, Montserrat, Nunito_Sans } from "next/font/google";
import "./globals.css";
import BackToTop from "../components/navigation/BackToTop";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800", "900"],
  variable: "--font-montserrat",
  display: "swap",
});

const nunito = Nunito_Sans({
  subsets: ["latin"],
  variable: "--font-nunito",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://burrito.money"),
  title: {
    default: "Burrito | Terra and Terra Classic Ecosystem",
    template: "%s | Burrito",
  },
  description:
    "Burrito brings together apps, AI, monitoring, exploration and validator infrastructure for Terra (LUNA) and Terra Classic (LUNC).",
  applicationName: "Burrito",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "Burrito",
    title: "Burrito for Terra and Terra Classic",
    description:
      "Apps, AI, monitoring, exploration and validator infrastructure for LUNA and LUNC.",
    url: "/",
    images: [
      {
        url: "/products/app.png",
        width: 1440,
        height: 900,
        alt: "Burrito ecosystem",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Burrito for Terra and Terra Classic",
    description:
      "Apps, AI, monitoring, exploration and validator infrastructure for LUNA and LUNC.",
    images: ["/products/app.png"],
  },
  robots: { index: true, follow: true },
  icons: {
    icon: "/burrito-favicon.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${montserrat.variable} ${nunito.variable} ${inter.variable}`}>
      <body>{children}<BackToTop /></body>
    </html>
  );
}
