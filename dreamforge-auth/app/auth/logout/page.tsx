'use client'

import { useClerk } from '@clerk/nextjs'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function LogoutPage() {
  const { signOut } = useClerk()
  const router = useRouter()

  useEffect(() => {
    const logout = async () => {
      await signOut()
      router.replace('/auth/sign-in')
    }
    logout()
  }, [signOut, router])

  return null
}

