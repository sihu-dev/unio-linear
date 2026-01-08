'use client'

import Link from 'next/link'
import { Container } from '@/components/elements/container'
import { Subheading } from '@/components/elements/subheading'
import { Text } from '@/components/elements/text'
import { ChartLineIcon } from '@/components/icons/chart-line-icon'
import { ChartBarIcon } from '@/components/icons/chart-bar-icon'
import {
  StatCard,
  EquipmentCard,
  ActivityChart,
  RecentActivity,
  AIInsights,
} from '@/components/dashboard'

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-olive-50 dark:bg-[#08090A]">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-olive-950/10 bg-white/80 backdrop-blur-sm dark:border-white/10 dark:bg-[#08090A]/80">
        <Container>
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-8">
              <Link href="/" className="text-xl font-bold tracking-tight text-olive-950 dark:text-white">
                UNIO
              </Link>
              <nav className="hidden items-center gap-6 md:flex" aria-label="메인 네비게이션">
                <Link href="/dashboard" className="text-sm font-medium text-[#5E6AD2]" aria-current="page">
                  대시보드
                </Link>
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
              <button
                type="button"
                aria-label="알림"
                className="relative rounded-lg p-2 text-olive-600 hover:bg-olive-100 dark:text-olive-400 dark:hover:bg-white/10"
              >
                <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
                <span className="absolute right-1.5 top-1.5 size-2 rounded-full bg-red-500" aria-label="새 알림 있음" />
              </button>
              <div className="flex items-center gap-3">
                <div className="size-8 rounded-full bg-[#5E6AD2]" aria-hidden="true" />
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
                <svg className="size-5 text-olive-600 dark:text-olive-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
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
                <svg className="size-5 text-olive-600 dark:text-olive-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
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
