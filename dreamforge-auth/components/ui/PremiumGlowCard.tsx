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
    background: `radial-gradient(500px circle at ${pos.x}px ${pos.y}px, rgba(168,85,247,0.25), transparent 60%)`,
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
