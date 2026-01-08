import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '대시보드 - UNIO',
  description: 'UNIO 스마트공장 대시보드. 공장 현황을 한눈에 확인하세요.',
  robots: { index: false, follow: false },
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
