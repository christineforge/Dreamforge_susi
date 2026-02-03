'use client'

import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

/**
 * Root page - stores redirect_uri and redirects to auth page
 * Client-side redirect for Vercel compatibility
 */
export default function Home() {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  useEffect(() => {
    // Store redirect_uri in sessionStorage so it persists through sign-in
    const redirectUri = searchParams.get('redirect_uri')
    if (redirectUri) {
      sessionStorage.setItem('dreamforge_redirect_uri', redirectUri)
    }
    
    router.push('/auth/sign-in')
  }, [router, searchParams])
  
  return null
}

