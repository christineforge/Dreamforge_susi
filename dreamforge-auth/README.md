# DreamForge Auth

A minimal Next.js authentication UI project using Clerk for customizing authentication components and deploying on Vercel.

## Features

- **Next.js App Router** - Modern React framework
- **Clerk Authentication** - Pre-built authentication components with full customization
- **Unity Integration** - Redirects to Unity with JWT token after authentication
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
   - Add your keys to `.env.local`:
     ```
     NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_key_here
     NEXT_PUBLIC_UNITY_URL_SCHEME=unity://
     ```
   - **Unity URL Scheme**: Configure the redirect URL for Unity
     - For native Unity apps: Use a custom URL scheme like `unity://` or `dreamforge://`
     - For web-based Unity builds: Use a full URL like `https://your-unity-app.com/auth`

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
│   │   ├── sign-in/
│   │   │   └── page.tsx            # SignIn page
│   │   ├── callback/
│   │   │   └── page.tsx            # Callback page - redirects to Unity with token
│   │   └── page.module.css         # Glassmorphism styles
│   ├── layout.tsx                  # Root layout with ClerkProvider
│   └── globals.css                 # Global dark theme styles
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

### Glassmorphism Styling

Modify `app/auth/page.module.css` to adjust:
- Blur intensity (`backdrop-filter`)
- Transparency (`background: rgba(...)`)
- Glow effects (`box-shadow`)
- Border colors
- Hover effects

### Global Styles

Modify `app/globals.css` for:
- Body background
- Global font settings
- Override Clerk component styles globally

## Deployment to Vercel

1. **Push your code to GitHub**

2. **Connect to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Vercel will auto-detect Next.js

3. **Set Environment Variables:**
   - In Vercel dashboard, go to Settings → Environment Variables
   - Add `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` with your Clerk publishable key
   - Add `NEXT_PUBLIC_UNITY_URL_SCHEME` with your Unity URL scheme (e.g., `unity://`)

4. **Configure Clerk Dashboard:**
   - Go to [Clerk Dashboard](https://dashboard.clerk.com)
   - Add your Vercel URL to allowed redirect URLs:
     - `https://your-app.vercel.app`
     - `https://your-app.vercel.app/auth/sign-in`
     - `https://your-app.vercel.app/auth` (for sign-up)
     - `https://your-app.vercel.app/auth/callback` (for Unity redirect)

5. **Deploy:**
   - Vercel will automatically build and deploy
   - Your auth flow will be live!

## Unity Integration

After successful authentication, users are automatically redirected to Unity with a JWT token. The flow works as follows:

1. User signs in/signs up using Clerk components
2. After successful authentication, user is redirected to `/auth/callback`
3. The callback page retrieves the JWT token from Clerk
4. User is redirected to Unity with the token as a URL parameter: `unity://auth?token=YOUR_JWT_TOKEN`

### Configuration

Set the `NEXT_PUBLIC_UNITY_URL_SCHEME` environment variable:

- **Native Unity App**: Use a custom URL scheme
  ```
  NEXT_PUBLIC_UNITY_URL_SCHEME=unity://
  ```
  This will redirect to: `unity://auth?token=YOUR_TOKEN`

- **Web-based Unity Build**: Use a full URL
  ```
  NEXT_PUBLIC_UNITY_URL_SCHEME=https://your-unity-app.com/auth
  ```
  This will redirect to: `https://your-unity-app.com/auth?token=YOUR_TOKEN`

## Notes

- The `vercel.json` file configures the build to use the `dreamforge-auth` directory
- Make sure your Clerk publishable key and Unity URL scheme are set in Vercel environment variables
- OAuth providers need to be configured in Clerk Dashboard with your Vercel URLs
- The callback page handles token retrieval and Unity redirect automatically
