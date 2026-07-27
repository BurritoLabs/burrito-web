import type { NextConfig } from "next";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    "http://localhost:3000",
    "http://192.168.2.250:3000",
  ],
  images: {
    unoptimized: true,
  },
};

initOpenNextCloudflareForDev();

export default nextConfig;
