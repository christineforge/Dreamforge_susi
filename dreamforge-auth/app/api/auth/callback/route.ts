import { auth, clerkClient } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'

/**
 * API route to handle Clerk authentication callback
 * Returns JWT token to Unity via URL parameter or deep link
 */
export async function GET(request: NextRequest) {
  try {
    // Get the authenticated user session from Clerk
    const { userId } = await auth()
    
    if (!userId) {
      return NextResponse.redirect(
        new URL('/auth/sign-in?error=unauthorized', request.url)
      )
    }

    // Get the redirect URL from query parameters (Unity will pass this)
    const redirectUrl = request.nextUrl.searchParams.get('redirect_uri') || 
                       request.nextUrl.searchParams.get('unity_callback')
    
    // Get the JWT token from Clerk
    // Note: In API routes, we need to use the session token from cookies
    // The actual JWT will be obtained client-side via getToken()
    // This endpoint serves as a redirect handler
    
    // For Unity integration, redirect to the callback page which will handle token extraction
    const callbackUrl = new URL('/auth/callback', request.url)
    if (redirectUrl) {
      callbackUrl.searchParams.set('redirect_uri', redirectUrl)
    }
    
    return NextResponse.redirect(callbackUrl.toString())
    
  } catch (error) {
    console.error('Auth callback error:', error)
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 500 }
    )
  }
}

