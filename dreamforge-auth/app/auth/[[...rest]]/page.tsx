import AuthPageClient from './AuthPageClient'

/**
 * Server component wrapper for authentication page
 * Required for static export with catch-all routes
 * Exports generateStaticParams which must be in a server component
 */

// Required for static export with catch-all routes
export function generateStaticParams() {
  // Return empty array for catch-all route to generate the base path
  return [{ rest: [] }]
}

/**
 * Authentication page - Catch-all route for Clerk
 * Renders Clerk's SignUp component with logo and custom styling
 * Designed for local design and UX iteration
 */
export default function AuthPage() {
  return <AuthPageClient />
}

