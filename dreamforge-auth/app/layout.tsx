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
      appearance={{
        // Dark theme base for white text, but with transparent card
        baseTheme: 'dark' as const,
        variables: {
          colorPrimary: '#00d4ff', // Teal-blue accent
          colorText: '#ffffff', // White text for all text outside inputs
          colorBackground: 'transparent', // Transparent background
          colorInputBackground: 'rgba(255, 255, 255, 0.2)', // White glass input background
          colorInputText: '#ffffff', // White text for input fields
          borderRadius: '0.75rem', // Rounded buttons and inputs
        },
        elements: {
          // Continue button - teal-blue gradient (will be overridden by CSS)
          formButtonPrimary: {
            borderRadius: '0.75rem',
            background: 'linear-gradient(135deg, #00d4ff 0%, #00b8d4 100%)',
            backgroundColor: '#00d4ff',
            color: '#ffffff',
            fontFamily: 'var(--font-montserrat), Montserrat, sans-serif',
            '&:hover': {
              background: 'linear-gradient(135deg, #00e5ff 0%, #00d4ff 100%)',
              backgroundColor: '#00e5ff',
            },
          },
          // White glassmorphism card - handled by CSS
          card: {
            backgroundColor: 'transparent',
            boxShadow: 'none',
            border: 'none',
          },
          // Input styling - white glass handled by CSS
          formFieldInput: {
            borderRadius: '9999px', // Perfectly rounded
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            borderColor: 'rgba(255, 255, 255, 0.3)',
            borderWidth: '1px',
            color: '#ffffff', // White text
            '&:focus': {
              borderColor: 'rgba(0, 212, 255, 0.5)',
              boxShadow: '0 0 0 2px rgba(0, 212, 255, 0.2)',
            },
          },
          // Hide only "Secured by Clerk" footer, keep sign-in link visible
          footerPages: {
            display: 'none',
          },
          // Footer container - dark, transparent, blends with main card
          formFooter: {
            backgroundColor: 'rgba(10, 10, 26, 0.6)', // Dark transparent background
            border: 'none',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)', // Subtle divider
            borderRadius: '0 0 1.5rem 1.5rem', // Rounded bottom corners
            padding: '1.5rem 0 1rem 0',
            marginTop: '1.5rem',
            opacity: 0.85, // Reduced contrast
          },
          // Footer action container
          footerAction: {
            color: 'rgba(255, 255, 255, 0.7)', // Reduced contrast text
            fontFamily: 'var(--font-montserrat), Montserrat, sans-serif',
            fontSize: '0.875rem',
            fontWeight: 400,
            textAlign: 'center',
          },
          // Footer action link (Sign in / Sign up)
          formFooterActionLink: {
            color: 'rgba(0, 212, 255, 0.8)', // Teal with reduced opacity
            fontFamily: 'var(--font-montserrat), Montserrat, sans-serif',
            fontSize: '0.875rem',
            fontWeight: 500,
            textDecoration: 'none',
            transition: 'color 0.2s ease',
            '&:hover': {
              color: 'rgba(0, 212, 255, 1)', // Full opacity on hover
            },
          },
          // Footer text (for any additional footer text)
          footerText: {
            color: 'rgba(255, 255, 255, 0.5)', // Very subtle
            fontFamily: 'var(--font-montserrat), Montserrat, sans-serif',
            fontSize: '0.75rem',
            opacity: 0.6,
          },
          socialButtonsBlockButton: {
            borderColor: 'rgba(255, 255, 255, 0.3)',
            backgroundColor: 'rgba(255, 255, 255, 0.15)',
            '&:hover': {
              borderColor: 'rgba(255, 255, 255, 0.4)',
              backgroundColor: 'rgba(255, 255, 255, 0.25)',
            },
          },
        },
      }}
    >
      <html lang="en">
        <body className={montserrat.variable}>{children}</body>
      </html>
    </ClerkProvider>
  )
}

