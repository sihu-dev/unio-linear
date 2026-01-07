'use client'

import { Container } from '@/components/elements/container'
import { Subheading } from '@/components/elements/subheading'
import { Text } from '@/components/elements/text'
import { Button } from '@/components/elements/button'
import { ChartLineIcon } from '@/components/icons/chart-line-icon'
import { ChartBarIcon } from '@/components/icons/chart-bar-icon'
import { clsx } from 'clsx/lite'

// Stats Card Component
function StatCard({
  title,
  value,
  change,
  changeType = 'positive',
  icon,
}: {
  title: string
  value: string
  change: string
  changeType?: 'positive' | 'negative' | 'neutral'
  icon: React.ReactNode
}) {
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

// Activity Chart (simplified SVG chart)
function ActivityChart() {
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
          <button className="rounded-lg bg-olive-950/5 px-3 py-1.5 text-sm font-medium text-olive-700 dark:bg-white/10 dark:text-olive-300">
            12개월
          </button>
        </div>
      </div>
      <div className="relative h-[200px]">
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

// Equipment Status Card
function EquipmentCard({
  name,
  status,
  efficiency,
  lastUpdate,
}: {
  name: string
  status: 'running' | 'idle' | 'maintenance'
  efficiency: number
  lastUpdate: string
}) {
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

// Recent Activity Table
function RecentActivity() {
  const activities = [
    { id: 1, type: 'alert', message: 'CNC-A1 불량률 기준치 초과 감지', time: '5분 전', status: 'warning' },
    { id: 2, type: 'success', message: 'OTT칩 펌웨어 업데이트 완료', time: '23분 전', status: 'success' },
    { id: 3, type: 'info', message: '일일 생산 리포트 자동 생성', time: '1시간 전', status: 'info' },
    { id: 4, type: 'success', message: '엑셀 브릿지 데이터 동기화 완료', time: '2시간 전', status: 'success' },
    { id: 5, type: 'alert', message: '로봇암 R-03 예방정비 예정 알림', time: '3시간 전', status: 'warning' },
  ]

  return (
    <div className="rounded-xl border border-olive-950/10 bg-white dark:border-white/10 dark:bg-white/5">
      <div className="border-b border-olive-950/10 p-6 dark:border-white/10">
        <h3 className="font-semibold text-olive-950 dark:text-white">최근 활동</h3>
      </div>
      <div className="divide-y divide-olive-950/10 dark:divide-white/10">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <div
                className={clsx(
                  'size-2 rounded-full',
                  activity.status === 'success' && 'bg-emerald-500',
                  activity.status === 'warning' && 'bg-amber-500',
                  activity.status === 'info' && 'bg-blue-500'
                )}
              />
              <span className="text-sm text-olive-700 dark:text-olive-300">{activity.message}</span>
            </div>
            <span className="text-xs text-olive-500">{activity.time}</span>
          </div>
        ))}
      </div>
      <div className="border-t border-olive-950/10 p-4 dark:border-white/10">
        <button className="text-sm font-medium text-[#5E6AD2] hover:underline">모든 활동 보기 →</button>
      </div>
    </div>
  )
}

// AI Insights Section
function AIInsights() {
  const insights = [
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
            <svg className="size-4 text-[#5E6AD2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                  <div className="h-1.5 w-24 overflow-hidden rounded-full bg-olive-200 dark:bg-olive-700">
                    <div
                      className="h-full rounded-full bg-[#5E6AD2]"
                      style={{ width: `${insight.confidence}%` }}
                    />
                  </div>
                  <span className="text-xs text-olive-500">신뢰도 {insight.confidence}%</span>
                </div>
              </div>
              <button className="rounded-lg bg-[#5E6AD2] px-3 py-1.5 text-sm font-medium text-white hover:bg-[#4F5BC3]">
                {insight.action}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-olive-50 dark:bg-[#08090A]">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-olive-950/10 bg-white/80 backdrop-blur-sm dark:border-white/10 dark:bg-[#08090A]/80">
        <Container>
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-8">
              <a href="/" className="text-xl font-bold tracking-tight text-olive-950 dark:text-white">
                UNIO
              </a>
              <nav className="hidden items-center gap-6 md:flex">
                <a href="/dashboard" className="text-sm font-medium text-[#5E6AD2]">
                  대시보드
                </a>
                <a
                  href="#"
                  className="text-sm font-medium text-olive-600 hover:text-olive-950 dark:text-olive-400 dark:hover:text-white"
                >
                  설비 관리
                </a>
                <a
                  href="#"
                  className="text-sm font-medium text-olive-600 hover:text-olive-950 dark:text-olive-400 dark:hover:text-white"
                >
                  리포트
                </a>
                <a
                  href="#"
                  className="text-sm font-medium text-olive-600 hover:text-olive-950 dark:text-olive-400 dark:hover:text-white"
                >
                  설정
                </a>
              </nav>
            </div>
            <div className="flex items-center gap-4">
              <button className="relative rounded-lg p-2 text-olive-600 hover:bg-olive-100 dark:text-olive-400 dark:hover:bg-white/10">
                <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
                <span className="absolute right-1.5 top-1.5 size-2 rounded-full bg-red-500" />
              </button>
              <div className="flex items-center gap-3">
                <div className="size-8 rounded-full bg-[#5E6AD2]" />
                <span className="hidden text-sm font-medium text-olive-950 dark:text-white md:block">
                  김대표
                </span>
              </div>
            </div>
          </div>
        </Container>
      </header>

      {/* Main Content */}
      <main className="py-8">
        <Container>
          {/* Page Title */}
          <div className="mb-8">
            <Subheading>대시보드</Subheading>
            <Text className="mt-2">공장 현황을 한눈에 확인하세요</Text>
          </div>

          {/* Stats Grid */}
          <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard
              title="가동률"
              value="94.2%"
              change="3.2%"
              changeType="positive"
              icon={<ChartLineIcon className="size-5 text-olive-600 dark:text-olive-400" />}
            />
            <StatCard
              title="불량률"
              value="1.8%"
              change="0.5%"
              changeType="positive"
              icon={<ChartBarIcon className="size-5 text-olive-600 dark:text-olive-400" />}
            />
            <StatCard
              title="월 생산량"
              value="12,847"
              change="8.3%"
              changeType="positive"
              icon={
                <svg className="size-5 text-olive-600 dark:text-olive-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              }
            />
            <StatCard
              title="비용 절감"
              value="₩2.4M"
              change="12.1%"
              changeType="positive"
              icon={
                <svg className="size-5 text-olive-600 dark:text-olive-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              }
            />
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Left Column - Chart */}
            <div className="lg:col-span-2">
              <ActivityChart />
            </div>

            {/* Right Column - Equipment Status */}
            <div className="space-y-4">
              <h3 className="font-semibold text-olive-950 dark:text-white">설비 현황</h3>
              <EquipmentCard name="CNC 가공기 A1" status="running" efficiency={96} lastUpdate="방금 전" />
              <EquipmentCard name="로봇암 R-01" status="running" efficiency={92} lastUpdate="1분 전" />
              <EquipmentCard name="로봇암 R-02" status="idle" efficiency={0} lastUpdate="대기 중" />
              <EquipmentCard name="컨베이어 C-01" status="running" efficiency={88} lastUpdate="방금 전" />
              <EquipmentCard name="용접기 W-01" status="maintenance" efficiency={0} lastUpdate="점검 중" />
            </div>
          </div>

          {/* Bottom Grid */}
          <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
            <RecentActivity />
            <AIInsights />
          </div>
        </Container>
      </main>
    </div>
  )
}
