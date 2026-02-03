'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

/**
 * Root page - redirects to auth page
 * Client-side redirect for Vercel compatibility
 */
export default function Home() {
  const router = useRouter()
  
  useEffect(() => {
    router.push('/auth')
  }, [router])
  
  return null
}

