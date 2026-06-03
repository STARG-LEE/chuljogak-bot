// 제주도 어종 데이터 — jeju_fish.html + 사용자 제공 레퍼런스(시즌/지역/시세/난이도/맛/출조시간/물때/크기)를
// 통합한 단일 소스. 헤엄치는 물고기 · 낚시 게임 · 도감 카드 · AI 엔진 시연이 모두 이 데이터를 공유한다.

// kind: 'fish' | 'squid' | 'octopus' — SVG 형태 분기에 사용
export const SPECIES = [
  {
    id: 'galchi', name: '갈치', emoji: '🐟', kind: 'fish',
    color: '#e8eef5', accent: '#9aa7b5',
    seasons: ['여름', '가을'], regions: '남부·북부권',
    priceMin: 15000, priceMax: 70000, priceLabel: '15,000~70,000원/kg+',
    diff: 2, taste: 'A급', size: '60~100cm', time: '야간', tide: '사리에 활성 ↑',
    beginner: '매우 추천',
    note: '제주 대표 야간 선상낚시 어종. 회보다 구이·조림으로 유명. 6월부터 본격 시즌.',
  },
  {
    id: 'hanchi', name: '한치', emoji: '🦑', kind: 'squid',
    color: '#ffe1c4', accent: '#ff9e6d',
    seasons: ['여름', '가을'], regions: '남부·북부권',
    priceMin: 15000, priceMax: 35000, priceLabel: '15,000~35,000원/kg',
    diff: 1, taste: 'A급', size: '15~30cm', time: '야간', tide: '-',
    beginner: '매우 추천',
    note: '입문용 선상낚시. 조황이 안정적이며 달고 부드러운 식감이 일품.',
  },
  {
    id: 'chamdom', name: '참돔', emoji: '🐡', kind: 'fish',
    color: '#ff9aab', accent: '#e85d72',
    seasons: ['봄', '여름'], regions: '동부·남부권',
    priceMin: 20000, priceMax: 50000, priceLabel: '20,000~50,000원+',
    diff: 3, taste: 'S급', size: '30~70cm', time: '새벽·오전', tide: '-',
    beginner: '추천',
    note: '타이라바 운용 경험이 필요한 보통 난이도. 수온 상승기 활성도가 높다.',
  },
  {
    id: 'gabojingeo', name: '갑오징어', emoji: '🦑', kind: 'squid',
    color: '#f7ecd2', accent: '#c9a86a',
    seasons: ['봄'], regions: '동부권',
    priceMin: 20000, priceMax: 45000, priceLabel: '20,000~45,000원/kg',
    diff: 1, taste: 'A급', size: '300~800g', time: '새벽·오전', tide: '조금에 유리',
    beginner: '매우 추천',
    note: '초보자 추천. 채비 운용이 쉬워 입문자에게 최적. 봄이 핵심 시기.',
  },
  {
    id: 'busiri', name: '부시리', emoji: '🐟', kind: 'fish',
    color: '#b6e6d8', accent: '#5fae98',
    seasons: ['가을', '겨울'], regions: '서부권',
    priceMin: 12000, priceMax: 25000, priceLabel: '12,000~25,000원/kg',
    diff: 4, taste: 'B급', size: '60~120cm', time: '오전', tide: '사리에 활성 ↑',
    beginner: '비추천',
    note: '힘이 매우 강해 장비 운용이 중요한 어려운 어종. 대형 개체를 노릴 수 있다.',
  },
  {
    id: 'bangeo', name: '방어', emoji: '🐟', kind: 'fish',
    color: '#a6cef0', accent: '#4d8fc4',
    seasons: ['겨울', '가을'], regions: '서부권',
    priceMin: 15000, priceMax: 40000, priceLabel: '15,000~40,000원/kg+',
    diff: 5, taste: 'S급', size: '70~120cm', time: '오전', tide: '사리에 활성 ↑',
    beginner: '비추천',
    note: '겨울 제주 대물 시즌. 대방어는 지방이 풍부해 최고급 횟감. 체력 소모가 크다.',
  },
  {
    id: 'doldom', name: '돌돔', emoji: '🐠', kind: 'fish',
    color: '#eef0f3', accent: '#5c5c66',
    seasons: ['봄', '겨울'], regions: '서부권',
    priceMin: 40000, priceMax: 80000, priceLabel: '40,000~80,000원/kg',
    diff: 5, taste: 'S급', size: '35~60cm', time: '오전', tide: '-',
    beginner: '비추천',
    note: '제주 최고 난이도급. 포인트와 타이밍이 관건인 제주 대표 고급 횟감.',
  },
  // ── 기타 어종 (난이도·맛 레퍼런스 보강) ──
  {
    id: 'urok', name: '우럭', emoji: '🐟', kind: 'fish',
    color: '#c9b79a', accent: '#7d6a4d',
    seasons: ['봄', '여름', '가을', '겨울'], regions: '전 지역',
    priceMin: 15000, priceMax: 30000, priceLabel: '15,000~30,000원/kg',
    diff: 2, taste: 'B급', size: '25~40cm', time: '종일', tide: '-',
    beginner: '추천',
    note: '사계절 가능한 국민 생선. 초보자 선호도가 높고 매운탕·구이 모두 좋다.',
  },
  {
    id: 'muneo', name: '문어', emoji: '🐙', kind: 'octopus',
    color: '#e7a6a0', accent: '#b5524c',
    seasons: ['가을', '겨울'], regions: '전 지역',
    priceMin: 25000, priceMax: 50000, priceLabel: '25,000~50,000원/kg',
    diff: 3, taste: 'A급', size: '1~3kg', time: '오전', tide: '-',
    beginner: '추천',
    note: '체력 소모가 있고 바닥 지형 이해가 필요한 보통 난이도. 쫄깃한 식감의 별미.',
  },
  {
    id: 'gwangeo', name: '광어', emoji: '🐟', kind: 'flat',
    color: '#cfc6ad', accent: '#6f6448',
    seasons: ['봄', '가을'], regions: '남부·서부권',
    priceMin: 20000, priceMax: 40000, priceLabel: '20,000~40,000원/kg',
    diff: 4, taste: 'A급', size: '40~70cm', time: '새벽·오전', tide: '-',
    beginner: '비추천',
    note: '루어 운용 능력이 필요한 어려운 어종. 쫄깃한 횟감으로 인기가 높다.',
  },
]

// 헤엄치는 배경 어종 / 낚시 게임 대상 (데이터가 풍부한 핵심 7종)
export const CATCHABLE = SPECIES.filter((s) =>
  ['galchi', 'hanchi', 'chamdom', 'gabojingeo', 'busiri', 'bangeo', 'doldom'].includes(s.id)
)

export const SEASONS = ['전체', '봄', '여름', '가을', '겨울']

export const diffStars = (n) => '★'.repeat(n) + '☆'.repeat(5 - n)

// 현재(데모) 시즌 — 발표 시점 기준으로 바꿔도 됨
export const CURRENT_SEASON = '여름'

// kg당 시세를 살짝 랜덤하게 흔들어 "자동 책정" 느낌
export function autoPrice(species, seed = 0) {
  const span = species.priceMax - species.priceMin
  const r = (Math.sin((seed + 1) * 12.9898) * 43758.5453) % 1
  const frac = 0.35 + Math.abs(r) * 0.4 // 35~75% 지점
  const raw = species.priceMin + span * frac
  return Math.round(raw / 500) * 500
}

// ── PPT AI 엔진: 7가지 입력 데이터 ──
export const ENGINE_INPUTS = [
  { icon: '🌤️', label: '기상 정보', sub: '실시간 + 예보' },
  { icon: '🌡️', label: '수온', sub: '국립해양조사원' },
  { icon: '🌊', label: '조류', sub: '방향·세기' },
  { icon: '💨', label: '풍속', sub: 'm/s' },
  { icon: '🌙', label: '월령(물때)', sub: '대조·소조' },
  { icon: '📅', label: '계절 정보', sub: '어종 패턴' },
  { icon: '📊', label: '과거 어획', sub: 'OUR MOAT' },
]

// ── 출조 조건 레퍼런스 (풍속 / 파고 / 물때) ──
export const WIND_SCALE = [
  { range: '0~4 m/s', label: '매우 양호', level: 0 },
  { range: '5~7 m/s', label: '출조 가능', level: 1 },
  { range: '8~10 m/s', label: '주의', level: 2 },
  { range: '11~13 m/s', label: '숙련자 권장', level: 3 },
  { range: '14 m/s+', label: '출조 비추천', level: 4 },
]

export const WAVE_SCALE = [
  { range: '0~1 m', label: '매우 좋음', level: 0 },
  { range: '1~2 m', label: '출조 가능', level: 1 },
  { range: '2~3 m', label: '주의', level: 2 },
  { range: '3 m+', label: '출조 비추천', level: 4 },
]

export const TIDE_INFO = [
  { name: '조금', desc: '갑오징어 유리 · 초보자에게 유리' },
  { name: '사리', desc: '갈치 활성 ↑ · 대형 어종 활성 ↑' },
  { name: '무시', desc: '조류 변화 적음 · 활성도 감소 가능' },
]

// 지역별 대표 어종
export const REGIONS = [
  { name: '제주 동부권', sub: '성산·우도', fish: ['갑오징어', '참돔', '갈치'] },
  { name: '제주 남부권', sub: '서귀포·위미', fish: ['갈치', '한치', '참돔'] },
  { name: '제주 서부권', sub: '모슬포', fish: ['방어', '부시리', '돌돔'] },
  { name: '제주 북부권', sub: '애월·도두', fish: ['갈치', '한치'] },
]

export const SEA_TIPS = [
  '수온이 급격히 변하면 입질이 줄어든다.',
  '강풍보다 파고가 더 위험할 수 있다.',
  '조금 물때는 초보자에게 유리하다.',
  '사리 물때는 대형 어종 활성도가 높다.',
  '제주도는 전국 최대 갈치 선상낚시 지역 중 하나다.',
  '겨울 제주 대표 대물 어종은 방어다.',
]
