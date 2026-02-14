'use client'
import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return (
    <SignIn
      routing="path"
      path="/auth/sign-in"
      signUpUrl="/auth"
      afterSignInUrl="/auth/callback"
    />
  )
}
