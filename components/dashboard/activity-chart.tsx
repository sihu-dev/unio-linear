// components/dashboard/activity-chart.tsx
'use client'

export function ActivityChart() {
  const data = [35, 45, 38, 52, 48, 60, 55, 70, 65, 78, 72, 85]
  const maxValue = Math.max(...data)
  const height = 200

  return (
    <div className="rounded-xl border border-olive-950/10 bg-white p-6 dark:border-white/10 dark:bg-white/5">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-olive-950 dark:text-white">생산성 추이</h3>
          <p className="text-sm text-olive-600 dark:text-olive-400">월별 AI 최적화 효과</p>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            className="rounded-lg bg-olive-950/5 px-3 py-1.5 text-sm font-medium text-olive-700 dark:bg-white/10 dark:text-olive-300"
          >
            12개월
          </button>
        </div>
      </div>
      <div className="relative h-[200px]" role="img" aria-label="월별 생산성 추이 차트">
        <svg className="h-full w-full" viewBox={`0 0 ${data.length * 60} ${height}`} preserveAspectRatio="none">
          {/* Grid lines */}
          {[0, 25, 50, 75, 100].map((percent) => (
            <line
              key={percent}
              x1="0"
              y1={height - (percent / 100) * height}
              x2={data.length * 60}
              y2={height - (percent / 100) * height}
              stroke="currentColor"
              strokeOpacity="0.1"
              strokeDasharray="4 4"
            />
          ))}
          {/* Area */}
          <defs>
            <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#5E6AD2" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#5E6AD2" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d={`M 0 ${height} ${data.map((d, i) => `L ${i * 60 + 30} ${height - (d / maxValue) * height * 0.9}`).join(' ')} L ${(data.length - 1) * 60 + 30} ${height} Z`}
            fill="url(#chartGradient)"
          />
          {/* Line */}
          <path
            d={`M ${data.map((d, i) => `${i * 60 + 30} ${height - (d / maxValue) * height * 0.9}`).join(' L ')}`}
            fill="none"
            stroke="#5E6AD2"
            strokeWidth="2"
          />
          {/* Dots */}
          {data.map((d, i) => (
            <circle
              key={i}
              cx={i * 60 + 30}
              cy={height - (d / maxValue) * height * 0.9}
              r="4"
              fill="#5E6AD2"
            />
          ))}
        </svg>
        {/* X-axis labels */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-between px-4 text-xs text-olive-500">
          {['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'].map((month) => (
            <span key={month}>{month}</span>
          ))}
        </div>
      </div>
    </div>
  )
}
