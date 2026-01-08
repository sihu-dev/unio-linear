// components/dashboard/ai-insights.tsx
'use client'

interface Insight {
  title: string
  description: string
  confidence: number
  action: string
}

export function AIInsights() {
  const insights: Insight[] = [
    {
      title: '불량률 개선 기회',
      description: 'CNC-A1 가공 속도를 5% 낮추면 불량률 12% 감소 예상',
      confidence: 94,
      action: '적용하기',
    },
    {
      title: '에너지 최적화',
      description: '비피크 시간대 작업 이동으로 월 ₩320,000 절감 가능',
      confidence: 87,
      action: '일정 조정',
    },
    {
      title: '예방정비 권고',
      description: '로봇암 R-02 베어링 마모 패턴 감지, 2주 내 교체 권장',
      confidence: 91,
      action: '정비 예약',
    },
  ]

  return (
    <div className="rounded-xl border border-olive-950/10 bg-white dark:border-white/10 dark:bg-white/5">
      <div className="border-b border-olive-950/10 p-6 dark:border-white/10">
        <div className="flex items-center gap-2">
          <div className="flex size-8 items-center justify-center rounded-lg bg-[#5E6AD2]/10">
            <svg className="size-4 text-[#5E6AD2]" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>
          <h3 className="font-semibold text-olive-950 dark:text-white">AI 인사이트</h3>
        </div>
      </div>
      <div className="divide-y divide-olive-950/10 dark:divide-white/10">
        {insights.map((insight, index) => (
          <div key={index} className="p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h4 className="font-medium text-olive-950 dark:text-white">{insight.title}</h4>
                <p className="mt-1 text-sm text-olive-600 dark:text-olive-400">{insight.description}</p>
                <div className="mt-2 flex items-center gap-2">
                  <div
                    className="h-1.5 w-24 overflow-hidden rounded-full bg-olive-200 dark:bg-olive-700"
                    role="progressbar"
                    aria-valuenow={insight.confidence}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label={`신뢰도 ${insight.confidence}%`}
                  >
                    <div
                      className="h-full rounded-full bg-[#5E6AD2]"
                      style={{ width: `${insight.confidence}%` }}
                    />
                  </div>
                  <span className="text-xs text-olive-500">신뢰도 {insight.confidence}%</span>
                </div>
              </div>
              <button
                type="button"
                className="rounded-lg bg-[#5E6AD2] px-3 py-1.5 text-sm font-medium text-white hover:bg-[#4F5BC3]"
              >
                {insight.action}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
