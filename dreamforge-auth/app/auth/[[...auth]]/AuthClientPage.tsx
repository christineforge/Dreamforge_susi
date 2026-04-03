'use client'
import Image from 'next/image'
import { SignIn, SignUp, useSignIn, useSignUp } from '@clerk/nextjs'
import { useParams, useSearchParams } from 'next/navigation'
import PremiumGlowCard from '@/components/ui/PremiumGlowCard'
import AmbientParticles from '@/components/ui/AmbientParticles'

const clerkAppearance = {
  variables: {
    colorPrimary: '#00BBA7',
    colorText: '#ffffff',
    colorInputText: '#ffffff',
    colorInputBackground: 'rgba(255,255,255,0.15)',
    colorBackground: 'transparent',
    fontFamily: 'var(--font-montserrat), Montserrat, sans-serif',
  },
  elements: {
    rootBox: {
      width: '100%',
      backgroundColor: 'transparent',
      boxShadow: 'none',
    },
    cardBox: {
      width: '100%',
      boxShadow: 'none',
    },
    card: {
      width: '100%',
      backgroundColor: 'transparent',
      boxShadow: 'none',
      padding: '0',
    },
    main: {
      width: '100%',
      gap: '0.75rem',
    },
    headerTitle: { display: 'none' },
    headerSubtitle: { display: 'none' },
    socialButtons: { display: 'none' },
    socialButtonsBlock: { display: 'none' },
    dividerRow: { display: 'none' },
    footerAction: { display: 'none' },
    footer: { display: 'none' },
    formFieldLabel: { color: '#fff' },
    formFieldInput: {
      borderRadius: '9999px',
      height: '48px',
      backgroundColor: 'rgba(255,255,255,0.12)',
      borderColor: 'rgba(255,255,255,0.25)',
      color: '#fff',
      width: '100%',
      boxSizing: 'border-box',
      transition: 'all 0.25s ease',
      '&::placeholder': {
        color: 'rgba(255, 255, 255, 0.4)',
      },
      '&:hover': {
        borderColor: 'rgba(255, 255, 255, 0.45)',
        backgroundColor: 'rgba(255,255,255,0.15)',
      },
      '&:focus': {
        borderColor: 'rgba(94, 0, 149, 0.7)',
        boxShadow: '0 0 0 2px rgba(94, 0, 149, 0.3), 0 0 16px rgba(94, 0, 149, 0.25)',
      },
    },
    form: {
      width: '100%',
      gap: '0.75rem',
    },
    formButtonPrimary: {
      borderRadius: '9999px',
      height: '44px',
      width: '100%',
      background: 'linear-gradient(135deg, #00BBA7 0%, #00B8DB 100%)',
      color: '#fff',
      fontSize: '1rem',
      fontWeight: '700',
      transition: 'all 0.2s ease',
      '&:hover': {
        transform: 'scale(1.02)',
        boxShadow:
          '0 0 20px rgba(0, 187, 167, 0.5), 0 0 40px rgba(0, 187, 167, 0.3)',
      },
      '&:active': {
        transform: 'scale(0.98)',
        boxShadow:
          '0 0 24px rgba(0, 187, 167, 0.6), 0 0 48px rgba(0, 187, 167, 0.4)',
      },
    },
  },
}

export default function AuthClientPage() {
  const params = useParams<{ auth?: string[] }>()
  const searchParams = useSearchParams()
  const { signIn } = useSignIn()
  const { signUp } = useSignUp()
  const authSegments = params?.auth ?? []
  const isSignInFlow =
    authSegments[0] === 'sign-in' ||
    searchParams.get('mode') === 'sign-in'

  // Only allow relative redirect URLs (starting with /) to prevent open redirect attacks
  const redirectUrl = searchParams.get('redirect_url')
  const safeRedirectUrl =
    redirectUrl && redirectUrl.startsWith('/') && !redirectUrl.startsWith('//')
      ? redirectUrl
      : null

  function handleOAuth(strategy: 'oauth_apple' | 'oauth_facebook' | 'oauth_google') {
    const postAuthUrl = safeRedirectUrl || '/'
    if (isSignInFlow) {
      if (!signIn) return
      signIn.sso({
        strategy,
        redirectCallbackUrl: '/auth/callback',
        redirectUrl: postAuthUrl,
      })
    } else {
      if (!signUp) return
      signUp.sso({
        strategy,
        redirectCallbackUrl: '/auth/callback',
        redirectUrl: postAuthUrl,
      })
    }
  }

  return (
    <>
      <main className="auth-background">
        <section className="auth-container">
          <AmbientParticles />

          <Image
            src="/images/logo.png"
            alt="DreamForge"
            width={200}
            height={72}
            priority
            style={{
              width: 'min(45vw, 200px)',
              height: 'auto',
            }}
          />

          <PremiumGlowCard>
            <div className="card-content">
              <h1 className="auth-title">
                {isSignInFlow ? 'Sign in' : 'Create your account'}
              </h1>

              <div className="auth-toggle">
                <span>
                  {isSignInFlow
                    ? "Don't have an account?"
                    : 'Have an account?'}
                </span>
                <button
                  className="signin-pill"
                  type="button"
                  onClick={() => {
                    const target = isSignInFlow ? '/auth' : '/auth?mode=sign-in'
                    const separator = target.includes('?') ? '&' : '?'
                    window.location.href = safeRedirectUrl
                      ? `${target}${separator}redirect_url=${encodeURIComponent(safeRedirectUrl)}`
                      : target
                  }}
                >
                  {isSignInFlow ? 'Sign up' : 'Sign in'}
                </button>
              </div>

              <div className="divider">or</div>

              <div className="social-buttons">
                <button
                  className="social-button"
                  type="button"
                  aria-label="Continue with Apple"
                  onClick={() => handleOAuth('oauth_apple')}
                >
                  <Image src="/icons/apple.svg" alt="" width={20} height={20} />
                </button>

                <button
                  className="social-button"
                  type="button"
                  aria-label="Continue with Facebook"
                  onClick={() => handleOAuth('oauth_facebook')}
                >
                  <Image src="/icons/facebook.svg" alt="" width={20} height={20} />
                </button>

                <button
                  className="social-button"
                  type="button"
                  aria-label="Continue with Google"
                  onClick={() => handleOAuth('oauth_google')}
                >
                  <Image src="/icons/google.svg" alt="" width={20} height={20} />
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
    </>
  )
}
