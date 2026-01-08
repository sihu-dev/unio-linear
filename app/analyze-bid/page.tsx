// app/analyze-bid/page.tsx
import dynamic from 'next/dynamic'
import type { Metadata } from 'next'

const BidAnalyzer = dynamic(() => import('@/components/BidAnalyzer').then(mod => mod.BidAnalyzer), {
  loading: () => (
    <div className="flex min-h-[400px] items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-olive-300 border-t-olive-900 dark:border-olive-700 dark:border-t-olive-100" />
    </div>
  ),
})

export const metadata: Metadata = {
  title: '입찰공고 AI 분석 - UNIO',
  description: '입찰 공고를 AI가 자동으로 분석하고 견적서 템플릿까지 생성합니다. Claude AI 기반 스마트 입찰 분석.',
  openGraph: {
    title: '입찰공고 AI 분석 - UNIO',
    description: '입찰 공고를 AI가 자동으로 분석합니다.',
  },
}

export default function AnalyzeBidPage() {
  return (
    <div className="min-h-screen bg-olive-100 p-8 dark:bg-olive-950">
      <BidAnalyzer />
    </div>
  )
}
