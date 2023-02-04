/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "icons8.com",
        port: "",
        pathname: "/icon/**",
      },
    ],
    domains: ["https://upload.wikimedia.org", "https://icons8.com"],
  },
};
