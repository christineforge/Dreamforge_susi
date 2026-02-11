'use client'

import { useAuth } from '@clerk/nextjs'
import { useEffect, useState, useRef } from 'react'
import { useSearchParams } from 'next/navigation'

export default function CallbackPage() {
  const { getToken, isLoaded, isSignedIn } = useAuth()
  const searchParams = useSearchParams()
  const [status, setStatus] = useState<'loading' | 'redirecting' | 'error'>('loading')
  const [error, setError] = useState<string | null>(null)
  const hasRedirected = useRef(false)

  const redirectPort = searchParams.get('redirect_port') || '8976'

  useEffect(() => {
    const handleRedirect = async () => {
      if (hasRedirected.current) return
      if (!isLoaded) return

      if (!isSignedIn) {
        setError('Not authenticated. Redirecting to sign-in...')
        setTimeout(() => {
          window.location.href = `/auth/sign-in?redirect_port=${redirectPort}`
        }, 1500)
        return
      }

      try {
        setStatus('redirecting')
        
        let token: string | null = null
        for (let attempt = 0; attempt < 5; attempt++) {
          try {
            token = await getToken()
            if (token) break
          } catch (tokenError) {
            console.log(`Token attempt ${attempt + 1} failed, retrying...`)
            if (attempt < 4) {
              await new Promise(resolve => setTimeout(resolve, 300))
            }
          }
        }
        
        if (!token) {
          throw new Error('Failed to retrieve authentication token')
        }

        hasRedirected.current = true
        
        window.location.href = `http://localhost:${redirectPort}/?token=${encodeURIComponent(token)}`
        
      } catch (err) {
        console.error('Redirect error:', err)
        setError(err instanceof Error ? err.message : 'Failed to redirect')
        setStatus('error')
      }
    }

    handleRedirect()
  }, [isLoaded, isSignedIn, getToken, redirectPort])

  if (status === 'loading') {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0a0a1a 0%, #1a0a2e 50%, #0a0a1a 100%)',
        color: '#ffffff',
        fontFamily: 'var(--font-montserrat), Montserrat, sans-serif',
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Authenticating...</div>
          <div style={{ fontSize: '0.875rem', opacity: 0.7 }}>Please wait</div>
        </div>
      </div>
    )
  }

  if (status === 'error') {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0a0a1a 0%, #1a0a2e 50%, #0a0a1a 100%)',
        color: '#ffffff',
        fontFamily: 'var(--font-montserrat), Montserrat, sans-serif',
        padding: '2rem',
        textAlign: 'center',
      }}>
        <div style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#ff6b6b' }}>Error</div>
        <div style={{ fontSize: '0.875rem', opacity: 0.7, marginBottom: '2rem' }}>{error}</div>
        <a
          href={`/auth/sign-in?redirect_port=${redirectPort}`}
          style={{
            padding: '0.75rem 2rem',
            background: 'linear-gradient(135deg, #00d4ff 0%, #00b8d4 100%)',
            color: '#ffffff',
            borderRadius: '0.75rem',
            textDecoration: 'none',
            fontWeight: 500,
          }}
        >
          Return to Sign In
        </a>
      </div>
    )
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0a0a1a 0%, #1a0a2e 50%, #0a0a1a 100%)',
      color: '#ffffff',
      fontFamily: 'var(--font-montserrat), Montserrat, sans-serif',
    }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Launching game...</div>
        <div style={{ fontSize: '0.875rem', opacity: 0.7 }}>Please wait</div>
      </div>
    </div>
  )
}
