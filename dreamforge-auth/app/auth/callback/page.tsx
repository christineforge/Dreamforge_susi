'use client'

import { useAuth, useUser } from '@clerk/nextjs'
import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'

/**
 * Callback page - handles post-authentication redirect to Unity
 * Gets the JWT token from Clerk and immediately redirects to Unity with the token
 * 
 * This handles:
 * - Immediate redirect after sign-in/sign-up (including OAuth)
 * - JWT token retrieval for Azure backend authentication
 * - Session task handling (bypasses if possible)
 * - All authentication methods (email, OAuth, social)
 */
export default function CallbackPage() {
  const { getToken, isLoaded, isSignedIn, sessionId } = useAuth()
  const { user } = useUser()
  const router = useRouter()
  const [status, setStatus] = useState<'loading' | 'redirecting' | 'error'>('loading')
  const [error, setError] = useState<string | null>(null)
  const hasRedirected = useRef(false) // Prevent multiple redirects

  useEffect(() => {
    const handleRedirect = async () => {
      // Prevent multiple redirect attempts
      if (hasRedirected.current) {
        return
      }

      // Wait for Clerk to be fully loaded
      if (!isLoaded) {
        return
      }

      // Check if user is signed in
      // Note: We check isSignedIn, but even if pending, we'll try to get token
      // This allows us to redirect even if there are session tasks
      if (!isSignedIn && !sessionId) {
        setError('Not authenticated. Redirecting to sign-in...')
        setTimeout(() => {
          router.push('/auth/sign-in')
        }, 1500)
        return
      }

      try {
        setStatus('redirecting')
        
        // Get JWT token from Clerk
        // getToken() returns a JWT that can be used with Azure backend
        // We use treatPendingAsSignedOut: false to get token even if session is pending
        let token: string | null = null
        
        // Try to get token - retry a few times if needed
        for (let attempt = 0; attempt < 5; attempt++) {
          try {
            // Get token - this returns a JWT that Azure can verify
            token = await getToken({ 
              template: undefined, // Use default JWT template
              // If you have a custom JWT template in Clerk Dashboard, specify it here:
              // template: 'your-template-name'
            })
            
            if (token) {
              break
            }
          } catch (tokenError) {
            console.log(`Token attempt ${attempt + 1} failed, retrying...`, tokenError)
            if (attempt < 4) {
              await new Promise(resolve => setTimeout(resolve, 300)) // Wait 300ms before retry
            }
          }
        }
        
        if (!token) {
          // Last attempt: try without any options
          token = await getToken()
        }
        
        if (!token) {
          throw new Error('Failed to retrieve authentication token')
        }

        // Get Unity URL scheme from environment variable
        const unityUrlScheme = process.env.NEXT_PUBLIC_UNITY_URL_SCHEME || 'unity://'
        
        // Build the redirect URL with token
        const redirectUrl = `${unityUrlScheme}auth?token=${encodeURIComponent(token)}`
        
        // Mark as redirected to prevent multiple redirects
        hasRedirected.current = true
        
        // Redirect to Unity
        window.location.href = redirectUrl
        
      } catch (err) {
        console.error('Redirect error:', err)
        setError(err instanceof Error ? err.message : 'Failed to redirect to Unity')
        setStatus('error')
        
        // Fallback: redirect to sign-in after error
        setTimeout(() => {
          router.push('/auth/sign-in')
        }, 3000)
      }
    }

    handleRedirect()
  }, [isLoaded, isSignedIn, sessionId, getToken, router])

  // Loading/error UI
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
          href="/auth/sign-in"
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

  // Redirecting state
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
        <div style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Redirecting to Unity...</div>
        <div style={{ fontSize: '0.875rem', opacity: 0.7 }}>Please wait</div>
      </div>
    </div>
  )
}

