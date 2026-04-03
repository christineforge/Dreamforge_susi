import type { Metadata } from 'next'
import { ClerkProvider } from '@clerk/nextjs'
import { Montserrat } from 'next/font/google'
import './globals.css'

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'DreamForge Auth',
  description: 'Minimal authentication UI for design iteration',
}

/**
 * Root layout component
 * Wraps the entire app with ClerkProvider for authentication
 * Applies global dark sci-fi theme with glassmorphism-ready styling
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!}
    >
      <html lang="en">
        <body 
          className={montserrat.variable}
          style={{
            margin: 0,
            padding: 0,
            backgroundColor: '#0a0a1a',
            color: '#ffffff',
            fontFamily: 'var(--font-montserrat), Montserrat, sans-serif',
            minHeight: '100vh',
          }}
        >
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}

