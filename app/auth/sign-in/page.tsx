'use client'

import { SignIn } from '@clerk/nextjs'
import { useSearchParams } from 'next/navigation'

export default function SignInPage() {
  const searchParams = useSearchParams()
  const redirectPort = searchParams.get('redirect_port') || '8976'
  
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem',
      background: 'url("/images/background.jpg") center center / cover no-repeat fixed, linear-gradient(135deg, #0a0a1a 0%, #1a0a2e 50%, #0a0a1a 100%)',
      backgroundColor: '#0a0a1a',
    }}>
      <div style={{
        width: '100%',
        maxWidth: '380px',
        position: 'relative',
      }}>
        <SignIn 
          routing="path"
          path="/auth/sign-in"
          signUpUrl={`/auth?redirect_port=${redirectPort}`}
          forceRedirectUrl={`/auth/callback?redirect_port=${redirectPort}`}
        />
      </div>
    </div>
  )
}
