'use client'

import { useState, useRef, useEffect, useMemo } from 'react'
import styles from './PremiumGlowCard.module.css'

const PARTICLE_COUNT = 6
const SMOOTH_FACTOR = 0.12

export default function PremiumGlowCard({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) {
  const [hovered, setHovered] = useState(false)
  const targetPos = useRef({ x: 0, y: 0 })
  const smoothPos = useRef({ x: 0, y: 0 })
  const [, forceUpdate] = useState(0)
  const rafId = useRef<number | null>(null)
  const mounted = useRef(true)

  const particles = useMemo(
    () =>
      Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
        left: `${10 + ((i * 17) % 80)}%`,
        top: `${10 + ((i * 19) % 80)}%`,
        duration: 12 + (i % 3) * 2.7,
        delay: ((i * 1.7) % 10),
      })),
    []
  )

  useEffect(() => {
    mounted.current = true
    return () => {
      mounted.current = false
      if (rafId.current) cancelAnimationFrame(rafId.current)
    }
  }, [])

  function updateMousePos(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    targetPos.current = { x, y }
    if (!hovered) smoothPos.current = { x, y }
  }

  useEffect(() => {
    if (!hovered) return

    function tick() {
      if (!mounted.current) return

      const dx = targetPos.current.x - smoothPos.current.x
      const dy = targetPos.current.y - smoothPos.current.y

      smoothPos.current.x += dx * SMOOTH_FACTOR
      smoothPos.current.y += dy * SMOOTH_FACTOR

      forceUpdate((n) => n + 1)
      rafId.current = requestAnimationFrame(tick)
    }

    rafId.current = requestAnimationFrame(tick)
    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current)
    }
  }, [hovered])

  const { x, y } = smoothPos.current
  const glowStyle = {
    opacity: hovered ? 1 : 0,
    background: `
      radial-gradient(circle at ${x}px ${y}px, rgba(168,85,247,0.24), rgba(124,58,237,0.12) 22%, rgba(88,28,135,0.08) 38%, transparent 65%),
      radial-gradient(circle at ${x}px ${y}px, rgba(96,165,250,0.10), transparent 55%)
    `,
  }

  return (
    <div
      className={`${styles.wrapper} ${className}`.trim()}
      onMouseMove={updateMousePos}
      onMouseEnter={(e) => {
        updateMousePos(e)
        setHovered(true)
      }}
      onMouseLeave={() => setHovered(false)}
    >
      <div className={styles.glowLayer} style={glowStyle} aria-hidden="true" />
      <div className={styles.particles} aria-hidden="true">
        {particles.map((p, i) => (
          <span
            key={i}
            className={styles.particle}
            style={{
              left: p.left,
              top: p.top,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
            }}
          />
        ))}
      </div>
      <div className={styles.innerHighlight} aria-hidden="true" />
      <div className={styles.content}>{children}</div>
    </div>
  )
}
