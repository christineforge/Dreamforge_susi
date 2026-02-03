'use client'

import { useAuth } from '@clerk/nextjs'
import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'

/**
 * Callback page for Unity authentication
 * Handles the redirect from Clerk and passes JWT token back to Unity
 */
export default function CallbackPage() {
  const { getToken, userId } = useAuth()
  const searchParams = useSearchParams()
  const router = useRouter()
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [token, setToken] = useState<string | null>(null)

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Get the redirect URI from query params (Unity passes this)
        const redirectUri = searchParams.get('redirect_uri') || 
                           searchParams.get('unity_callback')
        
        // Get the JWT token from Clerk
        const jwtToken = await getToken()
        
        if (!jwtToken || !userId) {
          setStatus('error')
          return
        }

        setToken(jwtToken)

        // If Unity provided a callback URL, redirect with token
        if (redirectUri) {
          try {
            // Parse the redirect URI
            const url = new URL(redirectUri)
            url.searchParams.set('token', jwtToken)
            url.searchParams.set('user_id', userId)
            url.searchParams.set('success', 'true')
            
            // Redirect to Unity (custom URL scheme or deep link)
            window.location.href = url.toString()
            setStatus('success')
          } catch (urlError) {
            // If it's not a valid URL, it might be a custom scheme (e.g., myapp://)
            const callbackUrl = `${redirectUri}?token=${encodeURIComponent(jwtToken)}&user_id=${encodeURIComponent(userId)}&success=true`
            window.location.href = callbackUrl
            setStatus('success')
          }
        } else {
          // No redirect URI - display token for manual copy (fallback)
          setStatus('success')
        }
      } catch (error) {
        console.error('Callback error:', error)
        setStatus('error')
      }
    }

    if (userId) {
      handleCallback()
    }
  }, [getToken, userId, searchParams, router])

  if (status === 'loading') {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        color: 'white',
        fontFamily: 'system-ui'
      }}>
        <div>
          <h2>Completing authentication...</h2>
          <p>Please wait while we prepare your token.</p>
        </div>
      </div>
    )
  }

  if (status === 'error') {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        color: 'white',
        fontFamily: 'system-ui'
      }}>
        <div>
          <h2>Authentication Error</h2>
          <p>Failed to complete authentication. Please try again.</p>
        </div>
      </div>
    )
  }

  // Success - token ready
  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column',
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh',
      color: 'white',
      fontFamily: 'system-ui',
      padding: '2rem',
      textAlign: 'center'
    }}>
      <h2>Authentication Successful!</h2>
      {token ? (
        <div style={{ marginTop: '2rem', maxWidth: '600px' }}>
          <p>Your token has been sent to Unity.</p>
          <p style={{ fontSize: '0.9rem', color: '#aaa', marginTop: '1rem' }}>
            If Unity didn't receive the token automatically, you can copy it below:
          </p>
          <textarea
            readOnly
            value={token}
            style={{
              width: '100%',
              minHeight: '100px',
              marginTop: '1rem',
              padding: '1rem',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '8px',
              color: 'white',
              fontFamily: 'monospace',
              fontSize: '0.8rem'
            }}
          />
        </div>
      ) : (
        <p>Redirecting to Unity...</p>
      )}
    </div>
  )
}

