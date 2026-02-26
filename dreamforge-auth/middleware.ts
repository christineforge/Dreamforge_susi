import { authMiddleware } from '@clerk/nextjs'
import { NextResponse } from 'next/server'

export default authMiddleware({
  publicRoutes: ['(.*)'],
  afterAuth(auth, req) {
    //When user is already signed in and arrives at /auth with a redirect_url
    //(from an OAuth flow), skip the sign-in form and redirect immediately.
    //This prevents the double sign-in caused by prompt=login in Unity's OAuth request.
    const redirectUrl = req.nextUrl.searchParams.get('redirect_url')
    if (auth.userId && redirectUrl && req.nextUrl.pathname.startsWith('/auth')) {
      return NextResponse.redirect(redirectUrl)
    }
  }
})

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}
