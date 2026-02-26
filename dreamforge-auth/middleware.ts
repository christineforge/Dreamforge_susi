import { authMiddleware } from '@clerk/nextjs'
import { NextResponse } from 'next/server'

export default authMiddleware({
  publicRoutes: ['(.*)'],
  afterAuth(auth, req) {
    const redirectUrl = req.nextUrl.searchParams.get('redirect_url')
    if (!redirectUrl || !req.nextUrl.pathname.startsWith('/auth')) return

    //Server-side: if we can confirm the user is signed in, redirect immediately
    if (auth.userId) {
      return NextResponse.redirect(redirectUrl)
    }

    //Fallback: check for Clerk session cookie directly
    const hasSession = req.cookies.has('__session') || req.cookies.has('__client_uat')
    if (hasSession) {
      return NextResponse.redirect(redirectUrl)
    }
  }
})

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}
