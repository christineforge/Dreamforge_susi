'use client'

import { SignUp } from '@clerk/nextjs'

export default function SignUpPage() {
  return (
    <SignUp
      routing="path"
      path="/auth"
      signInUrl="/auth/sign-in"
    />
  )
}
