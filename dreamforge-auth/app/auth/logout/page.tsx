'use client'

import { useClerk } from '@clerk/nextjs'
import { useEffect } from 'react'

export default function LogoutPage() {
  const { signOut } = useClerk()

  useEffect(() => {
    signOut().then(() => {
      window.location.href = '/auth/sign-in'
    })
  }, [signOut])

  return null
}

