# DreamForge Auth

A minimal Next.js authentication UI using Clerk with custom glassmorphism design.

## Features

- **Next.js 16 App Router** - Modern React framework with Turbopack
- **Clerk v7 Authentication** - Pre-built auth components with full customization
- **Glassmorphism Design** - Semi-transparent cards with blur effects and cursor-following glow
- **Dark Sci-Fi Theme** - Purple/blue gradients with teal accents
- **OAuth Support** - Google, Apple, Facebook sign-in buttons
- **Vercel Ready** - Configured for deployment

## Quick Start

### Prerequisites

- Node.js 18+ 
- A Clerk account ([clerk.com](https://clerk.com))

### Installation

```bash
# Install dependencies
npm install

# Set up environment variables
cp env.example .env.local
# Add your Clerk publishable key to .env.local

# Run development server
npm run dev

# Open http://localhost:3000/auth
```

### Environment Variables

Create `.env.local`:
```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_key_here
```

Get your key from [Clerk Dashboard](https://dashboard.clerk.com).

## Project Structure

```
dreamforge-auth/
├── app/
│   ├── auth/
│   │   ├── [[...auth]]/
│   │   │   ├── AuthClientPage.tsx  # Main auth component (client)
│   │   │   └── page.tsx            # Auth page (server)
│   │   └── callback/
│   │       └── page.tsx            # OAuth callback handler
│   ├── layout.tsx                  # Root layout with ClerkProvider
│   └── globals.css                 # Global styles + Clerk overrides
├── components/
│   └── ui/
│       ├── PremiumGlowCard.tsx     # Card wrapper with gradient border
│       └── AmbientParticles.tsx    # Animated background particles
└── public/
    ├── images/                     # Logo
    └── icons/                      # Social provider icons (SVG)
```

## Customization

### Clerk Appearance API

Auth styling is configured in `app/auth/[[...auth]]/AuthClientPage.tsx` using Clerk's `appearance` prop:

```typescript
const clerkAppearance = {
  variables: {
    colorPrimary: '#00BBA7',           // Brand teal
    colorText: '#ffffff',              // White text
    colorInputBackground: 'rgba(255,255,255,0.15)',  // Glass inputs
  },
  elements: {
    formFieldInput: {
      borderRadius: '9999px',          // Pill shape
      height: '52px',
    },
    formButtonPrimary: {
      background: 'linear-gradient(135deg, #00BBA7 0%, #00B8DB 100%)',
    },
  },
}
```

See [Clerk Appearance API docs](https://clerk.com/docs/components/customization/overview) for all options.

### Styling Architecture

- **globals.css** - Layout, animations, component styles, Clerk overrides
- **Module CSS** - Component-specific styles (PremiumGlowCard, AmbientParticles)
- **Inline styles** - Dynamic styles (cursor tracking, responsive sizing)

All styling follows Clerk's recommended patterns - customize via `appearance` prop, override with global CSS when needed.

### Adding OAuth Providers

1. **Enable in Clerk Dashboard:**
   - Go to User & Authentication → Social Connections
   - Enable desired providers (Google, Apple, Facebook)

2. **Icons are ready** - SVGs in `/public/icons/`

3. **Buttons are wired** - OAuth redirects configured in `AuthClientPage.tsx`

## OAuth Setup

### Configure Clerk Redirect URLs

In [Clerk Dashboard](https://dashboard.clerk.com) → User & Authentication → Social Connections:

**Development:**
```
http://localhost:3000/auth/sso-callback
```

**Production:**
```
https://your-domain.com/auth/sso-callback
```

### Provider-Specific Setup

Each OAuth provider requires app credentials configured in Clerk Dashboard:

- **Google**: OAuth 2.0 Client ID from Google Cloud Console
- **Apple**: App ID from Apple Developer Portal
- **Facebook**: App ID from Meta for Developers

## Deployment to Vercel

```bash
# 1. Push to GitHub
git push origin main

# 2. Import in Vercel
# Go to vercel.com → Import repository

# 3. Add environment variable in Vercel dashboard
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_your_key_here

# 4. Deploy
# Vercel auto-builds and deploys
```

### Post-Deployment

1. **Add production URLs to Clerk:**
   - Dashboard → User & Authentication → Social Connections
   - Add: `https://your-app.vercel.app/auth/sso-callback`

2. **Test OAuth flow** in production

## Development Notes

- Uses CSS classes instead of excessive inline styles
- Clerk components render inside custom UI shell
- Custom social buttons redirect to `/auth/sso-callback?strategy=oauth_*`
- Loading state hidden via `formButtonPrimaryLoading: { display: 'none' }`
- Cursor-following glow uses `useRef` + mouse event handlers

## Troubleshooting

**OAuth not working:**
- Check redirect URLs in Clerk Dashboard match exactly
- Ensure provider is enabled in Clerk
- Verify app credentials are correct

**Styling issues:**
- Check `globals.css` for Clerk overrides (`.cl-*` classes)
- Verify `appearance` prop configuration in `AuthClientPage.tsx`
- Clear `.next` cache: `rm -rf .next && npm run dev`

**Build errors:**
- Ensure Node.js 18+
- Delete `node_modules` and reinstall: `rm -rf node_modules && npm install`

## Resources

- [Clerk Documentation](https://clerk.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Vercel Deployment](https://vercel.com/docs)
