import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "media.istockphoto.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "t3.ftcdn.net",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "necessary-ladybug-115.convex.cloud",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "**",
      },
    ],
    domains: ["scintillating-gecko-931.convex.cloud", "github.com"],
  },
};

export default nextConfig;
