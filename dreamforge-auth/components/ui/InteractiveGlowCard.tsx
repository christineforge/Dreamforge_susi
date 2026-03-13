'use client'

import { useState } from 'react'
import styles from './InteractiveGlowCard.module.css'

export default function InteractiveGlowCard({ children }: { children: React.ReactNode }) {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [hovered, setHovered] = useState(false)

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect()
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  return (
    <div
      className={styles.glowCard}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className={styles.glowLayer}
        style={{
          opacity: hovered ? 1 : 0,
          background: `radial-gradient(500px circle at ${position.x}px ${position.y}px, rgba(168,85,247,0.25), transparent 60%)`,
        }}
      />
      <div className={styles.cardContent}>
        {children}
      </div>
    </div>
  )
}
