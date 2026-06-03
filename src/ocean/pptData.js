// 비즈니스모델제안서_AI바다(이성채) PPT 전체 콘텐츠 — 섹션 렌더링용 단일 소스.

export const BRAND = {
  service: '출조각',
  serviceEn: 'CHULJOGAK',
  title: 'AI 기반 스마트 선상낚시 & 온라인 수산물 판매 플랫폼',
  category: '수산 레저·유통 플랫폼',
  tagline: '오늘, 출조각 나옴.',
  taglineSub: '— 강캡틴, 새벽 4시',
  pitchLine: '바다는 운이 아니라, 데이터로 읽는다.',
  team: 'AI바다',
  author: '이성채',
  dept: '데이터경영학과 · 경영학전공',
}

// PROBLEM — 4
export const PROBLEMS = [
  { icon: '🎲', tag: 'PROBLEM 01', title: '경험 의존', body: '선장의 "감"에 의지하는 출조 판단. 데이터 기반 도구가 부재.', result: '출조 성공률 변동 ↑↑' },
  { icon: '🚧', tag: 'PROBLEM 02', title: '초보 진입장벽', body: '장비·채비·포인트·물때 — 알 게 산더미. "뭘 모르는지조차" 모름.', result: '빈손 출조 70% · 이탈' },
  { icon: '⚙️', tag: 'PROBLEM 03', title: '운영 비효율', body: '비수기 공실 + 예약 변동성 ↑. 선장과 손님이 서로 못 찾는 구조.', result: 'B2B 매출 기복 ↑' },
  { icon: '🔌', tag: 'PROBLEM 04', title: '유통 연결 부재', body: '잡은 수산물은 대부분 개인 소비로 끝. 판매·유통 채널과 단절.', result: '수익 기회 누락' },
]

export const PROBLEM_INSIGHT =
  '네 문제는 한 줄로 연결돼 있다 — 예측이 약하니까, 초보가 못 오고, 운영이 새고, 잡은 게 버려진다.'

// PERSONA — 강캡틴
export const CAPTAIN = {
  name: '강캡틴',
  role: '출조각 公式 AI 캐릭터 · CHULJOGAK MASCOT',
  profile: [
    { k: '나이', v: '50살' },
    { k: '경력', v: '선장 20년' },
    { k: '캐릭터', v: '무뚝뚝한 바다 사나이' },
    { k: '역할', v: '사용자 전속 안내자' },
  ],
  outfit: ['🧥 방수 잠바', '🧢 빨간 모자', '🎣 손에 어구'],
  voice: ['짧고 굵게 · 사투리 살짝', '확률 % 명시 · 빈말 금지', '진심 어린 조언 + 위트 살짝'],
  sample:
    '"월요일 새벽 출조각 분석. 갈치 65%, 갑오징어 87%, 돌돔 30%. 포인트: 제주 앞바다. 출항 04:00, 입항 13:00. 가시려면 일찍 주무시소."',
}

// SOLUTION — 3 PILLARS
export const PILLARS = [
  {
    no: '①', en: 'CORE ENGINE', title: 'AI 기반 선상낚시 최적화',
    body: '기상·수온·조류·풍속·월령·계절·과거 어획 데이터 종합 분석 → 출조 가능성·예상 어종·추천 포인트 제공.',
    output: '"오늘 갈 각이 나옴 vs 안 나옴" 확률 % 기반 의사결정',
    shift: '경험 의존 ⇒ 데이터 기반 전환', color: '#7fd8e8',
  },
  {
    no: '②', en: 'EXPERIENCE', title: '선상낚시 체험 서비스',
    body: 'AI 추천 시스템을 접목한 차별화된 선상낚시 체험. 초보도 만족하는 데이터 기반 레저.',
    output: '통합 예약 + 강캡틴 안내 · 단순 레저 → 큐레이션 체험',
    shift: '빈손 출조 ⇒ 만족 출조', color: '#f0b429',
  },
  {
    no: '③', en: 'COMMERCE', title: '온라인 수산물 판매',
    body: '체험으로 확보된 수산물을 선별·관리해 온라인 채널로 직거래. 산지 → 식탁 직결 구조.',
    output: '자동 시세 + 새벽 배송 · 레저 + 유통 = 동시 수익',
    shift: '개인 소비 ⇒ 유통 채널화', color: '#ff6b5e',
  },
]

export const LOOP = ['AI 예측', '체험에서 검증', '판매 데이터 회수', '예측 모델 재학습']
export const LOOP_NOTE = '데이터가 데이터를 키운다 · 한 바퀴 돌수록 정확도 ↑'

// AI ENGINE OUTPUT — 3
export const ENGINE_OUTPUTS = [
  { icon: '📈', tag: 'ANSWER 01', title: '출조 가능성', body: '"오늘 갈 만한가?" → 확률 %로 답' },
  { icon: '🐟', tag: 'ANSWER 02', title: '예상 어종', body: '갑오징어 87% / 갈치 65% / 돌돔 30%' },
  { icon: '📍', tag: 'ANSWER 03', title: '추천 포인트', body: '제주 앞바다 · 04:00 출항 · 수심 18m' },
]
export const ENGINE_MOAT =
  '일반 기상 API ≠ 출조각 — 과거 어획 데이터를 학습한 모델은 시간이 갈수록 다른 앱이 따라올 수 없다.'

// USER JOURNEY — 12 HOURS
export const JOURNEY = [
  {
    time: 'SUN 21:00', tag: 'PUSH', pillar: '① AI 최적화', icon: '📡',
    title: '월요일 출조각 분석',
    lines: ['갑오징어 87% · 갈치 65% · 돌돔 30%', '강캡틴: "내일 새벽 출조각 나옴. 일찍 주무시소."', '📍 군산 04:00 출항 예약'],
  },
  {
    time: 'MON 03:30', tag: 'CHAT', pillar: '② 체험', icon: '💬',
    title: '강캡틴에게 채비 묻기',
    lines: ['"갑오징어 채비 뭐 가져갈까요?"', '에기 3.0호 / 라인 0.8호 / 합사 1.5호 50m', '🛒 갑오징어 풀세트 39,800원 · 새벽 도착'],
  },
  {
    time: 'MON 13:20', tag: 'POST', pillar: '③ 온라인 판매', icon: '📷',
    title: '조과 인증 + 즉시 판매',
    lines: ['🦑 갑오징어 × 8마리 · CV 자동 인식 8.2kg', '💰 시세 자동 책정 kg당 35,000원', '출조각 마켓 즉시 등록 · 327♥'],
  },
]

// BUSINESS MODEL — 3 revenue
export const REVENUE = [
  {
    no: '①', en: 'EXPERIENCE', title: '체험 수익',
    items: ['선상낚시 승선료 (1회 약 10만원)', '개인 맞춤 가이드권 + 단체팩', '강캡틴 동승 프리미엄 코스'],
    fee: '수수료 8~12%', kind: '고정 매출원',
  },
  {
    no: '②', en: 'COMMERCE', title: '판매 수익',
    items: ['선별·관리 수산물 직거래 마진', '채비·장비 큐레이션 판매', '새벽 배송 정기 구독'],
    fee: '수수료 10~15%', kind: '고회전 매출원',
  },
  {
    no: '③', en: 'EXTRA', title: '추가 수익모델',
    items: ['출조각 패스 (월 9,900원 구독)', 'B2B 데이터 SaaS · 지자체 협업', '강캡틴 IP·콘텐츠·광고'],
    fee: '고마진', kind: '확장 매출원',
  },
]

export const UNIT_ECONOMICS = {
  basis: '월 활성 사용자 1만 명 기준 · 가상 시나리오',
  rows: [
    { k: '① 체험 수익', v: '₩2,400만', sub: '선상 예약 수수료 10%' },
    { k: '② 판매 수익', v: '₩1,800만', sub: '수산물·채비 마켓' },
    { k: '③ 구독 (Pass)', v: '₩990만', sub: '전환률 10% 가정' },
    { k: '④ B2B / 데이터', v: '₩500만+', sub: 'B2B 파트너 5사' },
  ],
  total: '₩5,700만',
  annual: '연 환산 ₩6.8억 +',
}

// COMPETITION
export const COMPETITION = {
  cols: ['기존 낚시 정보 앱', '선상 예약 플랫폼', '수산물 직거래 앱', '출조각 (OURS)'],
  rows: [
    { feat: 'AI 조과 예측 (확률 %)', cells: ['✕', '✕', '✕', '◎ 핵심 기능'] },
    { feat: '맞춤 채비 추천 (AI)', cells: ['△ 일반', '✕', '✕', '◎ 어종 × 채비셋'] },
    { feat: '선상 예약 + 패스', cells: ['△ 일부', '○ 기본', '✕', '○ 통합 예약'] },
    { feat: '잡은 후 즉시 판매', cells: ['✕', '✕', '○ 산지 매입', '◎ 직거래 + CV'] },
    { feat: 'AI 캐릭터 / 커뮤니티', cells: ['✕', '△ 게시판', '✕', '◎ 강캡틴+카메라'] },
  ],
  moats: [
    { tag: 'MOAT 01', body: '"본인이 낚시인"인 팀만이 엮은 큐레이션 데이터셋 — 학습 데이터 자체가 진입장벽.' },
    { tag: 'MOAT 02', body: '예측 → 예약 → 거래까지 한 앱 내 풀스택 루프 — 데이터가 데이터를 키운다.' },
  ],
}

// BRAND ECOSYSTEM — 7 services
export const ECOSYSTEM = [
  { icon: '📅', en: 'DAILY · CORE', title: '오늘의 출조각', desc: '매일 아침 푸시되는 "오늘 갈 각" AI 분석' },
  { icon: '🗓️', en: 'PLANNING', title: '출조각 캘린더', desc: '주간·월간 출조 추천, 일정 자동 등록' },
  { icon: '🤝', en: 'SOCIAL', title: '출조각 모임', desc: '같이 갈 동행 매칭, 단체 할인 + 안전망' },
  { icon: '🎓', en: 'EDUCATION', title: '출조각 학교', desc: '입문자 e-러닝, 안전·매듭·캐스팅 강좌' },
  { icon: '📷', en: 'SNS · CV', title: '출조각 카메라', desc: '조과 사진 자동 인식, SNS 인증 + 랭킹' },
  { icon: '🛒', en: 'COMMERCE', title: '출조각 마켓', desc: '잡은 후 바로 판매, 새벽 배송 / 자동 시세' },
  { icon: '🎫', en: 'MEMBERSHIP', title: '출조각 패스', desc: '선상 예약 통합권, 월 정기구독 + 우선예약' },
]
export const ECOSYSTEM_NEXT = { icon: '🌏', title: '출조각 GLOBAL', desc: '🇯🇵 일본(5조원 시장) · 🇺🇸 미국 RV·캠핑 결합' }

// ROADMAP — 4 phases
export const ROADMAP = [
  { phase: 'PHASE 01', span: 'M1–M3', title: '준비', items: ['국립해양조사원 API 연동', '선장 30명 인터뷰', 'UI/UX 와이어프레임', '강캡틴 캐릭터 IP 확정'] },
  { phase: 'PHASE 02', span: 'M4–M6', title: '통합 / MVP', items: ['예측 모델 v1 (어종 5종)', '제주 파일럿 (선장 10명)', '출조각 카메라 CV 모듈', '베타 유저 1,000명'] },
  { phase: 'PHASE 03', span: 'M7–M12', title: '상용 / 확장', items: ['전국 6대 항 거점 확장', '출조각 마켓 + 새벽 배송', '출조각 패스 멤버십', 'MAU 5만 + 매출 발생'] },
  { phase: 'PHASE 04', span: 'M12+', title: '글로벌', items: ['일본 후쿠오카 베타', '지자체 해양관광 협업', 'B2B 데이터 SaaS', '시리즈 A 펀딩'] },
]
export const ROADMAP_KPI = { kpi: 'MAU 50,000 · 거래액 ₩20억 · 선장 파트너 200사', fund: 'Seed ₩5억' }

// MARKET
export const MARKET = [
  { tag: 'TAM · 글로벌', big: '7조원+', label: '한 + 일 낚시 시장', sub: '한국 약 2조 · 일본 약 5조원' },
  { tag: 'SAM · 한국', big: '1,000만', label: '한국 낚시 인구', sub: '베이비부머 + MZ 캠핑 트렌드' },
  { tag: 'SOM · 1년 차', big: '50만', label: 'MAU 목표', sub: '월 1회+ 출조 인구의 5%' },
]
export const IMPACT = [
  { pillar: '① AI 최적화', head: '경험 의존이 데이터로 대체된다', items: ['출조 성공률 70% → 85%+', '초보자 진입 장벽 → 1/3로 축소'] },
  { pillar: '② 체험 서비스', head: '선장의 비수기 공실을 메운다', items: ['월 평균 출항일 +30%', '차별화된 데이터 기반 레저 체험'] },
  { pillar: '③ 온라인 판매', head: '개인 소비가 유통 채널이 된다', items: ['중간 유통 단계 최대 -50%', '산지 → 식탁 직결 신선도 ↑'] },
]
