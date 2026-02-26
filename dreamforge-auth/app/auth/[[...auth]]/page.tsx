'use client'
import Image from 'next/image'
import { SignIn } from '@clerk/nextjs'

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
          backgroundImage:
            "url('/images/DreamForge-Latest-BG.webp'), url('/images/DreamForge-Latest-BG.png'), url('/images/DreamForge-Latest-BG.jpg')",
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
            gap: '0.75rem',
          }}
        >
          <Image
            src="/images/logo.png"
            alt="DreamForge"
            width={320}
            height={110}
            priority
            style={{
              width: 'min(70vw, 320px)',
              height: 'auto',
            }}
          />
          <div style={{ width: '100%' }}>
            <SignIn />
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
      `}</style>
    </>
  )
}
