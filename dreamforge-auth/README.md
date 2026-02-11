# DreamForge Auth

A minimal Next.js authentication UI project using Clerk for customizing authentication components and deploying on Vercel.

## Features

- **Next.js App Router** - Modern React framework
- **Clerk Authentication** - Pre-built authentication components with full customization
- **Glassmorphism Design** - Semi-transparent card with blur effects
- **Dark Sci-Fi Theme** - Purple/blue gradients with neon accents
- **Vercel Ready** - Configured for easy deployment on Vercel

## Getting Started

### Prerequisites

- Node.js 18+ installed
- A Clerk account (sign up at [clerk.com](https://clerk.com))

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   - Copy `env.example` to `.env.local`
   - Get your Clerk publishable key from the [Clerk Dashboard](https://dashboard.clerk.com)
   - Add your key to `.env.local`:
     ```
     NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_key_here
     ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to [http://localhost:3000/auth](http://localhost:3000/auth)

## Project Structure

```
dreamforge-auth/
├── app/
│   ├── auth/
│   │   ├── [[...rest]]/
│   │   │   ├── AuthPageClient.tsx  # SignUp page client component
│   │   │   └── page.tsx            # SignUp page server component
│   │   └── sign-in/
│   │       └── page.tsx            # SignIn page
│   └── layout.tsx                  # Root layout with ClerkProvider
├── public/
│   └── images/                     # Logo and background images
├── env.example                      # Environment variable template
├── next.config.js                  # Next.js configuration
├── package.json                    # Dependencies
├── tsconfig.json                   # TypeScript configuration
└── vercel.json                     # Vercel deployment configuration
```

## Customization

### Clerk Appearance API

The Clerk appearance is configured in `app/layout.tsx` using the `appearance` prop. You can customize:

- **Colors**: Primary, text, background, input colors
- **Border radius**: Buttons and inputs
- **Button styles**: Gradients, hover effects
- **Input styles**: Background, borders, focus states
- **Social buttons**: Styling for OAuth providers
- **Typography**: Fonts, sizes, weights

Example customization in `app/layout.tsx`:

```typescript
<ClerkProvider
  appearance={{
    variables: {
      colorPrimary: '#00d4ff',
      colorText: '#ffffff',
      borderRadius: '0.75rem',
    },
    elements: {
      formButtonPrimary: {
        background: 'linear-gradient(135deg, #00d4ff 0%, #00b8d4 100%)',
      },
    },
  }}
>
```

### Styling

All styling is done through Clerk's `appearance` prop in `app/layout.tsx` and inline styles in the page components. The glassmorphism effect is configured in the `card` element styling using `backdropFilter` in the appearance prop.

## Deployment to Vercel

1. **Push your code to GitHub**

2. **Connect to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Vercel will auto-detect Next.js

3. **Set Environment Variables:**
   - In Vercel dashboard, go to Settings → Environment Variables
   - Add `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` with your Clerk publishable key

4. **Configure Clerk Dashboard:**
   - Go to [Clerk Dashboard](https://dashboard.clerk.com)
   - Add your Vercel URL to allowed redirect URLs:
     - `https://your-app.vercel.app`
     - `https://your-app.vercel.app/auth/sign-in`
     - `https://your-app.vercel.app/auth` (for sign-up)

5. **Deploy:**
   - Vercel will automatically build and deploy
   - Your auth flow will be live!

## Notes

- The `vercel.json` file configures the build to use the `dreamforge-auth` directory
- Make sure your Clerk publishable key is set in Vercel environment variables
- OAuth providers need to be configured in Clerk Dashboard with your Vercel URLs
- All styling is done through Clerk's `appearance` prop and inline styles - no CSS files needed
