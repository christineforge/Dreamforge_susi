'use client'
import { SignUp } from '@clerk/nextjs'

export default function Page() {
  return (
    <SignUp
      routing="path"
      path="/auth"
      signInUrl="/auth/sign-in"
      afterSignUpUrl="/auth/callback"
    />
  )
}
