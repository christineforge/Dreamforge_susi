# Information to Share with Clerk Support

## Issue Description
After successful authentication (sign-in or sign-up), the application should redirect to Unity with a JWT token, but the redirect is not working properly. The JWT token is not being retrieved or passed correctly to Unity.

## Safe Files to Share (Test Environment)

### ✅ Safe to Share - No Sensitive Data

1. **`app/auth/callback/page.tsx`**
   - This is the main callback handler that retrieves the JWT token and redirects to Unity
   - Contains the logic for token retrieval and redirect
   - **Note**: Contains `process.env.NEXT_PUBLIC_UNITY_URL_SCHEME` - this is safe as it's just a URL scheme

2. **`app/auth/sign-in/page.tsx`**
   - Sign-in page configuration
   - Shows how `afterSignInUrl` and `redirectUrl` are set to `/auth/callback`
   - **Note**: Contains styling code, but no sensitive data

3. **`app/auth/[[...rest]]/AuthPageClient.tsx`**
   - Sign-up page configuration
   - Shows how `afterSignUpUrl` and `redirectUrl` are set to `/auth/callback`
   - **Note**: Contains styling code, but no sensitive data

4. **`app/layout.tsx`**
   - ClerkProvider configuration
   - Shows appearance customization
   - **Note**: Contains `process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` - this is a PUBLIC key, safe to share in test environment

5. **`env.example`**
   - Shows environment variable structure
   - No actual secrets (just placeholders)

### ⚠️ What to Redact/Replace Before Sharing

1. **Actual Environment Variables** (`.env.local` file)
   - ❌ DO NOT share `.env.local` file
   - ✅ Instead, share `env.example` which shows the structure

2. **If sharing actual publishable key:**
   - The `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` in `app/layout.tsx` is a PUBLIC key
   - In a test environment, this is generally safe to share
   - However, if you prefer, you can replace it with `pk_test_...` placeholder

3. **Unity URL Scheme:**
   - `NEXT_PUBLIC_UNITY_URL_SCHEME` is just a URL scheme (e.g., `unity://`)
   - This is safe to share

## Key Code Sections to Highlight

### 1. Callback Page Token Retrieval
The main issue is likely in `app/auth/callback/page.tsx` around lines 50-80 where we:
- Try to get the JWT token using `getToken()`
- Retry up to 5 times if it fails
- Build the Unity redirect URL with the token

### 2. Sign-In/Sign-Up Redirect Configuration
Both pages set:
- `afterSignInUrl="/auth/callback"` or `afterSignUpUrl="/auth/callback"`
- `redirectUrl="/auth/callback"`

## Questions to Ask Clerk Support

1. **Token Retrieval Timing**: Is there a timing issue where `getToken()` is called before the session is fully established?

2. **Session Tasks**: Are there session tasks (like email verification) that might be blocking token retrieval?

3. **OAuth Flow**: Does the OAuth flow (social logins) handle redirects differently than email/password?

4. **JWT Template**: Should we be using a specific JWT template name in `getToken({ template: '...' })`?

5. **Redirect URL Format**: Is the custom URL scheme redirect (`unity://auth?token=...`) supported, or do we need a different approach?

## Current Behavior

- ✅ User successfully signs in/signs up
- ✅ User is redirected to `/auth/callback` page
- ❌ JWT token retrieval sometimes fails or returns null
- ❌ Unity redirect doesn't happen or happens without token

## Environment

- **Framework**: Next.js 14.2.35
- **Clerk Version**: Latest (check `package.json`)
- **Deployment**: Vercel
- **Test Environment**: Yes (using test keys)

## Additional Context

The callback page includes:
- Retry logic for token retrieval (5 attempts)
- Error handling and fallback redirects
- Loading states for better UX
- Prevention of multiple redirect attempts

---

## Files to Share (Copy these files)

1. `dreamforge-auth/app/auth/callback/page.tsx` - **Main file of interest**
2. `dreamforge-auth/app/auth/sign-in/page.tsx` - Shows redirect configuration
3. `dreamforge-auth/app/auth/[[...rest]]/AuthPageClient.tsx` - Shows redirect configuration
4. `dreamforge-auth/app/layout.tsx` - Shows ClerkProvider setup
5. `dreamforge-auth/env.example` - Shows environment variable structure

## Summary

All the code is safe to share in a test environment. The only thing to be aware of is that `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` is a public key (as indicated by the `NEXT_PUBLIC_` prefix), so it's designed to be exposed in client-side code. However, if you want to be extra cautious, you can replace it with a placeholder before sharing.

