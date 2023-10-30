/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  eslint: {
    ignoreDuringBuilds: true
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'minio.voucherworld.net',
        port: '',
      }
    ]
  },
  output: 'export'
}

module.exports = nextConfig
