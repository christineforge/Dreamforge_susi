'use client'

import { useAuth } from '@clerk/nextjs'
import { useEffect } from 'react'

export default function CallbackPage() {
  const { isLoaded, isSignedIn } = useAuth()

  useEffect(() => {
    if (!isLoaded) return

    // If user somehow lands here without a session,
    // send them back to the auth page.
    if (!isSignedIn) {
      window.location.href = '/auth'
    }

    // Otherwise do nothing.
    // Clerk OAuth will redirect back to Unity automatically.
  }, [isLoaded, isSignedIn])

  return null
}
