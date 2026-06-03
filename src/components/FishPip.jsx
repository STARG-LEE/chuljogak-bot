// FishPip — 유튜브 프리미엄 PIP 스타일 플로팅 어종 도감.
// 우하단 런처 버튼 → 클릭하면 드래그 가능한 미니창으로 /jeju_fish.html 표시.
// 확대/축소 토글 + 닫기. 채팅하는 동안 계속 떠 있다.
import { useState, useRef, useCallback, useEffect } from 'react'
import styles from './FishPip.module.css'

const SMALL = { w: 360, h: 520 }
const LARGE = { w: 720, h: 640 }
const MARGIN = 10

function clamp(v, min, max) {
  return Math.min(Math.max(min, v), Math.max(min, max))
}

export default function FishPip() {
  const [open, setOpen] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const [pos, setPos] = useState(null) // {x,y} 좌상단. null = 기본 우하단
  const dragRef = useRef(null)

  const size = expanded ? LARGE : SMALL

  // 처음 열 때 우하단으로 배치
  useEffect(() => {
    if (open && pos === null) {
      setPos({
        x: window.innerWidth - size.w - MARGIN,
        y: window.innerHeight - size.h - MARGIN,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  // 확대/축소·리사이즈 시 화면 안으로 보정
  useEffect(() => {
    if (!open) return
    const onResize = () =>
      setPos((p) =>
        p
          ? {
              x: clamp(p.x, MARGIN, window.innerWidth - size.w - MARGIN),
              y: clamp(p.y, MARGIN, window.innerHeight - size.h - MARGIN),
            }
          : p
      )
    onResize()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expanded, open])

  const onPointerDown = useCallback(
    (e) => {
      if (e.target.closest('button')) return
      dragRef.current = {
        sx: e.clientX,
        sy: e.clientY,
        ox: pos?.x ?? 0,
        oy: pos?.y ?? 0,
      }
      const move = (ev) => {
        const d = dragRef.current
        if (!d) return
        setPos({
          x: clamp(d.ox + (ev.clientX - d.sx), MARGIN, window.innerWidth - size.w - MARGIN),
          y: clamp(d.oy + (ev.clientY - d.sy), MARGIN, window.innerHeight - size.h - MARGIN),
        })
      }
      const up = () => {
        dragRef.current = null
        window.removeEventListener('pointermove', move)
        window.removeEventListener('pointerup', up)
      }
      window.addEventListener('pointermove', move)
      window.addEventListener('pointerup', up)
    },
    [pos, size.w, size.h]
  )

  if (!open) {
    return (
      <button className={styles.launcher} onClick={() => setOpen(true)} aria-label="어종 도감 열기">
        🐟 <span className={styles.launcherText}>어종 도감</span>
      </button>
    )
  }

  return (
    <div
      className={styles.pip}
      style={{ left: pos?.x ?? 0, top: pos?.y ?? 0, width: size.w, height: size.h }}
    >
      <div className={styles.header} onPointerDown={onPointerDown}>
        <span className={styles.title}>🐟 제주 어종 도감</span>
        <div className={styles.actions}>
          <button
            className={styles.btn}
            onClick={() => setExpanded((v) => !v)}
            title={expanded ? '작게' : '크게'}
          >
            {expanded ? '🗕' : '🗖'}
          </button>
          <button className={styles.btn} onClick={() => setOpen(false)} title="닫기">
            ✕
          </button>
        </div>
      </div>
      <iframe className={styles.frame} src="/jeju_fish.html" title="제주 어종 인터랙티브 도감" />
    </div>
  )
}
