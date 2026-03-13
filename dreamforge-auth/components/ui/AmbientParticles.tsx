'use client'

import { useMemo } from 'react'
import styles from './AmbientParticles.module.css'

const PARTICLE_COUNT = 22
const COLORS = [
  'rgba(124,58,237,0.9)',
  'rgba(139,92,246,0.9)',
  'rgba(99,102,241,0.85)',
] as const
const ANIMATION_VARIANTS = ['particleDrift1', 'particleDrift2', 'particleDrift3', 'particleDrift4'] as const

export default function AmbientParticles() {
  const particles = useMemo(
    () =>
      Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
        left: `${5 + (i * 19) % 85}%`,
        top: `${5 + (i * 23) % 85}%`,
        duration: 14 + (i % 13),
        delay: (i * 3.7) % 14,
        color: COLORS[i % COLORS.length],
        animation: ANIMATION_VARIANTS[i % ANIMATION_VARIANTS.length],
        size: 3,
      })),
    []
  )

  return (
    <div className={`${styles.container} ambient-particles`} aria-hidden="true">
      {particles.map((p, i) => (
        <span
          key={i}
          className={`${styles.particle} ${styles[p.animation]}`}
          style={{
            left: p.left,
            top: p.top,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            background: p.color,
            width: p.size,
            height: p.size,
          }}
        />
      ))}
    </div>
  )
}
