// FishingGame — 마우스로 직접 낚는 조준형 낚시.
// 바다에 물고기가 헤엄친다 → 바다를 클릭(포인터)해 바늘을 던짐 → 마우스로 바늘을 움직여
// 물고기에게 가져감 → 가까워지면 그 물고기가 입질 → 클릭(챔질) → 릴링 → 조과 카드 → 마켓 자동 등록.
// 움직이는 부분(물고기/바늘/줄)은 rAF + DOM 직접 조작(리렌더 0). UI(상태/카드/버튼)만 React.
import { useState, useRef, useCallback, useEffect } from 'react'
import { CATCHABLE, CURRENT_SEASON, diffStars, autoPrice } from './fishData'
import { fishSVG } from './fishSvg'
import styles from './FishingGame.module.css'

const FISH_COUNT = 6
const BITE_R = 46        // 입질 인식 반경(px)
const EASE = 0.16        // 바늘 따라오는 정도
const rnd = (a, b) => a + Math.random() * (b - a)

function pickSpecies() {
  const inSeason = CATCHABLE.filter((f) => f.seasons.includes(CURRENT_SEASON))
  const pool = Math.random() < 0.68 && inSeason.length ? inSeason : CATCHABLE
  return pool[Math.floor(Math.random() * pool.length)]
}

export default function FishingGame({ open, onClose, onBrag }) {
  const [phase, setPhase] = useState('idle') // idle|cast|fishing|bite|reeling|caught
  const [caught, setCaught] = useState(null) // {sp, weight, kgPrice, total}
  const [log, setLog] = useState([])
  const [flash, setFlash] = useState('')

  const waterRef = useRef(null)
  const fishWrapRef = useRef(null)
  const hookRef = useRef(null)
  const aimRef = useRef(null)
  const lineRef = useRef(null)

  const fishesRef = useRef([])
  const boundsRef = useRef({ w: 420, h: 460 })
  const mouseRef = useRef({ x: 210, y: 230 })
  const hookPosRef = useRef({ x: 210, y: 0 })
  const bitingRef = useRef(null)
  const phaseRef = useRef('idle')
  const tickRef = useRef(0)
  const timers = useRef([])
  const flashTimer = useRef(0)

  const clearTimers = useCallback(() => { timers.current.forEach(clearTimeout); timers.current = [] }, [])
  const after = useCallback((ms, fn) => { timers.current.push(setTimeout(fn, ms)) }, [])

  const goPhase = useCallback((p) => { phaseRef.current = p; setPhase(p) }, [])
  const doFlash = useCallback((msg) => {
    setFlash(msg)
    clearTimeout(flashTimer.current)
    flashTimer.current = setTimeout(() => setFlash(''), 1300)
  }, [])

  // ── 캐스팅 / 챔질 / 릴링 / 놓침 ──
  const cast = useCallback((lx, ly) => {
    if (phaseRef.current !== 'idle') return
    mouseRef.current = { x: lx, y: ly }
    hookPosRef.current = { x: lx, y: ly } // 던진 자리로 바늘이 날아감
    goPhase('cast')
    after(260, () => { if (phaseRef.current === 'cast') goPhase('fishing') })
  }, [after, goPhase])

  const escape = useCallback(() => {
    if (phaseRef.current !== 'bite') return
    const f = bitingRef.current
    if (f) { f.biting = false; f.vx = (f.x > boundsRef.current.w / 2 ? 1 : -1) * rnd(45, 75) }
    bitingRef.current = null
    doFlash('놓쳤다! 🐟💨')
    goPhase('fishing')
  }, [doFlash, goPhase])

  const toCaught = useCallback((f) => {
    const sp = f.sp
    const weight = Math.round(rnd(1, 8) * 10) / 10
    const kgPrice = autoPrice(sp, log.length + weight)
    const total = Math.round((kgPrice * weight) / 100) * 100
    setCaught({ sp, weight, kgPrice, total })
    setLog((l) => [...l, sp.id])
    goPhase('caught')
    bitingRef.current = null
    if (f.respawn) f.respawn()
  }, [goPhase, log.length])

  const strike = useCallback(() => {
    if (phaseRef.current !== 'bite') return
    clearTimers()
    const f = bitingRef.current
    if (!f) { goPhase('fishing'); return }
    goPhase('reeling')
    after(720, () => toCaught(f))
  }, [after, clearTimers, goPhase, toCaught])

  const recast = useCallback(() => { setCaught(null); goPhase('idle') }, [goPhase])

  // ── 포인터(마우스/터치) ──
  const localPt = (e) => {
    const r = waterRef.current.getBoundingClientRect()
    return {
      x: Math.max(0, Math.min(r.width, e.clientX - r.left)),
      y: Math.max(0, Math.min(r.height, e.clientY - r.top)),
    }
  }
  const onMove = useCallback((e) => {
    if (!waterRef.current) return
    const p = localPt(e)
    mouseRef.current = p
    if (phaseRef.current === 'idle' && aimRef.current) {
      aimRef.current.style.transform = `translate(${p.x - 16}px, ${p.y - 16}px)`
    }
  }, [])
  const onDown = useCallback((e) => {
    if (!waterRef.current) return
    const p = localPt(e)
    mouseRef.current = p
    if (phaseRef.current === 'idle') cast(p.x, p.y)
    else if (phaseRef.current === 'bite') strike()
  }, [cast, strike])

  // ── 씬 셋업 + rAF 루프 ──
  useEffect(() => {
    if (!open) return
    const water = waterRef.current
    const wrap = fishWrapRef.current
    if (!water || !wrap) return

    const measure = () => {
      const r = water.getBoundingClientRect()
      boundsRef.current = { w: r.width, h: r.height }
    }
    measure()
    window.addEventListener('resize', measure)

    // 물고기 생성
    wrap.innerHTML = ''
    const W = boundsRef.current.w, H = boundsRef.current.h
    const fishes = []
    for (let i = 0; i < FISH_COUNT; i++) {
      const el = document.createElement('div')
      el.className = styles.swimFish
      const f = {
        id: i, el, sp: pickSpecies(),
        x: rnd(20, W - 20), y: rnd(30, H - 40),
        vx: (Math.random() < 0.5 ? 1 : -1) * rnd(22, 52), biting: false, dir: 1,
      }
      f.respawn = () => {
        f.sp = pickSpecies()
        f.el.innerHTML = fishSVG(f.sp, 'fg' + f.id)
        f.biting = false
        const fromLeft = Math.random() < 0.5
        f.vx = (fromLeft ? 1 : -1) * rnd(22, 52)
        f.x = fromLeft ? -50 : boundsRef.current.w + 50
        f.y = rnd(30, boundsRef.current.h - 40)
      }
      el.innerHTML = fishSVG(f.sp, 'fg' + i)
      wrap.appendChild(el)
      fishes.push(f)
    }
    fishesRef.current = fishes
    hookPosRef.current = { x: W / 2, y: 0 }

    // setInterval 구동(~30fps). rAF는 백그라운드 탭에서 멈춰 데모 검증이 안 되므로 interval 사용.
    let prev = performance.now()
    const step = () => {
      const now = performance.now()
      const dt = Math.min(0.05, (now - prev) / 1000)
      prev = now
      const ph = phaseRef.current
      const B = boundsRef.current
      const hp = hookPosRef.current

      // 바늘 목표: idle=로드끝 / reeling·caught=로드끝(끌어올림) / 그 외=마우스
      let tx = mouseRef.current.x, ty = mouseRef.current.y
      if (ph === 'idle') { tx = B.w / 2; ty = 0 }
      else if (ph === 'reeling' || ph === 'caught') { tx = B.w / 2; ty = 0 }
      hp.x += (tx - hp.x) * EASE
      hp.y += (ty - hp.y) * EASE

      // 물고기 이동
      for (const f of fishes) {
        if (f.biting) {
          // 바늘에 붙어 따라옴
          f.x += (hp.x - f.x) * 0.25
          f.y += (hp.y + 14 - f.y) * 0.25
        } else {
          f.x += f.vx * dt
          if (f.x < -60) { f.respawn(); f.x = -50; f.vx = Math.abs(f.vx) }
          else if (f.x > B.w + 60) { f.respawn(); f.x = B.w + 50; f.vx = -Math.abs(f.vx) }
          // 살짝 위아래 흔들림
          f.y += Math.sin((now / 600) + f.id) * 0.25
        }
        if (f.vx !== 0) f.dir = f.vx > 0 ? -1 : 1
        f.el.style.transform = `translate(${f.x - 34}px, ${f.y - 24}px) scaleX(${f.dir})`
        f.el.style.opacity = f.biting ? '1' : '0.95'
      }

      // 입질 감지
      if (ph === 'fishing') {
        let best = null, bestD = BITE_R
        for (const f of fishes) {
          const d = Math.hypot(f.x - hp.x, f.y - hp.y)
          if (d < bestD) { bestD = d; best = f }
        }
        if (best) {
          best.biting = true
          bitingRef.current = best
          phaseRef.current = 'bite'
          setPhase('bite')
          clearTimers()
          timers.current.push(setTimeout(escape, 2000))
        }
      }

      // 바늘 + 조준마커 위치
      if (hookRef.current) {
        hookRef.current.style.transform = `translate(${hp.x - 7}px, ${hp.y - 2}px)`
        hookRef.current.style.opacity = ph === 'idle' ? '0' : '1'
      }
      if (aimRef.current) aimRef.current.style.opacity = ph === 'idle' ? '1' : '0'
      if (lineRef.current) {
        lineRef.current.setAttribute('x1', B.w / 2)
        lineRef.current.setAttribute('x2', hp.x)
        lineRef.current.setAttribute('y2', hp.y)
      }
    }
    tickRef.current = setInterval(step, 33)

    return () => {
      clearInterval(tickRef.current)
      window.removeEventListener('resize', measure)
      clearTimers()
      clearTimeout(flashTimer.current)
      if (wrap) wrap.innerHTML = ''
      fishesRef.current = []
      bitingRef.current = null
    }
  }, [open, clearTimers, escape])

  // 닫으면 초기화
  useEffect(() => {
    if (!open) { phaseRef.current = 'idle'; setPhase('idle'); setCaught(null); setFlash('') }
  }, [open])

  if (!open) return null

  const unique = new Set(log).size
  const status = {
    idle: '🎣 바다를 클릭해 바늘을 던지세요',
    cast: '바늘을 던지는 중…',
    fishing: '마우스로 바늘을 움직여 물고기에게 가져가세요',
    bite: '입질!! 지금 클릭해서 챔질!',
    reeling: '릴링 중…',
    caught: '조과 등록 완료',
  }[phase]

  return (
    <div className={styles.overlay} role="dialog" aria-label="출조각 낚시">
      <div className={styles.scene}>
        <button className={styles.close} onClick={onClose} aria-label="닫기">✕</button>

        <div className={styles.hud}>
          <span className={styles.hudTitle}>🎣 출조각 낚시</span>
          <span className={styles.hudStat}>이번 시즌 <b>{CURRENT_SEASON}</b> · 조과 {log.length} · 도감 {unique}/{CATCHABLE.length}</span>
        </div>

        {/* 물속(인터랙션 영역) */}
        <div
          ref={waterRef}
          className={`${styles.water} ${phase === 'idle' ? styles.aiming : ''}`}
          onPointerMove={onMove}
          onPointerDown={onDown}
        >
          <svg className={styles.lineSvg} aria-hidden="true">
            <line ref={lineRef} x1="210" y1="0" x2="210" y2="0" stroke="rgba(234,246,251,.75)" strokeWidth="1.6" />
          </svg>
          <div ref={fishWrapRef} className={styles.fishWrap} />
          <div ref={aimRef} className={styles.aim} />
          <div ref={hookRef} className={styles.hook}>
            <span className={`${styles.hookTip} ${phase === 'bite' ? styles.hookBite : ''}`} />
          </div>
          {phase === 'bite' && <div className={styles.biteHint}>물었다! 클릭 🔥</div>}
          {flash && <div className={styles.flash}>{flash}</div>}
        </div>

        <div className={styles.status}>{status}</div>

        {/* 조과 카드 */}
        {phase === 'caught' && caught && (
          <div className={styles.catchCard}>
            <div className={styles.catchHead}>
              <span className={styles.catchEmoji}>{caught.sp.emoji}</span>
              <div>
                <div className={styles.catchName}>{caught.sp.name} <span className={styles.catchSize}>{caught.weight}kg</span></div>
                <div className={styles.catchMeta}>{diffStars(caught.sp.diff)} · {caught.sp.taste} 횟감 · {caught.sp.size}</div>
              </div>
            </div>
            <div className={styles.catchRows}>
              <div className={styles.cRow}><span>시즌</span><b>{caught.sp.seasons.join('·')}</b></div>
              <div className={styles.cRow}><span>주요 지역</span><b>{caught.sp.regions}</b></div>
              <div className={styles.cRow}><span>추천 출조</span><b>{caught.sp.time}</b></div>
            </div>
            <div className={styles.market}>
              <div className={styles.marketTag}>🛒 출조각 마켓 자동 등록</div>
              <div className={styles.marketRow}><span>자동 시세</span><b>kg당 {caught.kgPrice.toLocaleString()}원</b></div>
              <div className={styles.marketRow}><span>예상 정산 ({caught.weight}kg)</span><b className={styles.marketTotal}>{caught.total.toLocaleString()}원</b></div>
              <div className={styles.marketDelivery}>🚚 새벽 배송 가능 · 산지 → 식탁 직결</div>
            </div>
            <p className={styles.note}>💡 {caught.sp.note}</p>
          </div>
        )}

        {/* 컨트롤 */}
        <div className={styles.controls}>
          {phase === 'caught' ? (
            <div className={styles.caughtBtns}>
              <button className={styles.castBtn} onClick={recast}>🎣 다시 낚기</button>
              {onBrag && <button className={styles.ghostBtn} onClick={() => onBrag(caught.sp)}>🧑‍✈️ 강캡틴에게 자랑</button>}
            </div>
          ) : (
            <span className={styles.ctrlHint}>{status}</span>
          )}
        </div>
      </div>
    </div>
  )
}
