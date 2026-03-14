'use client'

import { useMemo } from 'react'
import styles from './AmbientParticles.module.css'

const PARTICLE_COUNT = 14
const EDGE_PARTICLE_COUNT = 8

const COLORS = [
  'rgba(59,130,246,0.75)',
  'rgba(96,165,250,0.7)',
  'rgba(147,197,253,0.65)',
] as const

export default function AmbientParticles() {
  const particles = useMemo(() => {
    const base = Array.from({ length: PARTICLE_COUNT }, (_, i) => {
      const edgeBias = i % 4
      const left =
        edgeBias === 0
          ? 0 + (i * 11) % 15
          : edgeBias === 1
          ? 85 + (i * 3) % 15
          : 5 + (i * 13) % 90
      const top =
        edgeBias === 2
          ? 0 + (i * 7) % 12
          : edgeBias === 3
          ? 88 + (i * 5) % 12
          : 5 + (i * 17) % 90
      return {
        left: `${Math.min(98, Math.max(0, left))}%`,
        top: `${Math.min(98, Math.max(0, top))}%`,
        duration: 10 + (i % 6),
        delay: (i * 2.5) % 8,
        color: COLORS[i % COLORS.length],
        animation: `particleDrift${(i % 4) + 1}`,
        size: 3,
      }
    })
    const leftRight = Array.from({ length: EDGE_PARTICLE_COUNT }, (_, i) => {
      const isLeft = i % 2 === 0
      return {
        left: isLeft ? `${0 + (i * 2) % 12}%` : `${88 + (i * 1.5) % 12}%`,
        top: `${5 + (i * 13) % 90}%`,
        duration: 11 + (i % 5),
        delay: (i * 1.8) % 6,
        color: COLORS[i % COLORS.length],
        animation: `particleDrift${(i % 4) + 1}`,
        size: 2 + (i % 2),
      }
    })
    return [...base, ...leftRight]
  }, [])

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
