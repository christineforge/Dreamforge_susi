# DreamForge Auth

A minimal Next.js authentication UI project using Clerk for local design and UX iteration.

## Features

- **Next.js App Router** - Modern React framework
- **Clerk Authentication** - Pre-built authentication components
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
│   │   ├── page.tsx          # SignUp page with glassmorphism wrapper
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

## Next Steps

- Add animations (uncomment animation code in CSS)
- Customize Clerk components further
- Add additional routes as needed
- Iterate on design and UX

## Notes

- This project is for **local development only** (no deployment configuration)
- OAuth redirects are **not configured**
- Keep the project minimal for design iteration

