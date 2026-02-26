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
        layout: {
          socialButtonsVariant: 'iconButton',
        },
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
            borderRadius: '9999px',
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
          formFooter: {
            display: 'flex',
            justifyContent: 'center',
          },
          footerAction: {
            display: 'flex',
            justifyContent: 'center',
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
            marginBottom: '2.9rem',
          },
          main: {
            display: 'flex',
            flexDirection: 'column',
          },
          form: {
            order: 4,
          },
          divider: {
            order: 2,
          },
          socialButtonsBlockButton: {
            border: '0.5px solid rgba(255, 255, 255, 0.75)',
            borderColor: 'rgba(255, 255, 255, 0.95)',
            borderWidth: '0.5px',
            borderStyle: 'solid',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '0.65rem',
            width: '3.35rem',
            minWidth: '3.35rem',
            maxWidth: '3.35rem',
            height: '3.35rem',
            padding: 0,
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            flex: '0 0 auto',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            '&:hover': {
              borderColor: 'rgba(255, 255, 255, 1)',
              backgroundColor: 'rgba(255, 255, 255, 0.14)',
            },
          },
          socialButtonsProviderIcon: {
            margin: 0,
            width: '1.35rem',
            height: '1.35rem',
          },
          socialButtonsBlockButtonText: {
            display: 'none',
          },
          socialButtonsBlockButtonArrow: {
            display: 'none',
          },
          socialButtonsBlock: {
            order: 3,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '0.75rem',
            flexWrap: 'nowrap',
            width: '100%',
            overflowX: 'auto',
          },
          dividerRow: {
            order: 2,
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            margin: '0.1rem 0 0.7rem 0',
          },
          dividerLine: {
            display: 'block',
            flex: 1,
            height: '1px',
            background: 'rgba(255, 255, 255, 0.35)',
          },
          dividerText: {
            display: 'block',
            margin: '0 0.75rem',
            color: 'rgba(255, 255, 255, 0.9)',
            fontSize: '0.85rem',
            textTransform: 'lowercase',
          },
          // Also target the button element inside
          socialButtonsBlockButtonButton: {
            border: '1px solid rgba(255, 255, 255, 0.95)',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
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

