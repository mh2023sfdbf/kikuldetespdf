/** @type {import('next').NextConfig} */
const nextConfig = {
  // Next 14 compatible externalization for server components.
  experimental: {
    serverComponentsExternalPackages: ['pdf-lib', '@pdf-lib/fontkit'],
  },
  images: {
    domains: ['images.unsplash.com'],
  },
}

module.exports = nextConfig 
