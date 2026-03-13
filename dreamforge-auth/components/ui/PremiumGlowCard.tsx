'use client'

import { useState } from 'react'
import styles from './PremiumGlowCard.module.css'

export default function PremiumGlowCard({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) {
  const [hovered, setHovered] = useState(false)
  const [pos, setPos] = useState({ x: 0, y: 0 })

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect()
    setPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  const glowStyle = {
    opacity: hovered ? 1 : 0,
    background: `
      radial-gradient(circle at ${pos.x}px ${pos.y}px,
        rgba(168,85,247,0.24),
        rgba(124,58,237,0.12) 22%,
        rgba(88,28,135,0.08) 38%,
        transparent 65%
      ),
      radial-gradient(circle at ${pos.x}px ${pos.y}px,
        rgba(96,165,250,0.10),
        transparent 55%
      )
    `,
  }

  return (
    <div
      className={`${styles.wrapper} ${className}`.trim()}
      onMouseMove={handleMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className={styles.glow} style={glowStyle} aria-hidden="true" />
      <div className={styles.card}>{children}</div>
    </div>
  )
}
