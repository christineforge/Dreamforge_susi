/**
 * Custom 404 page for static export
 * Must not use any server-side APIs like headers()
 */
export default function NotFound() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0a0a1a 0%, #1a0a2e 50%, #16213e 100%)',
      color: '#ffffff',
      fontFamily: 'var(--font-montserrat), Montserrat, sans-serif',
      padding: '2rem',
      textAlign: 'center'
    }}>
      <h1 style={{ fontSize: '4rem', marginBottom: '1rem', fontWeight: 700 }}>404</h1>
      <p style={{ fontSize: '1.5rem', marginBottom: '2rem', opacity: 0.9 }}>
        Page Not Found
      </p>
      <a
        href="/auth"
        style={{
          padding: '0.75rem 2rem',
          background: 'linear-gradient(135deg, #00d4ff 0%, #00b8d4 100%)',
          color: '#ffffff',
          borderRadius: '0.75rem',
          textDecoration: 'none',
          fontWeight: 500,
          transition: 'opacity 0.2s',
        }}
        onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
        onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
      >
        Go to Auth Page
      </a>
    </div>
  )
}

