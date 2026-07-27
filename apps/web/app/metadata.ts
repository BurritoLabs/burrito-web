import type { Metadata } from "next";

const SOCIAL_IMAGE = {
  url: "/burrito-social.jpg",
  width: 1200,
  height: 630,
  alt: "Burrito products and infrastructure for Terra and Terra Classic",
};

type PageMetadata = {
  title: string;
  description: string;
  path: `/${string}` | "/";
};

export function createPageMetadata({
  title,
  description,
  path,
}: PageMetadata): Metadata {
  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      type: "website",
      siteName: "Burrito",
      url: path,
      title,
      description,
      images: [SOCIAL_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [SOCIAL_IMAGE.url],
    },
  };
}
