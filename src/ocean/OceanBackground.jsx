// OceanBackground — 화면 고정 바다 배경.
// 깊이 그라데이션 + 빛 줄기 + 상승 기포 + 헤엄치는 어종(앰비언트) + 수면의 배 + 해저.
// 앰비언트 어종은 pointer-events:none (스크롤/콘텐츠 방해 X). 낚시는 FishingGame 이 담당.
import { useMemo } from 'react'
import { SPECIES } from './fishData'
import { fishSVG } from './fishSvg'
import styles from './OceanBackground.module.css'

function rand(a, b) {
  return a + Math.random() * (b - a)
}

export default function OceanBackground() {
  const bubbles = useMemo(
    () =>
      Array.from({ length: 26 }, (_, i) => ({
        id: i,
        size: rand(4, 18),
        left: rand(0, 100),
        dur: rand(7, 16),
        delay: rand(0, 12),
      })),
    []
  )

  const fish = useMemo(() => {
    // 종을 섞어 14마리. 깊이감(작고 흐린 것 = 멀리)
    const list = []
    for (let i = 0; i < 14; i++) {
      const sp = SPECIES[Math.floor(rand(0, SPECIES.length))]
      const depth = rand(0, 1) // 0=가까움 1=멈
      list.push({
        key: i,
        sp,
        top: rand(6, 88),
        dur: rand(16, 40),
        delay: rand(-30, 0),
        dir: Math.random() > 0.5 ? 1 : -1,
        scale: 0.4 + (1 - depth) * 0.75,
        opacity: 0.28 + (1 - depth) * 0.5,
        bob: rand(3, 7),
      })
    }
    return list
  }, [])

  return (
    <div className={styles.ocean} aria-hidden="true">
      <div className={styles.rays} />
      <div className={styles.caustics} />

      {/* 수면 + 배 */}
      <div className={styles.surface}>
        <div className={styles.boat}>
          <svg viewBox="0 0 220 90" width="180" height="74">
            <path d="M30 52 L190 52 L172 78 L48 78 Z" fill="#15303f" stroke="#0a1c26" strokeWidth="2" />
            <rect x="104" y="14" width="4" height="40" fill="#0a1c26" />
            <path d="M108 16 L150 44 L108 44 Z" fill="#f3e6c4" opacity="0.9" />
            <path d="M104 16 L66 44 L104 44 Z" fill="#cdb98f" opacity="0.85" />
            {/* 강캡틴 실루엣 + 빨간 모자 */}
            <circle cx="70" cy="44" r="6" fill="#1d3a49" />
            <path d="M64 40 Q70 34 76 40 Z" fill="#ff5a4d" />
          </svg>
        </div>
      </div>

      {/* 헤엄치는 어종 */}
      <div className={styles.fishLayer}>
        {fish.map((f) => (
          <span
            key={f.key}
            className={`${styles.swimmer} ${f.dir > 0 ? styles.toRight : styles.toLeft}`}
            style={{ top: `${f.top}%`, animationDuration: `${f.dur}s`, animationDelay: `${f.delay}s` }}
          >
            <span
              className={styles.bob}
              style={{
                opacity: f.opacity,
                transform: `scale(${f.scale})`,
                '--bob': `${f.bob}px`,
                animationDuration: `${rand(3.5, 6)}s`,
              }}
            >
              <span
                className={styles.fishSvg}
                style={{ transform: f.dir > 0 ? 'scaleX(-1)' : 'none' }}
                dangerouslySetInnerHTML={{ __html: fishSVG(f.sp, `bg${f.key}`) }}
              />
            </span>
          </span>
        ))}
      </div>

      {/* 기포 */}
      <div className={styles.bubbles}>
        {bubbles.map((b) => (
          <span
            key={b.id}
            className={styles.bubble}
            style={{
              width: b.size,
              height: b.size,
              left: `${b.left}%`,
              animationDuration: `${b.dur}s`,
              animationDelay: `${b.delay}s`,
            }}
          />
        ))}
      </div>

      {/* 해저 */}
      <div className={styles.seabed}>
        <div className={styles.weeds}>
          {Array.from({ length: 9 }, (_, i) => (
            <span key={i} className={styles.weed} style={{ left: `${6 + i * 11}%`, height: `${rand(40, 110)}px`, animationDelay: `${rand(0, 4)}s` }} />
          ))}
        </div>
      </div>
    </div>
  )
}
