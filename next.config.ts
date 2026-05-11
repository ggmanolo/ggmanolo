import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // Performance optimizations
  compress: true,
  poweredByHeader: false,

  // Image optimization
  images: {
    formats: ["image/webp", "image/avif"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    qualities: [75, 100],
  },

  // Security headers
  async headers() {
    const ContentSecurityPolicy = [
      "default-src 'self'",
      // Next.js hydration + inline JSON-LD structured data script + GSAP/canvas eval
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://va.vercel-scripts.com https://vercel.live",
      // CSS modules + Next.js injects inline styles
      "style-src 'self' 'unsafe-inline' https://vercel.live",
      // next/font downloads fonts at build time, served from self
      "font-src 'self' https://vercel.live https://assets.vercel.com",
      // Local images + data URIs (inline SVGs) + Vercel toolbar assets
      "img-src 'self' data: https://vercel.live https://vercel.com",
      // Vercel Analytics + Vercel toolbar websocket/beacon
      "connect-src 'self' https://vitals.vercel-insights.com https://va.vercel-scripts.com https://vercel.live wss://ws-us3.pusher.com",
      // Vercel toolbar iframe
      "frame-src https://vercel.live",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join("; ")

    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: ContentSecurityPolicy,
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
          // Replaced by frame-ancestors in CSP, kept for older browsers
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
        ],
      },
    ]
  },
}

export default nextConfig
