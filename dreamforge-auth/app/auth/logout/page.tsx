'use client'

import { useClerk } from '@clerk/nextjs'
import { useEffect } from 'react'

/**
 * Logout page - Clears Clerk session and redirects to sign-in
 * Uses signOut with redirectUrl to ensure proper session clearing
 * and prevent auto-signin after logout
 */
export default function LogoutPage() {
  const { signOut } = useClerk()

  useEffect(() => {
    const logout = async () => {
      // Use redirectUrl option to ensure proper session clearing
      // This prevents Clerk from reusing existing sessions after logout
      await signOut({ redirectUrl: '/auth/sign-in' })
    }
    logout()
  }, [signOut])

  return null
}

