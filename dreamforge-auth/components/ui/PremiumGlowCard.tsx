'use client'

import { useState, useRef, useEffect, useMemo } from 'react'
import styles from './PremiumGlowCard.module.css'

const PARTICLE_COUNT = 5
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
        left: `${12 + (i * 19) % 76}%`,
        top: `${8 + (i * 23) % 84}%`,
        size: 2 + (i % 3),
        duration: 12 + (i % 5),
        delay: `${i * 2.5}s`,
        color: i % 3 === 0 ? 'rgba(219, 180, 255, 0.5)' : i % 3 === 1 ? 'rgba(196, 181, 253, 0.45)' : 'rgba(244, 114, 182, 0.4)',
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
      <div className={styles.particlesLayer} aria-hidden="true">
        {particles.map((p, i) => (
          <span
            key={i}
            className={styles.particle}
            style={{
              left: p.left,
              top: p.top,
              width: p.size,
              height: p.size,
              background: p.color,
              animationDuration: `${p.duration}s`,
              animationDelay: p.delay,
            }}
          />
        ))}
      </div>
      <div className={styles.innerHighlight} aria-hidden="true" />
      <div className={styles.content}>{children}</div>
    </div>
  )
}
