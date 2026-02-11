'use client'

import { useState, useEffect, useRef } from 'react'
import { useSearchParams } from 'next/navigation'
import Image from 'next/image'

const CLERK_DOMAIN = process.env.NEXT_PUBLIC_CLERK_DOMAIN || 'clerk.playdreamforge.com'
const CLERK_CLIENT_ID = process.env.NEXT_PUBLIC_CLERK_CLIENT_ID || ''

export default function SignUpClient() {
  const searchParams = useSearchParams()
  const [isLoading, setIsLoading] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)

  const redirectUri = searchParams.get('redirect_uri') || ''
  const codeChallenge = searchParams.get('code_challenge') || ''
  const codeChallengeMethod = searchParams.get('code_challenge_method') || 'S256'
  const state = searchParams.get('state') || ''
  const scope = searchParams.get('scope') || 'openid profile email offline_access'
  const clientId = searchParams.get('client_id') || CLERK_CLIENT_ID

  const buildOAuthUrl = (provider?: string) => {
    const params = new URLSearchParams({
      client_id: clientId,
      redirect_uri: redirectUri,
      response_type: 'code',
      scope: scope,
      state: state,
      code_challenge: codeChallenge,
      code_challenge_method: codeChallengeMethod,
      prompt: 'login',
    })
    
    if (provider) {
      params.set('provider', provider)
    }
    
    return `https://${CLERK_DOMAIN}/oauth/authorize?${params.toString()}`
  }

  const handleOAuthLogin = (provider?: string) => {
    if (!redirectUri || !codeChallenge || !state) {
      console.error('Missing required OAuth parameters')
      return
    }
    setIsLoading(true)
    window.location.href = buildOAuthUrl(provider)
  }

  useEffect(() => {
    const card = cardRef.current
    const glow = glowRef.current
    if (!card || !glow) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect()
      const isInside = (
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom
      )

      if (isInside) {
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        glow.style.left = `${x}px`
        glow.style.top = `${y}px`
        glow.style.opacity = '1'
      } else {
        glow.style.opacity = '0'
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const missingParams = !redirectUri || !codeChallenge || !state

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem',
      background: 'url("/images/background.jpg") center center / cover no-repeat fixed, linear-gradient(135deg, #0a0a1a 0%, #1a0a2e 50%, #0a0a1a 100%)',
      backgroundColor: '#0a0a1a',
    }}>
      <div style={{ width: '100%', maxWidth: '380px', position: 'relative' }}>
        <div
          ref={cardRef}
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 50%, rgba(255, 255, 255, 0.05) 100%)',
            backdropFilter: 'blur(15px) saturate(180%)',
            WebkitBackdropFilter: 'blur(15px) saturate(180%)',
            borderRadius: '1.5rem',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.15)',
            padding: '2rem',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div
            ref={glowRef}
            style={{
              position: 'absolute',
              width: '300px',
              height: '300px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(70, 0, 182, 0.55) 0%, rgba(70, 0, 182, 0.4) 25%, rgba(70, 0, 182, 0.2) 50%, transparent 70%)',
              pointerEvents: 'none',
              transform: 'translate(-50%, -50%)',
              filter: 'blur(70px)',
              opacity: 0,
              transition: 'opacity 0.15s ease-out',
              zIndex: 0,
            }}
          />

          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
              <Image
                src="/images/logo.png"
                alt="DreamForge"
                width={80}
                height={80}
                style={{ margin: '0 auto 1rem' }}
              />
              <h1 style={{
                fontSize: '1.5rem',
                fontWeight: 600,
                color: '#ffffff',
                margin: 0,
              }}>
                Create account
              </h1>
              <p style={{
                fontSize: '0.875rem',
                color: 'rgba(255, 255, 255, 0.7)',
                marginTop: '0.5rem',
              }}>
                Have an account? <a href={`/auth/sign-in?${searchParams.toString()}`} style={{ color: '#9d4edd', textDecoration: 'none', fontWeight: 500 }}>Sign in</a>
              </p>
            </div>

            {missingParams ? (
              <div style={{
                padding: '1rem',
                backgroundColor: 'rgba(255, 107, 107, 0.1)',
                borderRadius: '0.75rem',
                border: '1px solid rgba(255, 107, 107, 0.3)',
                textAlign: 'center',
              }}>
                <p style={{ color: '#ff6b6b', margin: 0, fontSize: '0.875rem' }}>
                  Missing OAuth parameters. Please launch sign-up from the game.
                </p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <button
                  onClick={() => handleOAuthLogin('oauth_google')}
                  disabled={isLoading}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.75rem',
                    padding: '0.875rem 1rem',
                    backgroundColor: 'rgba(255, 255, 255, 0.06)',
                    border: '1px solid rgba(255, 255, 255, 1)',
                    borderRadius: '0.5rem',
                    color: '#ffffff',
                    fontSize: '0.9375rem',
                    fontWeight: 500,
                    cursor: isLoading ? 'not-allowed' : 'pointer',
                    opacity: isLoading ? 0.7 : 1,
                    transition: 'background-color 0.2s',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.06)'}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Continue with Google
                </button>

                <button
                  onClick={() => handleOAuthLogin('oauth_discord')}
                  disabled={isLoading}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.75rem',
                    padding: '0.875rem 1rem',
                    backgroundColor: 'rgba(255, 255, 255, 0.06)',
                    border: '1px solid rgba(255, 255, 255, 1)',
                    borderRadius: '0.5rem',
                    color: '#ffffff',
                    fontSize: '0.9375rem',
                    fontWeight: 500,
                    cursor: isLoading ? 'not-allowed' : 'pointer',
                    opacity: isLoading ? 0.7 : 1,
                    transition: 'background-color 0.2s',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.06)'}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="#5865F2">
                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                  </svg>
                  Continue with Discord
                </button>

                <button
                  onClick={() => handleOAuthLogin('oauth_apple')}
                  disabled={isLoading}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.75rem',
                    padding: '0.875rem 1rem',
                    backgroundColor: 'rgba(255, 255, 255, 0.06)',
                    border: '1px solid rgba(255, 255, 255, 1)',
                    borderRadius: '0.5rem',
                    color: '#ffffff',
                    fontSize: '0.9375rem',
                    fontWeight: 500,
                    cursor: isLoading ? 'not-allowed' : 'pointer',
                    opacity: isLoading ? 0.7 : 1,
                    transition: 'background-color 0.2s',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.06)'}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="#ffffff">
                    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                  </svg>
                  Continue with Apple
                </button>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  margin: '0.5rem 0',
                }}>
                  <div style={{ flex: 1, height: '1px', backgroundColor: 'rgba(255, 255, 255, 0.2)' }} />
                  <span style={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '0.75rem' }}>or</span>
                  <div style={{ flex: 1, height: '1px', backgroundColor: 'rgba(255, 255, 255, 0.2)' }} />
                </div>

                <button
                  onClick={() => handleOAuthLogin()}
                  disabled={isLoading}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.75rem',
                    padding: '0.875rem 1rem',
                    background: 'linear-gradient(135deg, #00d4ff 0%, #00b8d4 100%)',
                    border: 'none',
                    borderRadius: '9999px',
                    color: '#ffffff',
                    fontSize: '0.9375rem',
                    fontWeight: 600,
                    cursor: isLoading ? 'not-allowed' : 'pointer',
                    opacity: isLoading ? 0.7 : 1,
                    transition: 'background 0.2s',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'linear-gradient(135deg, #00e5ff 0%, #00d4ff 100%)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'linear-gradient(135deg, #00d4ff 0%, #00b8d4 100%)'}
                >
                  Continue with Email
                </button>
              </div>
            )}

            {isLoading && (
              <div style={{
                marginTop: '1rem',
                textAlign: 'center',
                color: 'rgba(255, 255, 255, 0.7)',
                fontSize: '0.875rem',
              }}>
                Redirecting to create account...
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
