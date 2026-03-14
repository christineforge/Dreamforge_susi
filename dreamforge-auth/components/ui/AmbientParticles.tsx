'use client'

import { useMemo } from 'react'
import styles from './AmbientParticles.module.css'

const PARTICLE_COUNT = 14

const COLORS = [
  'rgba(59,130,246,0.75)',
  'rgba(96,165,250,0.7)',
  'rgba(147,197,253,0.65)',
] as const

export default function AmbientParticles() {
  const particles = useMemo(
    () =>
      Array.from({ length: PARTICLE_COUNT }, (_, i) => {
        const edgeBias = i % 4

        const left =
          edgeBias === 0
            ? 2 + (i * 7) % 12
            : edgeBias === 1
            ? 88 + (i * 5) % 10
            : 15 + (i * 11) % 70

        const top =
          edgeBias === 2
            ? 3 + (i * 9) % 15
            : edgeBias === 3
            ? 82 + (i * 6) % 12
            : 20 + (i * 13) % 60

        return {
          left: `${Math.min(95, Math.max(2, left))}%`,
          top: `${Math.min(95, Math.max(2, top))}%`,
          duration: 10 + (i % 6),
          delay: (i * 2.5) % 8,
          color: COLORS[i % COLORS.length],
          animation: `particleDrift${(i % 4) + 1}`,
          size: 3,
        }
      }),
    []
  )

  return (
    <div className={styles.container} aria-hidden="true">
      {particles.map((p, i) => (
        <span
          key={i}
          className={styles.particle}
          style={{
            left: p.left,
            top: p.top,
            animation: `${p.animation} ${p.duration}s ease-in-out ${p.delay}s infinite`,
            background: p.color,
            width: p.size,
            height: p.size,
          }}
        />
      ))}
    </div>
  )
}
