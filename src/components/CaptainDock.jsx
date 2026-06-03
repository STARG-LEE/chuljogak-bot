// CaptainDock — 우하단 플로팅 토글. 닫혀있으면 런처 버튼, 클릭하면 강캡틴 봇(아바타+채팅+TTT/STS/FTF)
// 을 담은 드래그 가능한 미니창으로 열린다. 봇 로직은 App 에 그대로 두고 children 으로 패널만 받는다.
import { useState, useRef, useCallback, useEffect } from 'react'
import styles from './CaptainDock.module.css'

const MARGIN = 12

function clamp(v, min, max) {
  return Math.min(Math.max(min, v), Math.max(min, max))
}

export default function CaptainDock({ open, onOpen, onClose, children }) {
  const [pos, setPos] = useState(null) // {x,y} 좌상단. null = 기본 우하단
  const dragRef = useRef(null)
  const sizeRef = useRef({ w: 420, h: 700 })

  // 처음 열 때 우하단 배치
  useEffect(() => {
    if (open && pos === null) {
      const w = Math.min(420, window.innerWidth - MARGIN * 2)
      const h = Math.min(700, window.innerHeight - MARGIN * 2)
      sizeRef.current = { w, h }
      setPos({ x: window.innerWidth - w - MARGIN, y: window.innerHeight - h - MARGIN })
    }
  }, [open, pos])

  useEffect(() => {
    if (!open) return
    const onResize = () =>
      setPos((p) => (p ? {
        x: clamp(p.x, MARGIN, window.innerWidth - sizeRef.current.w - MARGIN),
        y: clamp(p.y, MARGIN, window.innerHeight - sizeRef.current.h - MARGIN),
      } : p))
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [open])

  const onPointerDown = useCallback((e) => {
    if (e.target.closest('button')) return
    const { w, h } = sizeRef.current
    dragRef.current = { sx: e.clientX, sy: e.clientY, ox: pos?.x ?? 0, oy: pos?.y ?? 0 }
    const move = (ev) => {
      const d = dragRef.current
      if (!d) return
      setPos({
        x: clamp(d.ox + (ev.clientX - d.sx), MARGIN, window.innerWidth - w - MARGIN),
        y: clamp(d.oy + (ev.clientY - d.sy), MARGIN, window.innerHeight - h - MARGIN),
      })
    }
    const up = () => {
      dragRef.current = null
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerup', up)
    }
    window.addEventListener('pointermove', move)
    window.addEventListener('pointerup', up)
  }, [pos])

  if (!open) {
    return (
      <button className={styles.launcher} onClick={onOpen} aria-label="강캡틴 열기">
        <span className={styles.launcherFace}>🧑‍✈️</span>
        <span className={styles.launcherText}>강캡틴에게 묻기</span>
      </button>
    )
  }

  return (
    <div
      className={styles.dock}
      style={pos ? { left: pos.x, top: pos.y } : { right: MARGIN, bottom: MARGIN }}
    >
      <div className={styles.header} onPointerDown={onPointerDown}>
        <span className={styles.title}>🧑‍✈️ 강캡틴 · 출조각 AI</span>
        <div className={styles.actions}>
          <button className={styles.btn} onClick={onClose} title="최소화">▁</button>
          <button className={styles.btn} onClick={onClose} title="닫기">✕</button>
        </div>
      </div>
      <div className={styles.body}>{children}</div>
    </div>
  )
}
