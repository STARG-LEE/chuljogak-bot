// 어종 SVG 생성기 — jeju_fish.html 의 형태를 확장(물고기/오징어/문어/광어).
// 문자열 SVG 를 반환해 dangerouslySetInnerHTML 로 어디서나 재사용한다.
// gradient id 충돌 방지를 위해 uid 접미사를 받는다.

export function fishSVG(f, uid = '') {
  const gid = `g_${f.id}_${uid}`
  const k = f.kind

  if (k === 'squid') {
    return `<svg viewBox="0 0 150 120" preserveAspectRatio="xMidYMid meet" aria-label="${f.name}">
      <defs><radialGradient id="${gid}" cx="50%" cy="32%" r="72%">
        <stop offset="0%" stop-color="${f.color}"/><stop offset="100%" stop-color="${f.accent}"/>
      </radialGradient></defs>
      <ellipse cx="75" cy="44" rx="30" ry="36" fill="url(#${gid})" stroke="${f.accent}" stroke-width="2"/>
      <path d="M55 10 L75 32 L95 10 Z" fill="${f.color}" opacity=".8"/>
      <circle cx="65" cy="42" r="5.5" fill="#fff"/><circle cx="66" cy="43" r="2.8" fill="#03222f"/>
      <circle cx="85" cy="42" r="5.5" fill="#fff"/><circle cx="84" cy="43" r="2.8" fill="#03222f"/>
      ${[0, 1, 2, 3, 4, 5, 6, 7]
        .map((i) => {
          const x = 58 + i * 4.6
          return `<path d="M${x} 76 Q${x + (i % 2 ? 7 : -7)} 100 ${x + (i % 2 ? 2 : -2)} 116" stroke="${f.accent}" stroke-width="3" fill="none" stroke-linecap="round" opacity=".85"/>`
        })
        .join('')}
    </svg>`
  }

  if (k === 'octopus') {
    return `<svg viewBox="0 0 150 130" preserveAspectRatio="xMidYMid meet" aria-label="${f.name}">
      <defs><radialGradient id="${gid}" cx="50%" cy="30%" r="75%">
        <stop offset="0%" stop-color="${f.color}"/><stop offset="100%" stop-color="${f.accent}"/>
      </radialGradient></defs>
      <path d="M40 56 Q40 16 75 16 Q110 16 110 56 Q110 78 95 86 L55 86 Q40 78 40 56 Z" fill="url(#${gid})" stroke="${f.accent}" stroke-width="2"/>
      <circle cx="63" cy="50" r="6" fill="#fff"/><circle cx="64" cy="51" r="3" fill="#03222f"/>
      <circle cx="87" cy="50" r="6" fill="#fff"/><circle cx="86" cy="51" r="3" fill="#03222f"/>
      ${[0, 1, 2, 3, 4, 5]
        .map((i) => {
          const x = 50 + i * 10
          const dir = i % 2 ? 1 : -1
          return `<path d="M${x} 84 Q${x + dir * 10} 108 ${x + dir * 3} 124" stroke="${f.accent}" stroke-width="6" fill="none" stroke-linecap="round" opacity=".9"/>`
        })
        .join('')}
    </svg>`
  }

  if (k === 'flat') {
    // 광어 — 납작한 마름모형
    return `<svg viewBox="0 0 170 110" preserveAspectRatio="xMidYMid meet" aria-label="${f.name}">
      <defs><linearGradient id="${gid}" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="${f.color}"/><stop offset="100%" stop-color="${f.accent}"/>
      </linearGradient></defs>
      <path d="M150 55 L168 42 L166 55 L168 68 Z" fill="${f.accent}"/>
      <path d="M28 55 Q70 14 120 38 Q150 50 150 55 Q150 60 120 72 Q70 96 28 55 Z" fill="url(#${gid})" stroke="${f.accent}" stroke-width="2"/>
      <circle cx="52" cy="44" r="6" fill="#fff"/><circle cx="54" cy="45" r="3" fill="#03222f"/>
      <circle cx="66" cy="42" r="5" fill="#fff"/><circle cx="68" cy="43" r="2.6" fill="#03222f"/>
      <path d="M40 60 Q44 66 50 64" stroke="#03222f" stroke-width="2" fill="none" opacity=".5"/>
    </svg>`
  }

  // 일반 물고기
  return `<svg viewBox="0 0 170 100" preserveAspectRatio="xMidYMid meet" aria-label="${f.name}">
    <defs><linearGradient id="${gid}" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${f.color}"/><stop offset="100%" stop-color="${f.accent}"/>
    </linearGradient></defs>
    <path d="M128 50 L158 28 L155 50 L158 72 Z" fill="${f.accent}"/>
    <path d="M22 50 C22 16 112 16 130 50 C112 84 22 84 22 50 Z" fill="url(#${gid})" stroke="${f.accent}" stroke-width="2"/>
    <path d="M62 22 L80 7 L84 26 Z" fill="${f.accent}" opacity=".85"/>
    <path d="M57 78 L74 92 L80 74 Z" fill="${f.accent}" opacity=".7"/>
    <circle cx="44" cy="46" r="7" fill="#fff"/><circle cx="46" cy="47" r="3.6" fill="#03222f"/>
    <path d="M90 36 Q107 50 90 64" stroke="${f.accent}" stroke-width="1.6" fill="none" opacity=".5"/>
    <path d="M102 38 Q117 50 102 62" stroke="${f.accent}" stroke-width="1.6" fill="none" opacity=".4"/>
    <path d="M24 50 Q22 56 28 58" stroke="#03222f" stroke-width="2" fill="none" opacity=".5"/>
  </svg>`
}
