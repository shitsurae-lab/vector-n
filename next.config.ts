import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    qualities: [75, 80],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "naname-lab.net",
        port: "",
        pathname: "/**", //すべての画像パスを許可
      },
    ],
  },
};

export default nextConfig;
