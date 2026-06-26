import { useState } from 'react'
import { DAYS, WORKOUTS, BIG4_KEYS, BIG4_LABELS, calcWeight } from './data.js'
import s from './App.module.css'

/* ─── 1RM 입력 패널 ─── */
function RMPanel({ rm, setRm }) {
  const [open, setOpen] = useState(false)

  return (
    <div className={s.rmWrap}>
      <button className={s.rmToggle} onClick={() => setOpen(v => !v)}>
        <span className={s.rmToggleLabel}>1RM 중량 입력</span>
        <span className={[s.rmToggleIcon, open ? s.rmOpen : ''].filter(Boolean).join(' ')}>▾</span>
      </button>

      {open && (
        <div className={s.rmPanel}>
          <p className={s.rmDesc}>
            4대 운동의 1RM(1회 최대 중량)을 입력하면<br />
            RIR 2~3 기준 추천 중량을 자동으로 계산합니다.
          </p>
          <div className={s.rmInputGrid}>
            {BIG4_KEYS.map(key => (
              <div key={key} className={s.rmInputRow}>
                <label className={s.rmInputLabel}>{BIG4_LABELS[key]}</label>
                <div className={s.rmInputRight}>
                  <input
                    className={s.rmInput}
                    type="number"
                    inputMode="numeric"
                    placeholder="0"
                    value={rm[key] || ''}
                    onChange={e => {
                      const val = parseFloat(e.target.value)
                      setRm(prev => ({ ...prev, [key]: isNaN(val) ? 0 : val }))
                    }}
                  />
                  <span className={s.rmUnit}>kg</span>
                </div>
              </div>
            ))}
          </div>
          <p className={s.rmNote}>Epley 공식 기반 · RIR 2~3 적용</p>
        </div>
      )}
    </div>
  )
}

/* ─── 추천 중량 뱃지 ─── */
function WeightBadges({ rmKey, rmReps, rm }) {
  if (!rmKey || !rm[rmKey] || rm[rmKey] <= 0) return null

  return (
    <div className={s.weightBlock}>
      <p className={s.weightTitle}>추천 중량 (RIR 2~3)</p>
      <div className={s.weightRow}>
        {rmReps.map(r => {
          const w = calcWeight(rm[rmKey], r)
          return (
            <div key={r} className={s.weightItem}>
              <span className={s.weightRep}>{r}회</span>
              <span className={s.weightKg}>{w ? `${w}kg` : '—'}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

/* ─── 종목 카드 ─── */
function ExCard({ ex, index, rm }) {
  const [tipOpen, setTipOpen] = useState(false)

  return (
    <div className={s.card}>
      <div className={s.cardHead}>
        <span className={s.cardNum}>{String(index + 1).padStart(2, '0')}</span>
        <div className={s.cardTitleWrap}>
          <div className={s.cardTitleRow}>
            <span className={s.cardName}>{ex.name}</span>
            {ex.badge && <span className={s.cardBadge}>{ex.badge}</span>}
          </div>
          <span className={s.cardEng}>{ex.eng}</span>
        </div>
      </div>

      <div className={s.specRow}>
        <div className={s.spec}>
          <span className={s.specLabel}>세트</span>
          <span className={s.specVal}>{ex.sets}세트</span>
        </div>
        <div className={s.specDiv} />
        <div className={s.spec}>
          <span className={s.specLabel}>횟수</span>
          <span className={s.specVal}>{ex.reps}</span>
        </div>
        <div className={s.specDiv} />
        <div className={s.spec}>
          <span className={s.specLabel}>휴식</span>
          <span className={s.specVal}>{ex.rest}</span>
        </div>
        <div className={s.specDiv} />
        <div className={s.spec}>
          <span className={s.specLabel}>RIR</span>
          <span className={[s.specVal, ex.rir !== '—' ? s.specRir : ''].filter(Boolean).join(' ')}>
            {ex.rir}
          </span>
        </div>
      </div>

      <WeightBadges rmKey={ex.rmKey} rmReps={ex.rmReps} rm={rm} />

      <button className={s.tipBtn} onClick={() => setTipOpen(v => !v)}>
        <span>자세 팁</span>
        <span className={[s.tipIcon, tipOpen ? s.tipOpen : ''].filter(Boolean).join(' ')}>▾</span>
      </button>
      {tipOpen && <p className={s.tipText}>{ex.tip}</p>}
    </div>
  )
}

/* ─── 메인 앱 ─── */
export default function App() {
  const [selected, setSelected] = useState(0)
  const [rm, setRm] = useState({ bench: 0, squat: 0, deadlift: 0, ohp: 0 })

  const workout = WORKOUTS[selected]

  return (
    <div className={s.root}>

      {/* 헤더 */}
      <header className={s.header}>
        <p className={s.eyebrow}>8-Week Strength Program</p>
        <h1 className={s.title}>TLS 8주<br />성공 프로젝트</h1>
        <p className={s.headerDesc}>주 4일 · 근육량 증가 · 체지방 감소 · 4대 운동 강화</p>
        <div className={s.rirChip}>
          <span className={s.rirDot} />
          <span className={s.rirChipText}>RIR 2~3 — 세트 종료 시 2~3회 더 할 수 있는 여유를 남깁니다</span>
        </div>
      </header>

      {/* 1RM 입력 */}
      <RMPanel rm={rm} setRm={setRm} />

      {/* 요일 탭 */}
      <nav className={s.nav}>
        {DAYS.map((d, i) => (
          <button
            key={i}
            className={[
              s.tab,
              d.isRest    ? s.tabRest   : '',
              selected === i ? s.tabActive : '',
            ].filter(Boolean).join(' ')}
            onClick={() => !d.isRest && setSelected(i)}
            disabled={d.isRest}
            aria-label={`${d.ko}요일 — ${d.tag}`}
          >
            <span className={s.tabShort}>{d.short}</span>
            <span className={s.tabKo}>{d.ko}</span>
          </button>
        ))}
      </nav>

      {/* 날짜 메타 */}
      <div className={s.dayMeta}>
        <span className={s.dayTag}>{DAYS[selected].tag}</span>
        {workout && <span className={s.dayDuration}>{workout.duration}</span>}
      </div>

      {/* 본문 */}
      <main className={s.main}>
        {workout ? (
          <>
            <div className={s.wkHeader}>
              <div className={s.wkTitleRow}>
                <div>
                  <p className={s.wkSub}>{workout.subtitle}</p>
                  <h2 className={s.wkTitle}>{workout.title}</h2>
                </div>
                <span className={s.wkFocus}>{workout.focus}</span>
              </div>
              <p className={s.wkRationale}>{workout.rationale}</p>
            </div>

            <div className={s.list}>
              {workout.list.map((ex, i) => (
                <ExCard key={ex.id} ex={ex} index={i} rm={rm} />
              ))}
            </div>

            <div className={s.note}>
              <p className={s.noteItem}>· 워밍업 세트는 별도로 진행하세요 (본세트의 50%, 70% 순으로 2세트)</p>
              <p className={s.noteItem}>· RIR 2~3은 마지막 세트도 폼이 무너지지 않는 수준을 의미합니다</p>
              <p className={s.noteItem}>· 상체 A·B, 하체 A·B를 매주 교차하며 자극 각도를 다양화합니다</p>
              <p className={s.noteItem}>· 8주 차에 가까워질수록 점진적 과부하를 적용하세요</p>
            </div>
          </>
        ) : (
          <div className={s.restView}>
            <div className={s.restLine} />
            <p className={s.restTitle}>오늘은 아무것도 하지 않는 것이 훈련입니다.</p>
            <p className={s.restBody}>
              근육은 운동 중이 아니라 쉬는 동안 자랍니다.<br />
              가벼운 유산소나 스트레칭 정도면 충분합니다.
            </p>
          </div>
        )}
      </main>

      <footer className={s.footer}>
        <span>TLS 8주 성공 프로젝트 · 주 4일 · 60분</span>
      </footer>

    </div>
  )
}
