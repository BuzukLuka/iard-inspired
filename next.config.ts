/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "8000", // Django API (хэрвээ хааяа localhost ашиглавал)
        pathname: "/media/**",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1", // <-- ЧИНИЙ ОДОО АШИГЛАЖ БАЙГАА
        port: "8000",
        pathname: "/media/**", // зөвхөн /media/... зураг зөвшөөрнө
      },
      {
        protocol: "https",
        hostname: "**", // CDN/гадаад https зураг
      },
    ],
  },
  experimental: {
    turbo: true,
  },
};

export default nextConfig;
