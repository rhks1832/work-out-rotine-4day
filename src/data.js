/**
 * TLS 8주 성공 프로젝트 — 주 4일 프로그램
 *
 * 설계 기준:
 *  - 주 4일 / 1일 60분 (워밍업 10분 포함, 본세트 기준 표기)
 *  - Upper / Lower 분할 (월·목 상체 / 화·금 하체)
 *  - RIR 2~3 : 세트 종료 시 2~3회 더 할 수 있는 여유를 남김
 *  - 쉬는 시간 2~4분 (복합 운동 3~4분, 고립 운동 2~3분)
 *  - 4대 운동 (벤치프레스, 스쿼트, 데드리프트, 오버헤드 프레스) 포함
 *  - 월·목 상체 A/B로 구성해 자극 각도를 다양화
 *  - 화·금 하체 A/B로 구성해 전면·후면을 균형 있게 배분
 *  - 1RM 입력 시 3·6·10회 추천 중량 자동 계산 (Epley 공식, RIR 2~3 보정)
 */

// Epley 공식 역산 + RIR 2~3 보정 (0.92) + 2.5kg 단위 반올림
export function calcWeight(oneRM, reps) {
  if (!oneRM || oneRM <= 0) return null
  const nRM = oneRM / (1 + reps / 30)
  return Math.round((nRM * 0.92) / 2.5) * 2.5
}

export const DAYS = [
  { short: 'MON', ko: '월', tag: '상체 A',  isRest: false },
  { short: 'TUE', ko: '화', tag: '하체 A',  isRest: false },
  { short: 'WED', ko: '수', tag: '휴식',     isRest: true  },
  { short: 'THU', ko: '목', tag: '상체 B',  isRest: false },
  { short: 'FRI', ko: '금', tag: '하체 B',  isRest: false },
  { short: 'SAT', ko: '토', tag: '휴식',     isRest: true  },
  { short: 'SUN', ko: '일', tag: '휴식',     isRest: true  },
]

export const WORKOUTS = {
  /* ─── 월요일: 상체 A — 가슴 중심 ─── */
  0: {
    title: '상체 A',
    subtitle: 'Upper Body — Chest Focus',
    duration: '60분',
    focus: 'Push',
    rationale:
      '주간 첫 운동은 벤치프레스로 시작합니다. 가슴을 주동근으로 쓰면서 어깨·삼두까지 연결되는 복합 패턴으로 주간 강도의 기반을 만듭니다.',
    list: [
      {
        id: 'bench',
        name: '바벨 벤치프레스',
        eng: 'Barbell Bench Press',
        badge: '4대 운동',
        sets: 4,
        reps: '4~6회',
        rest: '3~4분',
        rir: 'RIR 2~3',
        rmKey: 'bench',
        rmReps: [3, 6, 10],
        tip: '어깨뼈를 모아 내리고 바가 명치 하단에 닿도록 내립니다. 발은 바닥에 단단히 고정합니다.',
      },
      {
        id: 'incline_db',
        name: '인클라인 덤벨 프레스',
        eng: 'Incline Dumbbell Press',
        badge: null,
        sets: 3,
        reps: '8~10회',
        rest: '2~3분',
        rir: 'RIR 2~3',
        rmKey: null,
        tip: '30~45도 각도. 가슴 상부를 집중 자극합니다. 팔꿈치가 어깨보다 너무 벌어지지 않도록 합니다.',
      },
      {
        id: 'cable_fly',
        name: '케이블 체스트 플라이',
        eng: 'Cable Chest Fly',
        badge: null,
        sets: 3,
        reps: '12~15회',
        rest: '2분',
        rir: 'RIR 2~3',
        rmKey: null,
        tip: '가슴 바깥에서 안쪽으로 호를 그립니다. 팔꿈치는 살짝 굽힌 채 고정합니다.',
      },
      {
        id: 'lat_pulldown',
        name: '랫 풀다운',
        eng: 'Lat Pulldown',
        badge: null,
        sets: 3,
        reps: '8~10회',
        rest: '2~3분',
        rir: 'RIR 2~3',
        rmKey: null,
        tip: '넓은 그립. 바를 쇄골 앞으로 당기며 어깨를 아래로 내리는 감각을 유지합니다.',
      },
      {
        id: 'tricep_pd',
        name: '케이블 트라이셉 푸시다운',
        eng: 'Cable Tricep Pushdown',
        badge: null,
        sets: 3,
        reps: '12~15회',
        rest: '2분',
        rir: 'RIR 2~3',
        rmKey: null,
        tip: '팔꿈치를 몸통 옆에 고정합니다. 손목이 꺾이지 않도록 일자를 유지합니다.',
      },
    ],
  },

  /* ─── 화요일: 하체 A — 스쿼트 중심 ─── */
  1: {
    title: '하체 A',
    subtitle: 'Lower Body — Squat Focus',
    duration: '60분',
    focus: 'Squat',
    rationale:
      '바벨 백 스쿼트로 하체 전면을 강도 높게 훈련합니다. 레그 프레스와 런지로 볼륨을 추가하고, 레그 컬로 햄스트링까지 균형 있게 마무리합니다.',
    list: [
      {
        id: 'squat',
        name: '바벨 백 스쿼트',
        eng: 'Barbell Back Squat',
        badge: '4대 운동',
        sets: 4,
        reps: '4~6회',
        rest: '3~4분',
        rir: 'RIR 2~3',
        rmKey: 'squat',
        rmReps: [3, 6, 10],
        tip: '발은 어깨너비, 발끝은 30도 외회전. 무릎이 발끝 방향을 따르도록 유지합니다. 허벅지가 바닥과 평행 이하까지 내려갑니다.',
      },
      {
        id: 'leg_press',
        name: '레그 프레스',
        eng: 'Leg Press',
        badge: null,
        sets: 3,
        reps: '10~12회',
        rest: '2~3분',
        rir: 'RIR 2~3',
        rmKey: null,
        tip: '발을 플랫폼 위쪽에 놓을수록 햄스트링, 아래에 놓을수록 대퇴사두 자극이 증가합니다.',
      },
      {
        id: 'walking_lunge',
        name: '덤벨 워킹 런지',
        eng: 'Dumbbell Walking Lunge',
        badge: null,
        sets: 3,
        reps: '10회 / 다리',
        rest: '2분',
        rir: 'RIR 2~3',
        rmKey: null,
        tip: '앞 무릎이 발끝을 넘지 않도록 합니다. 상체를 곧게 세운 채로 보폭을 크게 유지합니다.',
      },
      {
        id: 'leg_curl_a',
        name: '레그 컬 (머신)',
        eng: 'Lying Leg Curl',
        badge: null,
        sets: 3,
        reps: '12~15회',
        rest: '2분',
        rir: 'RIR 2~3',
        rmKey: null,
        tip: '발목을 구부린 상태로 당깁니다. 허벅지 뒤쪽이 완전히 수축하는 지점에서 1초 유지합니다.',
      },
      {
        id: 'calf_raise_a',
        name: '스탠딩 카프 레이즈',
        eng: 'Standing Calf Raise',
        badge: null,
        sets: 4,
        reps: '15~20회',
        rest: '90초',
        rir: 'RIR 2~3',
        rmKey: null,
        tip: '발뒤꿈치를 최대한 높이 들고 정점에서 1초 수축합니다. 천천히 내리는 것이 핵심입니다.',
      },
    ],
  },

  /* ─── 수요일: 휴식 ─── */
  2: null,

  /* ─── 목요일: 상체 B — 등·어깨 중심 ─── */
  3: {
    title: '상체 B',
    subtitle: 'Upper Body — Back & Shoulder Focus',
    duration: '60분',
    focus: 'Pull + OHP',
    rationale:
      '오버헤드 프레스와 데드리프트 변형 동작으로 등과 어깨를 집중 훈련합니다. 월요일 가슴·삼두와 대칭을 이루어 상체 밸런스를 완성합니다.',
    list: [
      {
        id: 'ohp',
        name: '바벨 오버헤드 프레스',
        eng: 'Barbell Overhead Press',
        badge: '4대 운동',
        sets: 4,
        reps: '4~6회',
        rest: '3~4분',
        rir: 'RIR 2~3',
        rmKey: 'ohp',
        rmReps: [3, 6, 10],
        tip: '그립은 어깨너비보다 약간 넓게. 바가 턱 앞을 지나도록 머리를 살짝 뒤로 뺍니다. 코어를 단단히 잠근 채로 밀어올립니다.',
      },
      {
        id: 'barbell_row',
        name: '바벨 벤트오버 로우',
        eng: 'Barbell Bent-Over Row',
        badge: null,
        sets: 4,
        reps: '6~8회',
        rest: '3분',
        rir: 'RIR 2~3',
        rmKey: null,
        tip: '상체를 45도로 숙이고 등을 곧게 편 채로 바를 배꼽 쪽으로 당깁니다. 등 전체를 강하게 자극하는 핵심 동작입니다.',
      },
      {
        id: 'cable_row',
        name: '시티드 케이블 로우',
        eng: 'Seated Cable Row',
        badge: null,
        sets: 3,
        reps: '10~12회',
        rest: '2~3분',
        rir: 'RIR 2~3',
        rmKey: null,
        tip: '상체를 10도 이상 뒤로 젖히지 않습니다. 등 중앙을 쥐어짜는 느낌으로 당깁니다.',
      },
      {
        id: 'lat_raise',
        name: '덤벨 래터럴 레이즈',
        eng: 'Dumbbell Lateral Raise',
        badge: null,
        sets: 3,
        reps: '12~15회',
        rest: '2분',
        rir: 'RIR 2~3',
        rmKey: null,
        tip: '팔꿈치를 살짝 굽힌 채 어깨 높이까지만 올립니다. 반동 없이 천천히 내립니다.',
      },
      {
        id: 'face_pull',
        name: '케이블 페이스 풀',
        eng: 'Cable Face Pull',
        badge: null,
        sets: 3,
        reps: '15회',
        rest: '2분',
        rir: 'RIR 2~3',
        rmKey: null,
        tip: '로프를 귀 옆 높이로 당깁니다. 외회전 동작이 핵심으로, 어깨 건강 유지에 필수 종목입니다.',
      },
      {
        id: 'db_curl',
        name: '덤벨 바이셉 컬',
        eng: 'Dumbbell Bicep Curl',
        badge: null,
        sets: 3,
        reps: '10~12회',
        rest: '2분',
        rir: 'RIR 2~3',
        rmKey: null,
        tip: '팔꿈치를 몸통 옆에 고정합니다. 소지 쪽을 위로 돌리는 회외(supination)를 의식합니다.',
      },
    ],
  },

  /* ─── 금요일: 하체 B — 데드리프트 중심 ─── */
  4: {
    title: '하체 B',
    subtitle: 'Lower Body — Deadlift Focus',
    duration: '60분',
    focus: 'Hinge',
    rationale:
      '데드리프트로 허벅지 뒤쪽·엉덩이·척추기립근을 동시에 훈련합니다. 힙 쓰러스트와 루마니안 데드리프트로 엉덩이와 햄스트링을 추가 보강합니다.',
    list: [
      {
        id: 'deadlift',
        name: '바벨 데드리프트',
        eng: 'Barbell Deadlift',
        badge: '4대 운동',
        sets: 4,
        reps: '3~5회',
        rest: '3~4분',
        rir: 'RIR 2~3',
        rmKey: 'deadlift',
        rmReps: [3, 6, 10],
        tip: '바를 정강이에 붙여 시작합니다. 엉덩이를 뒤로 밀며 등을 곧게 편 채로 들어올립니다. 허리 굽힘 절대 금지.',
      },
      {
        id: 'hip_thrust',
        name: '바벨 힙 쓰러스트',
        eng: 'Barbell Hip Thrust',
        badge: null,
        sets: 3,
        reps: '8~10회',
        rest: '2~3분',
        rir: 'RIR 2~3',
        rmKey: null,
        tip: '어깨뼈 날을 벤치에 걸칩니다. 엉덩이를 최대로 수축하며 올리고, 허리가 과신전되지 않도록 합니다.',
      },
      {
        id: 'rdl',
        name: '루마니안 데드리프트',
        eng: 'Romanian Deadlift',
        badge: null,
        sets: 3,
        reps: '10~12회',
        rest: '2~3분',
        rir: 'RIR 2~3',
        rmKey: null,
        tip: '엉덩이를 뒤로 밀며 내려갑니다. 바가 정강이를 따라 내려오게 하고, 등은 항상 곧게 유지합니다.',
      },
      {
        id: 'leg_ext',
        name: '레그 익스텐션',
        eng: 'Leg Extension',
        badge: null,
        sets: 3,
        reps: '12~15회',
        rest: '2분',
        rir: 'RIR 2~3',
        rmKey: null,
        tip: '허벅지 앞쪽 근육만 분리해서 자극합니다. 정점에서 1초 수축 후 천천히 내립니다.',
      },
      {
        id: 'calf_raise_b',
        name: '시티드 카프 레이즈',
        eng: 'Seated Calf Raise',
        badge: null,
        sets: 4,
        reps: '15~20회',
        rest: '90초',
        rir: 'RIR 2~3',
        rmKey: null,
        tip: '무릎을 90도로 굽힌 채 진행합니다. 스탠딩과 다른 가자미근을 집중 자극합니다.',
      },
    ],
  },

  /* ─── 토·일요일: 휴식 ─── */
  5: null,
  6: null,
}

export const BIG4_KEYS   = ['bench', 'squat', 'deadlift', 'ohp']
export const BIG4_LABELS = {
  bench:    '벤치프레스',
  squat:    '스쿼트',
  deadlift: '데드리프트',
  ohp:      '오버헤드 프레스',
}
