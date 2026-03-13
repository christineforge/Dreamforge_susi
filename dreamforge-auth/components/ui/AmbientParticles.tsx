'use client'

import { useMemo } from 'react'
import styles from './AmbientParticles.module.css'

const PARTICLE_COUNT = 14
const COLORS = [
  'rgba(124,58,237,0.45)',
  'rgba(139,92,246,0.4)',
  'rgba(99,102,241,0.35)',
] as const
const ANIMATION_VARIANTS = ['particleDrift1', 'particleDrift2', 'particleDrift3', 'particleDrift4'] as const

export default function AmbientParticles() {
  const particles = useMemo(
    () =>
      Array.from({ length: PARTICLE_COUNT }, (_, i) => {
        const edgeBias = i % 4
        const left = edgeBias === 0 ? 2 + (i * 7) % 12 : edgeBias === 1 ? 88 + (i * 5) % 10 : 15 + (i * 11) % 70
        const top = edgeBias === 2 ? 3 + (i * 9) % 15 : edgeBias === 3 ? 82 + (i * 6) % 12 : 20 + (i * 13) % 60
        return {
          left: `${Math.min(95, Math.max(2, left))}%`,
          top: `${Math.min(95, Math.max(2, top))}%`,
          duration: 18 + (i % 9),
          delay: (i * 4.2) % 16,
          color: COLORS[i % COLORS.length],
          animation: ANIMATION_VARIANTS[i % ANIMATION_VARIANTS.length],
          size: 2 + (i % 2),
        }
      }),
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
