# DreamForge Auth

A minimal Next.js authentication UI project using Clerk for local design and UX iteration.

## Features

- **Next.js App Router** - Modern React framework
- **Clerk Authentication** - Pre-built authentication components
- **Unity Integration** - Redirects to Unity with authentication token after sign-in
- **Glassmorphism Design** - Semi-transparent card with blur effects
- **Dark Sci-Fi Theme** - Purple/blue gradients with neon accents
- **Animation-Ready** - Prepared structure for future animations

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
│   │   │   └── page.tsx      # SignUp page with glassmorphism wrapper
│   │   ├── sign-in/
│   │   │   └── page.tsx      # SignIn page
│   │   ├── callback/
│   │   │   └── page.tsx      # Callback page - redirects to Unity with token
│   │   └── page.module.css   # Glassmorphism styles
│   ├── layout.tsx            # Root layout with ClerkProvider
│   └── globals.css           # Global dark theme styles
├── env.example                # Environment variable template
└── package.json              # Dependencies
```

## Design Notes

- **Glassmorphism Effect**: Semi-transparent card with backdrop blur
- **Color Scheme**: Dark purple/blue gradients (#0f0f23, #1a1a3e) with purple accent (#8b5cf6)
- **Rounded Elements**: 0.75rem border radius for buttons and inputs
- **Animation Ready**: Commented CSS animations ready to be enabled

## Customization

### Appearance API

The Clerk appearance is configured in `app/layout.tsx`. You can customize:
- Colors (primary, text, background)
- Border radius
- Button styles
- Input styles

### Glassmorphism Styling

Modify `app/auth/page.module.css` to adjust:
- Blur intensity (`backdrop-filter`)
- Transparency (`background: rgba(...)`)
- Glow effects (`box-shadow`)
- Border colors

## Unity Integration

After successful authentication, users are redirected to Unity with an authentication token. The flow works as follows:

1. User signs in/signs up using Clerk components
2. After successful authentication, user is redirected to `/auth/callback`
3. The callback page retrieves the session token from Clerk
4. User is redirected to Unity with the token as a URL parameter

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

### Unity Side Setup

In your Unity application, you need to:

1. **Register URL Scheme** (for native apps):
   - iOS: Add to `Info.plist` under `CFBundleURLSchemes`
   - Android: Add intent filter in `AndroidManifest.xml`

2. **Handle the Redirect**:
   - Listen for the custom URL scheme or web redirect
   - Extract the `token` parameter from the URL
   - Use the token to authenticate API requests to your backend

### Example Unity C# Code

```csharp
// Handle deep link (native app)
void OnApplicationFocus(bool hasFocus)
{
    if (hasFocus)
    {
        // Check for deep link URL
        string url = Application.absoluteURL; // or use platform-specific deep link handling
        if (url.Contains("token="))
        {
            string token = ExtractTokenFromUrl(url);
            // Use token for authentication
        }
    }
}
```

## Next Steps

- Add animations (uncomment animation code in CSS)
- Customize Clerk components further
- Add additional routes as needed
- Iterate on design and UX
- Configure Unity app to handle the redirect and token

## Notes

- This project is configured for **Azure Static Web Apps** deployment
- OAuth redirects should be configured in Clerk Dashboard
- The callback page handles token retrieval and Unity redirect automatically
