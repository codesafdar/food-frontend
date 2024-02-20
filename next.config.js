/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ['res.cloudinary.com'],
    formats: ["image/webp"],
  },
}

module.exports = nextConfig
