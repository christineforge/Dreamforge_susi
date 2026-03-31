import { clerkMiddleware } from '@clerk/nextjs/server'

// All routes stay public (same behavior as legacy authMiddleware with publicRoutes: ['(.*)']).
export default clerkMiddleware()

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
}
