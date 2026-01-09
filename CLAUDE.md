# UNIO 프로젝트 통합 메모리 (v4.0)

> **검증일**: 2026-01-09 | **상태**: 교차 검수 완료

---

## 프로젝트 정의

**UNIO = 협동로봇 AI 플랫폼 + 스마트공장 Pool 통합 솔루션**

| 핵심 기술 | 설명 | 효과 |
|----------|------|------|
| **AutoPath** | AI 기반 로봇 경로 자동 생성 | 72시간 → 30분 (80% 단축) |
| **RoboTwin** | 디지털 트윈 시뮬레이션 | 테스트 비용 50% 절감 |
| **AI 예지보전** | 설비 이상 사전 감지 | 다운타임 70% 감소 |

---

## 2026년 정부지원사업 (검증 완료)

### TIPS 2026 변경사항 (중요)

| 항목 | 2025년 | **2026년** |
|------|--------|-----------|
| 일반 R&D 지원 | 최대 5억 | **최대 8억** |
| 스케일업 R&D | 최대 12억 | **최대 35억** |
| 수도권 선투자 | 1억 | **2억** |
| 비수도권 선투자 | 1억 | **1억 유지** |
| 지역 기업 할당 | 미정 | **50% 우선** |
| 트랙 구조 | 일반/딥테크/글로벌 | **일반트랙 통합** |

**출처**: [llumos](https://llumos.co/collection/tips-2026-reform-5-changes)

### 자율형공장 구축사업

| 항목 | 내용 |
|------|------|
| 최대 지원금 | **6억원 (총 사업비 50%)** |
| 지원 기간 | 최대 2년 (연 3억 이내) |
| Pool 등록 요건 | AI·DT 기반 자율제어 역량 보유 |
| 도입기업 자격 | '중간1' 이상 스마트공장 기구축 |

**출처**: [기업마당](https://www.bizinfo.go.kr/web/lay1/bbs/S1T122C128/AS/74/view.do?pblancId=PBLN_000000000116480)

### 핵심 일정

| 사업명 | 마감 | 지원금 | UNIO 적합도 |
|--------|------|--------|------------|
| 로봇활용 제조혁신 | 1/22 | 2.5억 | ★★★★★ |
| 창업성장기술개발 | 1/23 | 2억 | ★★★★☆ |
| 초기창업패키지 딥테크 | 1/27 | 1억 | ★★★★☆ |
| 청년창업사관학교 16기 | 2월 | 1억 | ★★★★★ |
| TIPS 본 선정 | 수시 | **8억** | ★★★★★ |
| 자율형공장 구축 | 3월 | **6억** | ★★★★★ |

---

## Claude API 가격 (2026.01 검증)

### 모델별 가격 (per 1M tokens)

| 모델 | Input | Output | 용도 |
|------|-------|--------|------|
| **Opus 4.5** | $5 | $25 | 복잡한 전략 분석 |
| **Sonnet 4.5** | $3 | $15 | 일반 작업 (권장) |
| **Haiku 4.5** | $1 | $5 | 대량 처리 |
| Haiku 3.5 | $0.80 | $4 | 경량 작업 |

### 비용 최적화

| 방법 | 할인율 | 적용 |
|------|--------|------|
| **Batch API** | 50% | 비긴급 대량 작업 |
| **Prompt Caching** | 90% | 반복 시스템 프롬프트 |
| **모델 라우팅** | 30-50% | 복잡도별 자동 선택 |

**출처**: [Claude Docs Pricing](https://platform.claude.com/docs/en/about-claude/pricing)

---

## 기술 스택

### 권장 스택 (검증됨)

```
Frontend:  Next.js 15 + React 19 + TailwindCSS + Linear Design
Backend:   Prisma + Supabase + Redis (Upstash)
AI:        Claude API 11/11 (@unilab/ai-engine)
UI Kit:    Catalyst UI (Tailwind Plus)
```

### ai-engine 구현 현황

**unio-linear 경량 클라이언트** (lib/ai/)

| API | 파일 | 상태 |
|-----|------|------|
| Messages | lib/ai/client.ts | **연결 완료** |
| Tool Use | lib/ai/client.ts | **연결 완료** |
| Vision | lib/ai/client.ts | **연결 완료** |
| Prompt Caching | lib/ai/client.ts | **연결 완료** |
| Extended Thinking | lib/ai/client.ts | **연결 완료** |
| Model Routing | lib/ai/client.ts | **연결 완료** |

**unilab 전체 구현** (packages/ai-engine/)

| API | 파일 | 라인 | 비용 절감 |
|-----|------|------|----------|
| Messages | core/client.ts | 412 | - |
| Tool Use | core/client.ts | - | - |
| Vision | core/client.ts | - | - |
| Prompt Caching | core/cache-manager.ts | 156 | **90%** |
| Extended Thinking | core/client.ts | - | - |
| PDF Support | services/pdf.ts | 371 | - |
| Batch API | services/batch.ts | 305 | **50%** |
| Computer Use | services/computer.ts | 602 | - |
| Skills | services/skills.ts | 198 | - |
| Files API | services/files.ts | 124 | - |
| Citations | services/citations.ts | 89 | - |

**총 코드량**: 2,464 lines | **구현률**: 11/11 (100%)

---

## 타겟 시장

### TAM-SAM-SOM

```
TAM: 스마트공장 솔루션 시장 20조원 (CAGR 7-11%)
SAM: 협동로봇+AI 플랫폼 2.5조원
SOM: Pool 등록 기업 타겟 800억원
```

### Pool 대상 기업

| 지표 | 수치 |
|------|------|
| 스마트공장 Pool 등록 | **2,460개사** |
| AI 도입 부재 비율 | 78.5% |
| 연간 신규 수요 | 4,000개+ |

---

## 팀 구성

| 역할 | 인물 | 핵심 어필 |
|------|------|----------|
| **CEO** | 이혜인 | 2025 웰컴투 TIPS 선정 |
| **COO** | 조시후 | 대전 청창사 우수 졸업 |
| **CTO** | 김호균 | 부산 거주 (비수도권 가점) |

---

## 매출 목표

| 연도 | 목표 | 근거 |
|------|------|------|
| 2026 | 7억 | Pool 3건 + AI바우처 2건 + PoC |
| 2027 | 38억 | 자율형공장 + Pool 확대 |
| 2030 | 204억 | 시장 점유율 확대 |

**Revenue Mix**: Pool 60% + 파트너 40%

---

## 랜딩 페이지 수정 사항

### 현재 오류

| 항목 | 현재 | 수정 필요 |
|------|------|----------|
| Pool 대상 | 1,932개사 | **2,460개사** |
| ROI 기간 | 0.7개월 | **근거 추가 또는 삭제** |
| 메인 카피 | Pool 로봇SI 전용 | **협동로봇 AI 플랫폼** |

### 권장 카피

```
Hero: "72시간 → 30분, AI가 로봇 프로그래밍을 대신합니다"
Sub:  "스마트공장 Pool 2,460개사를 위한 협동로봇 AI 플랫폼"
```

---

## 프로젝트 구조

```
/home/sihu2/github/unio-linear/
├── app/
│   ├── api/ai/              # Claude API 엔드포인트
│   └── page.tsx             # 랜딩 페이지
├── components/
│   ├── catalyst/            # UI Kit (4개)
│   └── linear/              # Linear 스타일 (5개)
├── lib/
│   └── ai/                  # Claude 클라이언트 (경량)
│       ├── client.ts        # AIClient 구현
│       ├── types.ts         # 타입 정의
│       └── index.ts         # 모듈 내보내기
└── docs/

/home/sihu2/github/unilab/   # 메인 프로젝트
├── apps/unio/               # Next.js 앱 (226 컴포넌트)
└── packages/
    ├── ai-engine/           # Claude 11/11 API (전체)
    ├── database/            # Prisma + Supabase
    └── mcp-server/          # MCP 서버
```

---

## 즉시 실행 작업

### P0 (완료)

1. [x] unio-linear에 ai-engine 패키지 연결 (lib/ai/)
2. [x] 랜딩 카피 수치 수정 (2,460개사)
3. [ ] Mock 데이터 → API 연동

### P1 (이번 주)

1. [ ] BidFlow 컴포넌트 포팅
2. [ ] Sheet Agent 통합
3. [x] 사업계획서 TIPS 정보 업데이트 (CLAUDE.md 반영)

### P2 (다음 주)

1. [ ] 나라장터 API 연동
2. [ ] CODEF 카드 연동 검토
3. [ ] Oatmeal 템플릿 적용

---

## Git 자동화

```bash
# 커밋 메시지 형식
feat: [기능] - [설명]
fix: [버그] - [내용]
docs: [문서] - [변경]
refactor: [영역] - [개선]

# Co-Author
Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>
```

---

_최종 업데이트: 2026-01-09 | 교차 검수 완료_
