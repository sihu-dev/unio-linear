// components/dashboard/stat-card.tsx
import { clsx } from 'clsx/lite'

export interface StatCardProps {
  title: string
  value: string
  change: string
  changeType?: 'positive' | 'negative' | 'neutral'
  icon: React.ReactNode
}

export function StatCard({
  title,
  value,
  change,
  changeType = 'positive',
  icon,
}: StatCardProps) {
  return (
    <div className="rounded-xl border border-olive-950/10 bg-white p-6 dark:border-white/10 dark:bg-white/5">
      <div className="flex items-center justify-between">
        <span className="text-sm text-olive-600 dark:text-olive-400">{title}</span>
        <div className="flex size-10 items-center justify-center rounded-lg bg-olive-950/5 dark:bg-white/10">
          {icon}
        </div>
      </div>
      <div className="mt-4">
        <span className="text-3xl font-semibold tracking-tight text-olive-950 dark:text-white">{value}</span>
      </div>
      <div className="mt-2 flex items-center gap-2">
        <span
          className={clsx(
            'text-sm font-medium',
            changeType === 'positive' && 'text-emerald-600 dark:text-emerald-400',
            changeType === 'negative' && 'text-red-600 dark:text-red-400',
            changeType === 'neutral' && 'text-olive-600 dark:text-olive-400'
          )}
        >
          {changeType === 'positive' && '↑'}
          {changeType === 'negative' && '↓'}
          {change}
        </span>
        <span className="text-sm text-olive-500 dark:text-olive-500">vs 지난달</span>
      </div>
    </div>
  )
}
