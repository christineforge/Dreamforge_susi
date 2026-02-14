'use client'

import { useAuth } from '@clerk/nextjs'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Home() {
  const { isLoaded, isSignedIn } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoaded) return

    if (!isSignedIn) {
      router.replace('/auth/sign-in')
    } else {
      router.replace('/auth/callback')
    }
  }, [isLoaded, isSignedIn, router])

  return null
}
