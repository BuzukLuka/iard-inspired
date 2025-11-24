/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // 🆕 Next.js 15-д тохирсон remotePatterns
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "8000", // Django API
      },
      {
        protocol: "https",
        hostname: "**", // CDN эсвэл гадаад URL-ууд
      },
    ],
  },
  experimental: {
    // Турбопак эсвэл server actions зэрэг онцлогийг идэвхжүүлж болно
    turbo: true,
  },
};

export default nextConfig;
