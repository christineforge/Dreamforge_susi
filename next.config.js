/** @type {import('next').NextConfig} */
const nextConfig = {
  // Note: Removed 'output: export' for Vercel deployment
  // Vercel supports full Next.js with server-side rendering
  // If deploying to Azure Static Web Apps later, uncomment the line below:
  // output: 'export',
  trailingSlash: true,
  // Disable image optimization (not using next/image)
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig

