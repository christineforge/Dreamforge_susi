'use client'

import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

/**
 * Root page - passes redirect_uri through URL to sign-in page
 * Client-side redirect for Vercel compatibility
 */
export default function Home() {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  useEffect(() => {
    const redirectUri = searchParams.get('redirect_uri')
    
    // Pass redirect_uri through URL params (more reliable than sessionStorage)
    if (redirectUri) {
      router.push(`/auth/sign-in?redirect_uri=${encodeURIComponent(redirectUri)}`)
    } else {
      router.push('/auth/sign-in')
    }
  }, [router, searchParams])
  
  return null
}

