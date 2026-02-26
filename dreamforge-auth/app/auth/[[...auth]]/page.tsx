'use client'
import Image from 'next/image'
import Link from 'next/link'
import { SignUp } from '@clerk/nextjs'

export default function Page() {
  return (
    <>
      <main
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1rem',
          backgroundImage: "url('/images/DreamForge-Latest-BG.png?v=2')",
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <section
          style={{
            width: '100%',
            maxWidth: '28rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1.5rem',
          }}
        >
          <Image
            src="/images/logo.png"
            alt="DreamForge"
            width={200}
            height={72}
            priority
            style={{
              width: 'min(45vw, 200px)',
              height: 'auto',
            }}
          />
          <Link
            href="/auth/sign-in"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '9999px',
              border: '1px solid rgba(255, 255, 255, 0.5)',
              padding: '0.5rem 1rem',
              color: '#ffffff',
              textDecoration: 'none',
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
              fontSize: '0.9rem',
              lineHeight: 1.2,
              backdropFilter: 'blur(4px)',
            }}
          >
            Have an account? Sign in
          </Link>
          <div style={{ width: '100%' }}>
            <SignUp />
          </div>
        </section>
      </main>
      <style jsx global>{`
        .cl-rootBox,
        .cl-cardBox,
        .cl-card {
          width: 100%;
          max-width: 28rem;
          margin: 0 auto;
        }

        .cl-divider,
        .cl-dividerRow {
          display: flex !important;
          align-items: center !important;
          width: 100% !important;
          margin: 0.8rem 0 !important;
        }

        .cl-dividerLine,
        .cl-separatorLine {
          display: block !important;
          flex: 1 !important;
          height: 1px !important;
          background: rgba(255, 255, 255, 0.35) !important;
        }

        .cl-dividerText,
        .cl-separatorText {
          display: block !important;
          margin: 0 0.75rem !important;
          color: rgba(255, 255, 255, 0.9) !important;
          font-size: 0.85rem !important;
          text-transform: lowercase !important;
        }

        .cl-dividerText::before,
        .cl-separatorText::before {
          content: '- ';
        }

        .cl-dividerText::after,
        .cl-separatorText::after {
          content: ' -';
        }

        .cl-socialButtonsBlockButton,
        .cl-socialButtonsBlockButtonButton {
          border: 1px solid rgba(255, 255, 255, 0.95) !important;
          border-radius: 0.75rem !important;
          background: rgba(255, 255, 255, 0.08) !important;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2) !important;
        }
      `}</style>
    </>
  )
}
