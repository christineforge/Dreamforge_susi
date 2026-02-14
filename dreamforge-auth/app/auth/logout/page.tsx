'use client'

import { useClerk } from '@clerk/nextjs'
import { useEffect } from 'react'

/**
 * Logout page - Clears Clerk session and redirects to sign-in
 * Uses signOut() and then hard redirect to ensure proper session clearing
 * and prevent auto-signin after logout
 */
export default function LogoutPage() {
  const { signOut } = useClerk()

  useEffect(() => {
    const logout = async () => {
      // Sign out and wait for session to be cleared
      await signOut()
      // Use window.location.href for hard redirect to ensure
      // complete session clearing and prevent session reuse
      window.location.href = '/auth/sign-in'
    }
    logout()
  }, [signOut])

  return null
}

