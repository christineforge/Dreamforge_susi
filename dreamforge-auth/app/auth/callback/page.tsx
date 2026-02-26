'use client'
import { useAuth } from '@clerk/nextjs'
import { useEffect } from 'react'

const OAUTH_REDIRECT_KEY = 'df_oauth_redirect_url'

export default function CallbackPage() {
  const { isLoaded, isSignedIn, getToken } = useAuth()

  useEffect(() => {
    const handleRedirect = async () => {
      if (!isLoaded) return

      if (!isSignedIn) {
        window.location.href = '/auth'
        return
      }

      //Check if there's a pending OAuth redirect (stored before social login)
      const oauthRedirect = sessionStorage.getItem(OAUTH_REDIRECT_KEY)
      if (oauthRedirect) {
        sessionStorage.removeItem(OAUTH_REDIRECT_KEY)
        window.location.href = oauthRedirect
        return
      }

      const token = await getToken()
      if (!token) {
        window.location.href = '/auth'
        return
      }

      const unityUrlScheme =
        process.env.NEXT_PUBLIC_UNITY_URL_SCHEME || 'unity://'

      window.location.href = `${unityUrlScheme}auth?token=${encodeURIComponent(token)}`
    }

    handleRedirect()
  }, [isLoaded, isSignedIn, getToken])

  return null
}
