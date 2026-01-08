// components/BidAnalyzer.tsx
'use client'

import { useCallback, useState } from 'react'
import type { BidAnalysisResult } from '@/types'
import { Button } from '@/components/catalyst/button'
import { Badge } from '@/components/catalyst/badge'
import { Textarea, Checkbox } from '@/components/catalyst/input'
import { Card, CardHeader, CardContent } from '@/components/catalyst/card'

export function BidAnalyzer() {
  const [bidText, setBidText] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<BidAnalysisResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<
    'overview' | 'equipment' | 'criteria' | 'documents' | 'recommendation'
  >('overview')

  const handleAnalyze = useCallback(async () => {
    if (!bidText.trim()) {
      setError('입찰 공고 내용을 입력해주세요.')
      return
    }
    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const res = await fetch('/api/analyze-bid', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bidText, outputFormat: 'json' }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || '분석 실패')
      setResult(data.analysis)
    } catch (e) {
      setError(e instanceof Error ? e.message : '알 수 없는 오류')
    } finally {
      setLoading(false)
    }
  }, [bidText])

  const handleDownloadExcel = useCallback(async () => {
    if (!result) return
    setLoading(true)
    try {
      const res = await fetch('/api/analyze-bid', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bidText, outputFormat: 'excel' }),
      })
      if (!res.ok) throw new Error('다운로드 실패')
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `입찰분석_${result.사업개요?.사업명?.substring(0, 20) || 'UNIO'}.xlsx`
      a.click()
      URL.revokeObjectURL(url)
    } catch {
      setError('엑셀 다운로드 실패')
    } finally {
      setLoading(false)
    }
  }, [bidText, result])

  const getFitnessColor = (fitness: string) => {
    switch (fitness) {
      case '상':
        return 'success' as const
      case '중':
        return 'warning' as const
      case '하':
        return 'danger' as const
      default:
        return 'default' as const
    }
  }

  return (
    <div className="mx-auto w-full max-w-6xl">
      <div className="mb-8">
        <h2 className="mb-2 text-2xl font-bold text-olive-950 dark:text-white">
          입찰공고 AI 분석
        </h2>
        <p className="text-olive-600 dark:text-olive-400">
          입찰 공고를 붙여넣으면 AI가 분석하고 견적서 템플릿까지 자동 생성합니다
        </p>
      </div>

      <Card className="mb-6">
        <CardContent>
          <label
            htmlFor="bid-text-input"
            className="mb-2 block text-sm font-medium text-olive-700 dark:text-olive-300"
          >
            입찰 공고 내용
          </label>
          <Textarea
            id="bid-text-input"
            value={bidText}
            onChange={(e) => setBidText(e.target.value)}
            placeholder="나라장터, 조달청 등의 입찰 공고 내용을 복사해서 붙여넣으세요..."
            error={!!error}
            errorMessage={error || undefined}
            className="min-h-[200px]"
          />

          <div className="mt-4 flex gap-3">
            <Button
              onClick={handleAnalyze}
              disabled={!bidText.trim()}
              loading={loading}
              size="lg"
              className="flex-1"
            >
              AI 분석 시작
            </Button>

            {result && (
              <Button
                onClick={handleDownloadExcel}
                disabled={loading}
                color="success"
                size="lg"
                leftIcon={
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                }
              >
                엑셀 다운로드
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {result && (
        <Card padding="none">
          <div
            role="tablist"
            aria-label="분석 결과 탭"
            className="flex overflow-x-auto border-b border-olive-200 dark:border-olive-800"
          >
            {[
              { id: 'overview', label: '사업개요' },
              { id: 'equipment', label: '요구설비' },
              { id: 'criteria', label: '평가기준' },
              { id: 'documents', label: '제출서류' },
              { id: 'recommendation', label: 'UNIO추천' },
            ].map((tab) => (
              <button
                key={tab.id}
                role="tab"
                aria-selected={activeTab === tab.id}
                aria-controls={`tabpanel-${tab.id}`}
                id={`tab-${tab.id}`}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`whitespace-nowrap px-4 py-3 text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'border-b-2 border-olive-950 bg-olive-50 text-olive-950 dark:border-olive-300 dark:bg-olive-800 dark:text-white'
                    : 'text-olive-500 hover:bg-olive-50 hover:text-olive-700 dark:text-olive-400 dark:hover:bg-olive-800 dark:hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div
            role="tabpanel"
            id={`tabpanel-${activeTab}`}
            aria-labelledby={`tab-${activeTab}`}
            className="p-6"
          >
            {activeTab === 'overview' && result.사업개요 && (
              <div className="space-y-4">
                <h3 className="mb-4 text-lg font-semibold text-olive-950 dark:text-white">
                  사업 개요
                </h3>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {Object.entries(result.사업개요).map(([key, value]) => (
                    <div
                      key={key}
                      className="rounded-lg bg-olive-50 p-4 dark:bg-olive-800"
                    >
                      <div className="mb-1 text-xs text-olive-500 dark:text-olive-400">
                        {key}
                      </div>
                      <div className="font-medium text-olive-950 dark:text-white">
                        {value || '-'}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'equipment' && (
              <div>
                <h3 className="mb-4 text-lg font-semibold text-olive-950 dark:text-white">
                  요구 설비 목록
                </h3>
                {result.요구설비?.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-olive-200 text-left text-xs text-olive-500 dark:border-olive-700 dark:text-olive-400">
                          <th className="pb-3 pr-4">#</th>
                          <th className="pb-3 pr-4">품명</th>
                          <th className="pb-3 pr-4">규격</th>
                          <th className="pb-3 pr-4">수량</th>
                          <th className="pb-3 pr-4">비고</th>
                        </tr>
                      </thead>
                      <tbody>
                        {result.요구설비.map((item, i) => (
                          <tr
                            key={i}
                            className="border-b border-olive-100 text-olive-700 dark:border-olive-800 dark:text-olive-300"
                          >
                            <td className="py-3 pr-4 text-olive-400">{i + 1}</td>
                            <td className="py-3 pr-4 font-medium text-olive-950 dark:text-white">
                              {item.품명}
                            </td>
                            <td className="py-3 pr-4">{item.규격}</td>
                            <td className="py-3 pr-4">
                              {item.수량} {item.단위}
                            </td>
                            <td className="py-3 pr-4 text-olive-500">{item.비고 || '-'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-olive-500">요구 설비 정보가 없습니다.</p>
                )}
              </div>
            )}

            {activeTab === 'criteria' && (
              <div>
                <h3 className="mb-4 text-lg font-semibold text-olive-950 dark:text-white">
                  평가 기준
                </h3>
                {result.평가기준?.length > 0 ? (
                  <div className="space-y-3">
                    {result.평가기준.map((item, i) => (
                      <div key={i} className="rounded-lg bg-olive-50 p-4 dark:bg-olive-800">
                        <div className="mb-2 flex items-center justify-between">
                          <span className="font-medium text-olive-950 dark:text-white">
                            {item.항목}
                          </span>
                          <Badge variant="soft" color="primary" size="sm">
                            {item.배점}점
                          </Badge>
                        </div>
                        <p className="text-sm text-olive-600 dark:text-olive-400">
                          {item.세부기준}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-olive-500">평가 기준 정보가 없습니다.</p>
                )}
              </div>
            )}

            {activeTab === 'documents' && (
              <div>
                <h3 className="mb-4 text-lg font-semibold text-olive-950 dark:text-white">
                  제출 서류 체크리스트
                </h3>
                {result.제출서류?.length > 0 ? (
                  <div className="space-y-2">
                    {result.제출서류.map((item, i) => (
                      <div
                        key={i}
                        className={`flex items-center gap-3 rounded-lg p-3 ${
                          item.필수여부 === '필수'
                            ? 'border border-red-300 bg-red-50 dark:border-red-500/30 dark:bg-red-500/10'
                            : 'bg-olive-50 dark:bg-olive-800'
                        }`}
                      >
                        <Checkbox
                          aria-label={`${item.서류명} 준비 완료`}
                        />
                        <span className="flex-1 text-olive-700 dark:text-olive-300">
                          {item.서류명}
                        </span>
                        <Badge
                          variant="soft"
                          color={item.필수여부 === '필수' ? 'danger' : 'default'}
                          size="sm"
                        >
                          {item.필수여부}
                        </Badge>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-olive-500">제출 서류 정보가 없습니다.</p>
                )}
              </div>
            )}

            {activeTab === 'recommendation' && result.UNIO추천 && (
              <div>
                <h3 className="mb-4 text-lg font-semibold text-olive-950 dark:text-white">
                  UNIO AI 분석 결과
                </h3>
                <div className="mb-6 rounded-xl bg-olive-50 p-6 dark:bg-olive-800">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-sm text-olive-500 dark:text-olive-400">입찰 적합도</span>
                    <Badge
                      variant="solid"
                      color={getFitnessColor(result.UNIO추천.적합도 ?? '')}
                      size="lg"
                    >
                      {result.UNIO추천.적합도 || '-'}
                    </Badge>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="rounded-lg bg-olive-50 p-4 dark:bg-olive-800">
                    <div className="mb-1 text-xs text-olive-500 dark:text-olive-400">
                      예상 경쟁률
                    </div>
                    <div className="font-medium text-olive-950 dark:text-white">
                      {result.UNIO추천.예상경쟁률 || '-'}
                    </div>
                  </div>
                  <div className="rounded-lg bg-olive-50 p-4 dark:bg-olive-800">
                    <div className="mb-1 text-xs text-olive-500 dark:text-olive-400">
                      예상 소요비용
                    </div>
                    <div className="font-medium text-olive-950 dark:text-white">
                      {result.UNIO추천.예상소요비용 || '-'}
                    </div>
                  </div>
                </div>
                <div className="mt-4 rounded-lg bg-olive-50 p-4 dark:bg-olive-800">
                  <div className="mb-2 text-xs text-olive-500 dark:text-olive-400">권장 전략</div>
                  <div className="text-olive-700 dark:text-olive-300">
                    {result.UNIO추천.권장전략 || '-'}
                  </div>
                </div>
              </div>
            )}
          </div>
        </Card>
      )}
    </div>
  )
}

export default BidAnalyzer
