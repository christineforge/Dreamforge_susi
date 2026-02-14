'use client'
import { useAuth } from '@clerk/nextjs'
import { useEffect } from 'react'

export default function CallbackPage() {
  const { isLoaded, isSignedIn, getToken } = useAuth()

  useEffect(() => {
    const handleRedirect = async () => {
      if (!isLoaded) return
      if (!isSignedIn) {
        window.location.href = '/auth/sign-in'
        return
      }

      const token = await getToken()
      if (!token) {
        window.location.href = '/auth/sign-in'
        return
      }

      const unityUrlScheme =
        process.env.NEXT_PUBLIC_UNITY_URL_SCHEME || 'unity://'

      window.location.href = `${unityUrlScheme}auth?token=${encodeURIComponent(
        token
      )}`
    }

    handleRedirect()
  }, [isLoaded, isSignedIn, getToken])

  return null
}
