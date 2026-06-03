// OceanLanding — 출조각 인터랙티브 바다 플랫폼 (PPT 전 내용 + 낚시 인터랙션).
// 스크롤하며 심해로 내려가는 depth-zone 구성. 강캡틴 봇은 App 의 우하단 독으로 분리됨.
import { useState } from 'react'
import OceanBackground from './OceanBackground'
import FishingGame from './FishingGame'
import { fishSVG } from './fishSvg'
import {
  SPECIES, diffStars, ENGINE_INPUTS, WIND_SCALE, WAVE_SCALE, TIDE_INFO,
} from './fishData'
import {
  BRAND, PROBLEMS, PROBLEM_INSIGHT, CAPTAIN, PILLARS, LOOP, LOOP_NOTE,
  ENGINE_OUTPUTS, ENGINE_MOAT, JOURNEY, REVENUE, UNIT_ECONOMICS, COMPETITION,
  ECOSYSTEM, ECOSYSTEM_NEXT, ROADMAP, ROADMAP_KPI, MARKET, IMPACT,
} from './pptData'
import styles from './OceanLanding.module.css'

function Section({ id, depth, kicker, title, sub, children, wide }) {
  return (
    <section id={id} className={styles.section}>
      <div className={`${styles.inner} ${wide ? styles.wide : ''}`}>
        <div className={styles.head}>
          {depth && <span className={styles.depth}>{depth}</span>}
          {kicker && <span className={styles.kicker}>{kicker}</span>}
          {title && <h2 className={styles.title} dangerouslySetInnerHTML={{ __html: title }} />}
          {sub && <p className={styles.sub}>{sub}</p>}
        </div>
        {children}
      </div>
    </section>
  )
}

export default function OceanLanding({ onOpenBot }) {
  const [fishingOpen, setFishingOpen] = useState(false)

  const openFishing = () => setFishingOpen(true)
  const brag = () => { setFishingOpen(false); onOpenBot?.() }

  return (
    <div className={styles.root}>
      <OceanBackground />

      {/* 상단 네비 */}
      <header className={styles.nav}>
        <a href="#hero" className={styles.brand}>🎣 출조각</a>
        <nav className={styles.navLinks}>
          <a href="#problem">문제</a>
          <a href="#solution">솔루션</a>
          <a href="#engine">AI엔진</a>
          <a href="#fishing">낚시</a>
          <a href="#bm">비즈니스</a>
          <a href="#roadmap">로드맵</a>
        </nav>
        <div className={styles.navBtns}>
          <button className={styles.navFish} onClick={openFishing}>🎣 낚시</button>
          <button className={styles.navBot} onClick={onOpenBot}>🧑‍✈️ 강캡틴</button>
        </div>
      </header>

      <main className={styles.scroll}>
        {/* ───── HERO ───── */}
        <section id="hero" className={`${styles.section} ${styles.hero}`}>
          <div className={styles.heroInner}>
            <span className={styles.heroBadge}>2026 · 팀 AI바다 · BUSINESS MODEL</span>
            <h1 className={styles.heroTitle}>
              <span className={styles.heroLogo}>출조<span className={styles.heroGak}>각</span></span>
            </h1>
            <p className={styles.heroSubtitle}>{BRAND.title}</p>
            <p className={styles.heroTagline}>“{BRAND.tagline}”<span>{BRAND.taglineSub}</span></p>
            <div className={styles.heroPills}>
              <span>① AI 선상낚시 최적화</span>
              <span>② 선상낚시 체험</span>
              <span>③ 온라인 수산물 판매</span>
            </div>
            <div className={styles.heroCtas}>
              <button className={styles.ctaPrimary} onClick={openFishing}>🎣 낚시 시작하기</button>
              <button className={styles.ctaGhost} onClick={onOpenBot}>🧑‍✈️ 강캡틴에게 묻기</button>
            </div>
          </div>
          <a href="#problem" className={styles.scrollHint}>아래로 잠수 ↓</a>
        </section>

        {/* ───── PROBLEM ───── */}
        <Section id="problem" depth="-5m" kicker="01 · PROBLEM"
          title="선상낚시는 <em>‘경험과 운’</em>에<br/>너무 많이 기대고 있다."
          sub="기상·조류·수온·계절에 휘둘리는 산업 — 초보는 못 오고, 운영은 비효율, 잡은 수산물은 유통 연결조차 없다.">
          <div className={styles.grid4}>
            {PROBLEMS.map((p) => (
              <div key={p.tag} className={styles.card}>
                <div className={styles.cardIcon}>{p.icon}</div>
                <div className={styles.cardTag}>{p.tag}</div>
                <h3 className={styles.cardTitle}>{p.title}</h3>
                <p className={styles.cardBody}>{p.body}</p>
                <div className={styles.cardResult}>결과 · {p.result}</div>
              </div>
            ))}
          </div>
          <div className={styles.insight}>💡 {PROBLEM_INSIGHT}</div>
        </Section>

        {/* ───── PERSONA ───── */}
        <Section id="persona" depth="-10m" kicker="02 · AI PERSONA"
          title="앱이 아니라, <em>사람</em>이 말한다."
          sub="출조각의 AI는 챗봇이 아니다 — 20년 선장 ‘강캡틴’ 캐릭터로 사용자에게 말을 건다.">
          <div className={styles.persona}>
            <div className={styles.personaPortrait}>
              <div className={styles.captainFace}>
                <div className={styles.capHat} />
                <div className={styles.capHead} />
                <div className={styles.capEyes}><span /><span /></div>
                <div className={styles.capBeard} />
              </div>
              <div className={styles.personaName}>CAPT. {CAPTAIN.name}</div>
              <div className={styles.personaRole}>{CAPTAIN.role}</div>
              <div className={styles.outfit}>{CAPTAIN.outfit.map((o) => <span key={o}>{o}</span>)}</div>
            </div>
            <div className={styles.personaInfo}>
              <div className={styles.profileGrid}>
                {CAPTAIN.profile.map((p) => (
                  <div key={p.k} className={styles.profileItem}><span>{p.k}</span><b>{p.v}</b></div>
                ))}
              </div>
              <div className={styles.voiceBox}>
                <div className={styles.voiceLabel}>VOICE · 말투</div>
                {CAPTAIN.voice.map((v) => <div key={v} className={styles.voiceLine}>“ {v}</div>)}
              </div>
              <div className={styles.sampleBox}>💬 {CAPTAIN.sample}</div>
              <button className={styles.ctaPrimary} onClick={onOpenBot}>🧑‍✈️ 강캡틴과 대화하기</button>
            </div>
          </div>
        </Section>

        {/* ───── SOLUTION ───── */}
        <Section id="solution" depth="-15m" kicker="03 · SOLUTION · 3 PILLARS" wide
          title="낚시 앱이 아니라, <em>수산 레저·유통 플랫폼.</em>"
          sub="세 개의 축이 하나의 데이터 루프로 묶인다 — AI 최적화 → 체험 → 유통.">
          <div className={styles.grid3}>
            {PILLARS.map((p) => (
              <div key={p.no} className={styles.pillar} style={{ '--accent': p.color }}>
                <div className={styles.pillarNo}>{p.no}</div>
                <div className={styles.pillarEn}>{p.en}</div>
                <h3 className={styles.pillarTitle}>{p.title}</h3>
                <p className={styles.cardBody}>{p.body}</p>
                <div className={styles.pillarOut}>{p.output}</div>
                <div className={styles.pillarShift}>{p.shift}</div>
              </div>
            ))}
          </div>
          <div className={styles.loop}>
            <span className={styles.loopTitle}>THE LOOP</span>
            {LOOP.map((l, i) => (
              <span key={l} className={styles.loopStep}>{l}{i < LOOP.length - 1 && <i>→</i>}</span>
            ))}
            <span className={styles.loopReset}>↺</span>
          </div>
          <p className={styles.loopNote}>{LOOP_NOTE}</p>
        </Section>

        {/* ───── AI ENGINE ───── */}
        <Section id="engine" depth="-25m" kicker="04 · AI ENGINE · INPUT → OUTPUT" wide
          title="7개의 데이터, <em>3개의 답.</em>"
          sub="복잡한 해양·기상 변수를 종합 분석해 의사결정에 바로 쓰는 3가지 답으로 압축한다.">
          <div className={styles.engine}>
            <div className={styles.engineInputs}>
              <div className={styles.engineLabel}>INPUT · 7가지 데이터</div>
              {ENGINE_INPUTS.map((i) => (
                <div key={i.label} className={styles.inputChip}>
                  <span className={styles.inputIcon}>{i.icon}</span>
                  <div><b>{i.label}</b><small>{i.sub}</small></div>
                </div>
              ))}
            </div>
            <div className={styles.engineCore}>
              <div className={styles.coreBox}>
                <span className={styles.coreSpin} />
                <b>AI</b>
                <small>ML MODEL</small>
              </div>
              <div className={styles.coreArrow}>▶</div>
            </div>
            <div className={styles.engineOutputs}>
              <div className={styles.engineLabel}>OUTPUT · 3가지 답</div>
              {ENGINE_OUTPUTS.map((o) => (
                <div key={o.tag} className={styles.outCard}>
                  <span className={styles.outIcon}>{o.icon}</span>
                  <div className={styles.outTag}>{o.tag}</div>
                  <b>{o.title}</b>
                  <small>{o.body}</small>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.moat}>🛡️ MOAT · {ENGINE_MOAT}</div>

          {/* 출조 조건 레퍼런스 */}
          <div className={styles.conditions}>
            <div className={styles.condCard}>
              <h4>💨 풍속 기준</h4>
              {WIND_SCALE.map((w) => (
                <div key={w.range} className={styles.condRow}><span className={styles['lv' + w.level]} />{w.range}<b>{w.label}</b></div>
              ))}
            </div>
            <div className={styles.condCard}>
              <h4>🌊 파고 기준</h4>
              {WAVE_SCALE.map((w) => (
                <div key={w.range} className={styles.condRow}><span className={styles['lv' + w.level]} />{w.range}<b>{w.label}</b></div>
              ))}
            </div>
            <div className={styles.condCard}>
              <h4>🌙 물때 정보</h4>
              {TIDE_INFO.map((t) => (
                <div key={t.name} className={styles.tideRow}><b>{t.name}</b><small>{t.desc}</small></div>
              ))}
            </div>
          </div>
        </Section>

        {/* ───── USER JOURNEY ───── */}
        <Section id="journey" depth="-30m" kicker="05 · USER JOURNEY · 12 HOURS" wide
          title="① AI 예측 → ② 체험 출조 → ③ 즉시 판매."
          sub="12시간 안에 한 사이클이 돈다.">
          <div className={styles.journey}>
            {JOURNEY.map((j, i) => (
              <div key={j.time} className={styles.journeyStep}>
                <div className={styles.journeyTime}>{j.icon} {j.time} · {j.tag}</div>
                <div className={styles.journeyPillar}>{j.pillar}</div>
                <h3 className={styles.journeyTitle}>{j.title}</h3>
                {j.lines.map((l) => <p key={l} className={styles.journeyLine}>{l}</p>)}
                {i < JOURNEY.length - 1 && <span className={styles.journeyArrow}>↓</span>}
              </div>
            ))}
          </div>
        </Section>

        {/* ───── FISHING / 도감 ───── */}
        <Section id="fishing" depth="-35m" kicker="🎣 직접 해보기" wide
          title="바다에 줄을 던져, <em>한 마리 낚아보세요.</em>"
          sub="캐스팅 → 입질 → 챔질 → 조과가 출조각 마켓에 자동 등록됩니다. 잡을 수 있는 제주 대표 어종 도감.">
          <div className={styles.fishingCta}>
            <button className={styles.bigCast} onClick={openFishing}>🎣 낚시하기</button>
            <span>제철 어종일수록 입질이 잘 와요</span>
          </div>
          <div className={styles.dex}>
            {SPECIES.map((f) => (
              <div key={f.id} className={styles.dexCard} title={f.note}>
                <span className={styles.dexArt} dangerouslySetInnerHTML={{ __html: fishSVG(f, 'dex') }} />
                <div className={styles.dexName}>{f.name}</div>
                <div className={styles.dexDiff}>{diffStars(f.diff)}</div>
                <div className={styles.dexMeta}>{f.taste} · {f.size}</div>
                <div className={styles.dexSeasons}>{f.seasons.map((s) => <span key={s}>{s}</span>)}</div>
                <div className={styles.dexPrice}>{f.priceLabel}</div>
              </div>
            ))}
          </div>
        </Section>

        {/* ───── BUSINESS MODEL ───── */}
        <Section id="bm" depth="-40m" kicker="06 · BUSINESS MODEL" wide
          title="체험 + 판매 + 확장 — <em>동시 수익 구조.</em>"
          sub="체험 수익과 판매 수익이 한 사이클에서 동시에 발생 — 거기에 데이터 자산이 추가 수익을 얹는다.">
          <div className={styles.grid3}>
            {REVENUE.map((r) => (
              <div key={r.no} className={styles.revCard}>
                <div className={styles.pillarNo}>{r.no}</div>
                <div className={styles.pillarEn}>{r.en}</div>
                <h3 className={styles.pillarTitle}>{r.title}</h3>
                <ul className={styles.revList}>{r.items.map((it) => <li key={it}>{it}</li>)}</ul>
                <div className={styles.revFee}><b>{r.fee}</b><span>{r.kind}</span></div>
              </div>
            ))}
          </div>
          <div className={styles.economics}>
            <div className={styles.ecoHead}>UNIT ECONOMICS · {UNIT_ECONOMICS.basis}</div>
            <div className={styles.ecoRows}>
              {UNIT_ECONOMICS.rows.map((r) => (
                <div key={r.k} className={styles.ecoItem}><span>{r.k}</span><b>{r.v}</b><small>{r.sub}</small></div>
              ))}
            </div>
            <div className={styles.ecoTotal}>
              <span>월 추정 매출 합계</span>
              <b>{UNIT_ECONOMICS.total}</b>
              <em>{UNIT_ECONOMICS.annual}</em>
            </div>
          </div>
        </Section>

        {/* ───── COMPETITION ───── */}
        <Section id="moat" depth="-45m" kicker="07 · COMPETITION & MOAT" wide
          title="기존 앱은 <em>‘검색’</em>, 출조각은 <em>‘예측’</em>한다."
          sub="">
          <div className={styles.tableWrap}>
            <table className={styles.compTable}>
              <thead>
                <tr><th>비교 항목</th>{COMPETITION.cols.map((c, i) => (
                  <th key={c} className={i === COMPETITION.cols.length - 1 ? styles.ours : ''}>{c}</th>
                ))}</tr>
              </thead>
              <tbody>
                {COMPETITION.rows.map((r) => (
                  <tr key={r.feat}>
                    <td className={styles.feat}>{r.feat}</td>
                    {r.cells.map((c, i) => (
                      <td key={i} className={i === r.cells.length - 1 ? styles.ours : ''}>{c}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className={styles.grid2}>
            {COMPETITION.moats.map((m) => (
              <div key={m.tag} className={styles.moatCard}>
                <div className={styles.cardTag}>{m.tag}</div>
                <p className={styles.cardBody}>{m.body}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* ───── BRAND ECOSYSTEM ───── */}
        <Section id="brand" depth="-50m" kicker="08 · BRAND ECOSYSTEM" wide
          title="하나의 브랜드, <em>7개의 출조각.</em>"
          sub="한 단어 ‘출조각’이 곧 카테고리가 된다 — 시리즈로 확장되는 브랜드 자산.">
          <div className={styles.eco}>
            {ECOSYSTEM.map((e) => (
              <div key={e.title} className={styles.ecoCard}>
                <span className={styles.ecoIcon}>{e.icon}</span>
                <div className={styles.ecoEn}>{e.en}</div>
                <b>{e.title}</b>
                <small>{e.desc}</small>
              </div>
            ))}
            <div className={`${styles.ecoCard} ${styles.ecoNext}`}>
              <span className={styles.ecoIcon}>{ECOSYSTEM_NEXT.icon}</span>
              <div className={styles.ecoEn}>NEXT STEP</div>
              <b>{ECOSYSTEM_NEXT.title}</b>
              <small>{ECOSYSTEM_NEXT.desc}</small>
            </div>
          </div>
        </Section>

        {/* ───── ROADMAP ───── */}
        <Section id="roadmap" depth="-55m" kicker="09 · EXECUTION ROADMAP" wide
          title="MVP는 <em>12주 안</em>에 띄운다."
          sub="“예측 + 예약 + 인증” MVP를 먼저 검증, 마켓·B2B는 데이터가 쌓인 뒤 확장.">
          <div className={styles.roadmap}>
            {ROADMAP.map((p, i) => (
              <div key={p.phase} className={styles.phase}>
                <div className={styles.phaseNum}>{i + 1}</div>
                <div className={styles.phaseTag}>{p.phase} · {p.span}</div>
                <h3 className={styles.phaseTitle}>{p.title}</h3>
                <ul className={styles.phaseList}>{p.items.map((it) => <li key={it}>{it}</li>)}</ul>
              </div>
            ))}
          </div>
          <div className={styles.kpiBar}>
            <span>🎯 YEAR 1 KPI · <b>{ROADMAP_KPI.kpi}</b></span>
            <span>💰 INITIAL FUND · <b>{ROADMAP_KPI.fund}</b></span>
          </div>
        </Section>

        {/* ───── MARKET & IMPACT ───── */}
        <Section id="market" depth="-60m · 심해" kicker="10 · MARKET & IMPACT" wide
          title="레저 + 유통 = <em>새로운 생태계.</em>"
          sub="낚시 시장을 넘어 해양 레저·수산 유통 데이터 인프라로 확장된다.">
          <div className={styles.grid3}>
            {MARKET.map((m) => (
              <div key={m.tag} className={styles.marketCard}>
                <div className={styles.marketKtag}>{m.tag}</div>
                <div className={styles.marketBig}>{m.big}</div>
                <b>{m.label}</b>
                <small>{m.sub}</small>
              </div>
            ))}
          </div>
          <div className={styles.grid3}>
            {IMPACT.map((im) => (
              <div key={im.pillar} className={styles.impactCard}>
                <div className={styles.impactPillar}>{im.pillar}</div>
                <h4>{im.head}</h4>
                <ul>{im.items.map((it) => <li key={it}>{it}</li>)}</ul>
              </div>
            ))}
          </div>
        </Section>

        {/* ───── CLOSING ───── */}
        <section id="closing" className={`${styles.section} ${styles.closing}`}>
          <div className={styles.closingInner}>
            <span className={styles.kicker}>CLOSING · 출조각</span>
            <h2 className={styles.closingPitch}>바다는 운이 아니라,<br /><em>데이터로 읽는다.</em></h2>
            <p className={styles.closingCapt}>🧑‍✈️ CAPT. 강캡틴 — “오늘, 출조각 나옴.”</p>
            <div className={styles.closingFormula}>AI 최적화 <i>+</i> 선상낚시 체험 <i>+</i> 온라인 수산물 판매</div>
            <p className={styles.closingTail}>한 사이클로, 한 손 안에, 한 브랜드 아래.</p>
            <div className={styles.heroCtas}>
              <button className={styles.ctaPrimary} onClick={openFishing}>🎣 낚시 시작하기</button>
              <button className={styles.ctaGhost} onClick={onOpenBot}>🧑‍✈️ 강캡틴에게 묻기</button>
            </div>
            <div className={styles.team}>
              TEAM {BRAND.team} · {BRAND.dept} · {BRAND.author}
            </div>
          </div>
        </section>
      </main>

      {/* 플로팅 낚시 버튼 (좌하단) */}
      <button className={styles.floatFish} onClick={openFishing} aria-label="낚시하기">
        🎣<span>낚시하기</span>
      </button>

      <FishingGame open={fishingOpen} onClose={() => setFishingOpen(false)} onBrag={brag} />
    </div>
  )
}
