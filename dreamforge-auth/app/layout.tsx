import type { Metadata } from 'next'
import { ClerkProvider } from '@clerk/nextjs'
import { Montserrat } from 'next/font/google'

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
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || ''}
      appearance={{
        // Dark theme base for white text, but with transparent card
        // baseTheme removed - using custom variables instead
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
          // Card styling - glassmorphism effect
          card: {
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 50%, rgba(255, 255, 255, 0.05) 100%)',
            backdropFilter: 'blur(15px) saturate(180%)',
            WebkitBackdropFilter: 'blur(15px) saturate(180%)',
            borderRadius: '1.5rem',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.15)',
          },
          // Input styling - white glass
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
          // Hide only "Secured by Clerk" footer
          footerPages: {
            display: 'none',
          },
          // Hide the entire formFooter (black rectangle)
          formFooter: {
            display: 'none',
          },
          // Hide footer action (bottom links)
          footerAction: {
            display: 'none',
          },
          // Hide header subtitle
          headerSubtitle: {
            display: 'none',
          },
          // Center header content
          header: {
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          },
          // Center logo
          logoBox: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            margin: '0 auto',
          },
          // Center header title
          headerTitle: {
            textAlign: 'center',
            width: '100%',
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
            borderColor: 'rgba(255, 255, 255, 1)',
            borderWidth: '1px',
            borderStyle: 'solid',
            backgroundColor: 'rgba(255, 255, 255, 0.06)',
            borderRadius: '0.5rem',
            '&:hover': {
              borderColor: 'rgba(255, 255, 255, 1)',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
            },
          },
        },
      }}
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

