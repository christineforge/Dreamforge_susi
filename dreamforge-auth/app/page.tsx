'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

/**
 * Root page - redirects to auth page
 */
export default function Home() {
  const router = useRouter()
  
  useEffect(() => {
    router.push('/auth')
  }, [router])
  
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0a0a1a 0%, #1a0a2e 50%, #0a0a1a 100%)',
      color: '#ffffff',
    }}>
      <div>Redirecting...</div>
    </div>
  )
}

