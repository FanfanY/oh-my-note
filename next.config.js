/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: { styledComponents: true },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
        port: '',
        pathname: '/18888628835/image-cloud/main/**',
      },
    ],
  },
}

module.exports = nextConfig
