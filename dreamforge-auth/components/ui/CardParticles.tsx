'use client'

import { useMemo } from 'react'
import styles from './CardParticles.module.css'

const PARTICLE_COUNT = 6

export default function CardParticles() {
  const positions = useMemo(() => {
    return Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
      left: `${15 + (i * 14) % 70}%`,
      top: `${10 + (i * 17) % 80}%`,
      animationDelay: `${i * 2}s`,
    }))
  }, [])

  return (
    <div className={styles.particles} aria-hidden="true">
      {positions.map((pos, i) => (
        <span
          key={i}
          className={styles.particle}
          style={{
            left: pos.left,
            top: pos.top,
            animationDelay: pos.animationDelay,
          }}
        />
      ))}
    </div>
  )
}
