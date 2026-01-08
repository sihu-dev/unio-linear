// components/dashboard/equipment-card.tsx
import { clsx } from 'clsx/lite'

export interface EquipmentCardProps {
  name: string
  status: 'running' | 'idle' | 'maintenance'
  efficiency: number
  lastUpdate: string
}

export function EquipmentCard({
  name,
  status,
  efficiency,
  lastUpdate,
}: EquipmentCardProps) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-olive-950/10 bg-white p-4 dark:border-white/10 dark:bg-white/5">
      <div className="flex items-center gap-4">
        <div
          className={clsx(
            'size-3 rounded-full',
            status === 'running' && 'bg-emerald-500',
            status === 'idle' && 'bg-amber-500',
            status === 'maintenance' && 'bg-red-500'
          )}
          aria-hidden="true"
        />
        <div>
          <p className="font-medium text-olive-950 dark:text-white">{name}</p>
          <p className="text-sm text-olive-600 dark:text-olive-400">
            {status === 'running' && '가동 중'}
            {status === 'idle' && '대기 중'}
            {status === 'maintenance' && '점검 중'}
          </p>
        </div>
      </div>
      <div className="text-right">
        <p className="font-semibold text-olive-950 dark:text-white">{efficiency}%</p>
        <p className="text-xs text-olive-500">{lastUpdate}</p>
      </div>
    </div>
  )
}
