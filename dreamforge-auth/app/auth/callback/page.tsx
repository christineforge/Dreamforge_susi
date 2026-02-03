'use client'

import { useAuth, useUser } from '@clerk/nextjs'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

/**
 * Callback page - handles post-authentication redirect to Unity
 * Gets the session token from Clerk and redirects to Unity with the token
 * 
 * Note: This is a client component, so it doesn't need generateStaticParams
 * but we need to ensure it doesn't use any server-side APIs
 */
export default function CallbackPage() {
  const { getToken, isLoaded, isSignedIn } = useAuth()
  const { user } = useUser()
  const router = useRouter()
  const [status, setStatus] = useState<'loading' | 'redirecting' | 'error'>('loading')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const handleRedirect = async () => {
      // Wait for Clerk to be fully loaded
      if (!isLoaded) {
        return
      }

      // Check if user is signed in
      if (!isSignedIn) {
        setError('Not authenticated. Redirecting to sign-in...')
        setTimeout(() => {
          router.push('/auth/sign-in')
        }, 2000)
        return
      }

      try {
        // Get the session token from Clerk
        const token = await getToken()
        
        if (!token) {
          setError('Failed to get session token. Redirecting to sign-in...')
          setTimeout(() => {
            router.push('/auth/sign-in')
          }, 2000)
          return
        }

        setStatus('redirecting')

        // Get Unity redirect URL from environment variable or use default
        // Format: unity://auth?token=TOKEN or custom://auth?token=TOKEN
        // For web-based Unity builds, use full URL: https://your-unity-app.com/auth?token=TOKEN
        const unityUrlScheme = process.env.NEXT_PUBLIC_UNITY_URL_SCHEME || 'unity://'
        
        // Check if it's a full URL (http/https) or a custom scheme
        const isFullUrl = unityUrlScheme.startsWith('http://') || unityUrlScheme.startsWith('https://')
        const redirectUrl = isFullUrl
          ? `${unityUrlScheme}?token=${encodeURIComponent(token)}`
          : `${unityUrlScheme}auth?token=${encodeURIComponent(token)}`

        // Redirect to Unity
        // For web-based Unity builds, use window.location.href
        // For native Unity apps, use custom URL scheme
        window.location.href = redirectUrl

        // Fallback: if Unity doesn't handle the redirect (for custom schemes), show a message
        // Note: This timeout won't fire if the redirect succeeds
        if (!isFullUrl) {
          setTimeout(() => {
            setError('Unity app not found. Please make sure Unity is installed and can handle the redirect.')
            setStatus('error')
          }, 3000)
        }

      } catch (err) {
        console.error('Error getting token:', err)
        setError('Failed to get authentication token. Please try again.')
        setStatus('error')
      }
    }

    handleRedirect()
  }, [isLoaded, isSignedIn, getToken, router])

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0a0a1a 0%, #1a0a2e 50%, #16213e 100%)',
      color: '#ffffff',
      fontFamily: 'var(--font-montserrat), Montserrat, sans-serif',
      padding: '2rem'
    }}>
      {status === 'loading' && (
        <>
          <div style={{
            width: '50px',
            height: '50px',
            border: '4px solid rgba(0, 212, 255, 0.3)',
            borderTop: '4px solid #00d4ff',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            marginBottom: '1rem'
          }} />
          <p style={{ fontSize: '1.1rem', opacity: 0.9 }}>Authenticating...</p>
        </>
      )}

      {status === 'redirecting' && (
        <>
          <div style={{
            width: '50px',
            height: '50px',
            border: '4px solid rgba(0, 212, 255, 0.3)',
            borderTop: '4px solid #00d4ff',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            marginBottom: '1rem'
          }} />
          <p style={{ fontSize: '1.1rem', opacity: 0.9 }}>Redirecting to Unity...</p>
          <p style={{ fontSize: '0.9rem', opacity: 0.7, marginTop: '0.5rem' }}>
            If Unity doesn't open automatically, please check your Unity app.
          </p>
        </>
      )}

      {status === 'error' && error && (
        <>
          <p style={{ fontSize: '1.1rem', color: '#ff6b6b', marginBottom: '1rem' }}>Error</p>
          <p style={{ fontSize: '0.9rem', opacity: 0.8 }}>{error}</p>
        </>
      )}

      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}

