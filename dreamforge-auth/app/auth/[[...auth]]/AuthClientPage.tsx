'use client'
import Image from 'next/image'
import { SignIn, SignUp } from '@clerk/nextjs'
import { useParams, useSearchParams } from 'next/navigation'
import PremiumGlowCard from '@/components/ui/PremiumGlowCard'
import AmbientParticles from '@/components/ui/AmbientParticles'

// Clerk appearance configuration for DreamForge theme
const clerkAppearance = {
  variables: {
    colorPrimary: '#7a3cff',
    colorBackground: 'transparent',
    colorInputBackground: 'rgba(255, 255, 255, 0.05)',
    colorInputText: '#ffffff',
    colorText: '#ffffff',
    colorTextSecondary: 'rgba(255, 255, 255, 0.7)',
    fontFamily: 'var(--font-montserrat), Montserrat, sans-serif',
    fontSize: '0.95rem',
    borderRadius: '0.5rem',
  },
  elements: {
    formButtonPrimary: {
      fontSize: '0.95rem',
      fontWeight: '600',
      background: 'linear-gradient(135deg, #7a3cff 0%, #b24dff 100%)',
      boxShadow: '0 0 0 1px rgba(168, 111, 255, 0.25)',
      '&:hover': {
        background: 'linear-gradient(135deg, #8a4cff 0%, #c25dff 100%)',
        boxShadow: '0 0 0 1px rgba(0, 212, 255, 0.45), 0 0 18px rgba(0, 212, 255, 0.35)',
      },
    },
    formFieldInput: {
      fontSize: '0.95rem',
      minHeight: '44px',
      borderColor: 'rgba(255, 255, 255, 0.22)',
      '&:focus': {
        boxShadow: '0 0 0 2px rgba(0, 212, 255, 0.42), 0 0 20px rgba(0, 212, 255, 0.35)',
        borderColor: 'rgba(0, 212, 255, 0.8)',
      },
      '&:hover': {
        boxShadow: '0 0 0 1px rgba(0, 212, 255, 0.45), 0 0 18px rgba(0, 212, 255, 0.35)',
        borderColor: 'rgba(0, 212, 255, 0.65)',
      },
    },
    card: {
      backgroundColor: 'transparent',
      boxShadow: 'none',
    },
    headerTitle: {
      fontSize: '1.5rem',
      fontWeight: '700',
      color: '#ffffff',
    },
    headerSubtitle: {
      color: 'rgba(255, 255, 255, 0.7)',
    },
    socialButtonsIconButton: {
      borderColor: 'rgba(255, 255, 255, 0.22)',
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
      '&:hover': {
        boxShadow: '0 0 0 1px rgba(0, 212, 255, 0.45), 0 0 18px rgba(0, 212, 255, 0.35)',
        borderColor: 'rgba(0, 212, 255, 0.65)',
      },
    },
    footerActionLink: {
      color: 'rgba(255, 255, 255, 0.85)',
      '&:hover': {
        color: '#ffffff',
      },
    },
  },
}

export default function AuthClientPage() {
  const params = useParams<{ auth?: string[] }>()
  const searchParams = useSearchParams()
  const authSegments = params?.auth ?? []
  const isSignInPath = authSegments[0] === 'sign-in'
  const isSignInMode = searchParams.get('mode') === 'sign-in'
  const isSignInFlow = isSignInPath || isSignInMode

  return (
    <>
      <main
        className="auth-background"
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1rem',
        }}
      >
        <section
          className="auth-section"
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: '28rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1.5rem',
          }}
        >
          <AmbientParticles />
          <Image
            src="/images/logo.png"
            alt="DreamForge"
            width={200}
            height={72}
            priority
            style={{
              display: 'block',
              width: 'min(45vw, 200px)',
              height: 'auto',
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          />
          <PremiumGlowCard>
              <div style={{ width: '100%', position: 'relative' }}>
              <div
                style={{
                  position: 'absolute',
                  top: '5.6rem',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  zIndex: 3,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  whiteSpace: 'nowrap',
                  gap: '0.75rem',
                  color: 'rgba(255, 255, 255, 0.85)',
                }}
              >
                <span>{isSignInFlow ? "Don't have an account?" : 'Have an account?'}</span>
                <button
                  type="button"
                  className="signin-pill"
                  onClick={() => {
                    const currentParams = new URLSearchParams(window.location.search)
                    const redirectUrl = currentParams.get('redirect_url')
                    const target = isSignInFlow ? '/auth' : '/auth?mode=sign-in'
                    const separator = target.includes('?') ? '&' : '?'
                    window.location.href = redirectUrl
                      ? `${target}${separator}redirect_url=${encodeURIComponent(redirectUrl)}`
                      : target
                  }}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid rgba(255, 255, 255, 0.5)',
                    borderRadius: '9999px',
                    background: 'rgba(255, 255, 255, 0.08)',
                    color: '#ffffff',
                    textDecoration: 'none',
                    padding: '0.45rem 0.9rem',
                    cursor: 'pointer',
                  }}
                >
                  {isSignInFlow ? 'Sign up' : 'Sign in'}
                </button>
              </div>
              {isSignInFlow ? (
                <SignIn appearance={clerkAppearance} />
              ) : (
                <SignUp appearance={clerkAppearance} />
              )}
              </div>
          </PremiumGlowCard>
        </section>
      </main>
      <style jsx global>{`
        .auth-background {
          background-color: #070218;
          background-image: url('/images/DreamForge-Latest-BG.png?v=3');
          background-position: center bottom;
          background-size: cover;
          background-repeat: no-repeat;
        }

        /* Layout overrides - keep form centered and full width */
        .cl-main,
        .cl-form {
          display: flex !important;
          flex-direction: column !important;
          margin-left: auto !important;
          margin-right: auto !important;
          width: 100% !important;
        }

        .cl-formField,
        .cl-formFieldRow,
        .cl-formFieldInput {
          width: 100% !important;
          max-width: none !important;
        }

        .cl-rootBox,
        .cl-cardBox,
        .cl-card,
        .cl-header,
        .cl-headerTitle {
          margin-left: auto !important;
          margin-right: auto !important;
          text-align: center !important;
        }

        /* Social buttons layout */
        .cl-socialButtons,
        .cl-socialButtonsBlock {
          display: flex !important;
          flex-direction: row !important;
          justify-content: center !important;
          gap: 0.75rem !important;
          width: 100% !important;
        }

        .cl-socialButtonsIconButton,
        .cl-socialButtonsBlockButton {
          width: 5.4rem !important;
          min-width: 5.4rem !important;
          height: 2rem !important;
        }

        .cl-socialButtonsBlockButtonText,
        .cl-socialButtonsButtonText {
          display: none !important;
        }

        /* Custom sign-in/sign-up toggle pill */
        .signin-pill {
          font-family: var(--font-montserrat), Montserrat, sans-serif !important;
          transition:
            background 0.2s ease,
            box-shadow 0.2s ease,
            border-color 0.2s ease,
            transform 0.15s ease !important;
        }

        .signin-pill:hover,
        .signin-pill:focus-visible {
          background: linear-gradient(135deg, #7a3cff 0%, #b24dff 100%) !important;
          border-color: rgba(208, 160, 255, 0.8) !important;
          box-shadow: 0 0 0 1px rgba(168, 111, 255, 0.45), 0 0 16px rgba(140, 72, 255, 0.4) !important;
          outline: none !important;
        }

        .signin-pill:active {
          background: linear-gradient(135deg, #6a2feb 0%, #9f3ff1 100%) !important;
          transform: translateY(1px) scale(0.99) !important;
          box-shadow: 0 0 0 1px rgba(156, 96, 255, 0.5), 0 0 12px rgba(124, 60, 240, 0.35) !important;
        }

        @media (max-width: 768px) {
          .auth-background {
            background-size: contain;
            background-position: center bottom;
          }
        }
      `}</style>
    </>
  )
}
