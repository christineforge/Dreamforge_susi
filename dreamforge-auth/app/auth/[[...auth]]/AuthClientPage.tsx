'use client'
import Image from 'next/image'
import { SignIn, SignUp } from '@clerk/nextjs'
import { useParams, useSearchParams } from 'next/navigation'
import InteractiveGlowCard from '@/components/ui/InteractiveGlowCard'
import CardParticles from '@/components/ui/CardParticles'

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
          style={{
            width: '100%',
            maxWidth: '28rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1.5rem',
          }}
        >
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
          <InteractiveGlowCard>
            <CardParticles />
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
              {isSignInFlow ? <SignIn /> : <SignUp />}
            </div>
          </InteractiveGlowCard>
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

        .cl-formFieldInputShowPasswordButton {
          width: auto !important;
          max-width: none !important;
          min-width: auto !important;
          right: 0.85rem !important;
          left: auto !important;
          margin-left: 0 !important;
          transform: none !important;
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

        .cl-divider,
        .cl-dividerRow {
          order: 3 !important;
          justify-content: center !important;
        }

        .cl-socialButtons,
        .cl-socialButtonsBlock {
          order: 4 !important;
          display: flex !important;
          flex-direction: row !important;
          flex-wrap: nowrap !important;
          justify-content: center !important;
          align-items: center !important;
          gap: 0.75rem !important;
          width: 100% !important;
        }

        .cl-socialButtonsIconButton,
        .cl-socialButtonsBlockButton {
          position: relative !important;
          width: 5.4rem !important;
          min-width: 5.4rem !important;
          max-width: 5.4rem !important;
          height: 2rem !important;
          padding: 0 !important;
          border-width: 0.35px !important;
          border-color: rgba(255, 255, 255, 0.22) !important;
          border-style: solid !important;
          border-radius: 0.5rem !important;
          background: rgba(255, 255, 255, 0.05) !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          gap: 0 !important;
          column-gap: 0 !important;
          row-gap: 0 !important;
          padding-left: 0 !important;
          padding-right: 0 !important;
          text-align: center !important;
        }

        .cl-socialButtonsBlockButtonText,
        .cl-socialButtonsButtonText {
          display: none !important;
        }

        .cl-socialButtonsProviderIcon {
          width: 1.05rem !important;
          height: 1.05rem !important;
          margin: 0 !important;
          display: block !important;
          position: static !important;
          transform: none !important;
          left: auto !important;
          right: auto !important;
        }

        .cl-socialButtonsIconButton svg,
        .cl-socialButtonsIconButton img,
        .cl-socialButtonsBlockButton svg,
        .cl-socialButtonsBlockButton img {
          position: absolute !important;
          left: 50% !important;
          top: 50% !important;
          transform: translate(-50%, -50%) !important;
          margin: 0 !important;
        }

        .cl-socialButtonsBlockButton > *,
        .cl-socialButtonsIconButton > * {
          margin: 0 !important;
          align-self: center !important;
        }

        .cl-socialButtonsBlockButton svg,
        .cl-socialButtonsIconButton svg,
        .cl-socialButtonsBlockButton img,
        .cl-socialButtonsIconButton img {
          margin: 0 auto !important;
          display: block !important;
        }

        .cl-formButtonPrimary,
        .cl-socialButtonsBlockButton,
        .cl-socialButtonsIconButton,
        .cl-footerActionLink,
        .cl-formFieldInput {
          transition:
            box-shadow 0.2s ease,
            border-color 0.2s ease,
            background-color 0.2s ease,
            transform 0.15s ease !important;
        }

        .cl-formButtonPrimary:hover,
        .cl-socialButtonsBlockButton:hover,
        .cl-socialButtonsIconButton:hover,
        .cl-footerActionLink:hover,
        .cl-formFieldInput:hover {
          box-shadow: 0 0 0 1px rgba(0, 212, 255, 0.45), 0 0 18px rgba(0, 212, 255, 0.35) !important;
          border-color: rgba(0, 212, 255, 0.65) !important;
        }

        .cl-formButtonPrimary:focus-visible,
        .cl-socialButtonsBlockButton:focus-visible,
        .cl-socialButtonsIconButton:focus-visible,
        .cl-footerActionLink:focus-visible,
        .cl-formFieldInput:focus-visible {
          outline: none !important;
          box-shadow: 0 0 0 2px rgba(0, 212, 255, 0.42), 0 0 20px rgba(0, 212, 255, 0.35) !important;
          border-color: rgba(0, 212, 255, 0.8) !important;
        }

        .cl-formButtonPrimary:active,
        .cl-socialButtonsBlockButton:active,
        .cl-socialButtonsIconButton:active,
        .cl-footerActionLink:active {
          transform: translateY(1px) scale(0.99) !important;
          box-shadow: 0 0 0 2px rgba(0, 212, 255, 0.35), 0 0 14px rgba(0, 212, 255, 0.3) !important;
        }

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
