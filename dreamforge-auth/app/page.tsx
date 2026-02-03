'use client'

import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useClerk, useUser } from '@clerk/nextjs'

/**
 * Root page - signs out first to ensure fresh sign-in, then redirects
 * Client-side redirect for Vercel compatibility
 */
export default function Home() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { signOut } = useClerk()
  const { isSignedIn, isLoaded } = useUser()
  
  useEffect(() => {
    async function handleRedirect() {
      if (!isLoaded) return
      
      const redirectUri = searchParams.get('redirect_uri')
      
      // Store redirect_uri for callback page
      if (redirectUri) {
        sessionStorage.setItem('dreamforge_redirect_uri', redirectUri)
      }
      
      // Always sign out first so user sees fresh sign-in options
      if (isSignedIn) {
        await signOut()
      }
      
      // Redirect to sign-in page
      if (redirectUri) {
        router.push(`/auth/sign-in?redirect_uri=${encodeURIComponent(redirectUri)}`)
      } else {
        router.push('/auth/sign-in')
      }
    }
    
    handleRedirect()
  }, [router, searchParams, signOut, isSignedIn, isLoaded])
  
  return null
}

