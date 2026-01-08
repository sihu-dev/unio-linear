// components/dashboard/recent-activity.tsx
import { clsx } from 'clsx/lite'

interface Activity {
  id: number
  type: string
  message: string
  time: string
  status: 'success' | 'warning' | 'info'
}

export function RecentActivity() {
  const activities: Activity[] = [
    { id: 1, type: 'alert', message: 'CNC-A1 불량률 기준치 초과 감지', time: '5분 전', status: 'warning' },
    { id: 2, type: 'success', message: 'OTT칩 펌웨어 업데이트 완료', time: '23분 전', status: 'success' },
    { id: 3, type: 'info', message: '일일 생산 리포트 자동 생성', time: '1시간 전', status: 'info' },
    { id: 4, type: 'success', message: '엑셀 브릿지 데이터 동기화 완료', time: '2시간 전', status: 'success' },
    { id: 5, type: 'alert', message: '로봇암 R-03 예방정비 예정 알림', time: '3시간 전', status: 'warning' },
  ]

  return (
    <div className="surface-card">
      <div className="border-b border-olive-950/10 p-6 dark:border-white/10">
        <h3 className="font-semibold text-olive-950 dark:text-white linear-tracking">최근 활동</h3>
      </div>
      <ul className="divide-y divide-olive-950/10 dark:divide-white/10" role="list" aria-label="최근 활동 목록">
        {activities.map((activity) => (
          <li key={activity.id} className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <div
                className={clsx(
                  'size-2 rounded-full',
                  activity.status === 'success' && 'bg-emerald-500',
                  activity.status === 'warning' && 'bg-amber-500',
                  activity.status === 'info' && 'bg-blue-500'
                )}
                aria-hidden="true"
              />
              <span className="text-sm text-olive-700 dark:text-olive-300">{activity.message}</span>
            </div>
            <span className="text-xs text-olive-500">{activity.time}</span>
          </li>
        ))}
      </ul>
      <div className="border-t border-olive-950/10 p-4 dark:border-white/10">
        <button type="button" className="text-sm font-medium text-linear-purple hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-linear-purple focus-visible:ring-offset-2 rounded">
          모든 활동 보기 →
        </button>
      </div>
    </div>
  )
}
