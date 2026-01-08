// components/BidAnalyzer.tsx
'use client'

import { useCallback, useState } from 'react'

interface AnalysisResult {
  사업개요: {
    사업명: string
    발주처: string
    공고번호: string
    예산: string
    사업기간: string
    납품장소: string
    입찰마감: string
    계약방식: string
  }
  요구설비: Array<{
    품명: string
    규격: string
    수량: string
    단위: string
    비고: string
  }>
  핵심요구사항: string[]
  평가기준: Array<{ 항목: string; 배점: string; 세부기준: string }>
  제출서류: Array<{ 서류명: string; 필수여부: string; 비고: string }>
  주의사항: string[]
  UNIO추천: {
    적합도: string
    예상경쟁률: string
    권장전략: string
    예상소요비용: string
  }
}

export function BidAnalyzer() {
  const [bidText, setBidText] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<AnalysisResult | null>(null)
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
        return 'text-emerald-600 bg-emerald-500/10 dark:text-emerald-400 dark:bg-emerald-400/10'
      case '중':
        return 'text-amber-600 bg-amber-500/10 dark:text-amber-400 dark:bg-amber-400/10'
      case '하':
        return 'text-red-600 bg-red-500/10 dark:text-red-400 dark:bg-red-400/10'
      default:
        return 'text-olive-600 bg-olive-500/10 dark:text-olive-400 dark:bg-olive-400/10'
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

      <div className="mb-6 rounded-xl border border-olive-200 bg-white p-6 dark:border-olive-800 dark:bg-olive-900">
        <label className="mb-2 block text-sm font-medium text-olive-700 dark:text-olive-300">
          입찰 공고 내용
        </label>
        <textarea
          value={bidText}
          onChange={(e) => setBidText(e.target.value)}
          placeholder="나라장터, 조달청 등의 입찰 공고 내용을 복사해서 붙여넣으세요..."
          className="h-48 w-full resize-none rounded-lg border border-olive-300 bg-olive-50 p-4 text-olive-950 placeholder-olive-400 focus:outline-none focus:ring-2 focus:ring-olive-500 dark:border-olive-700 dark:bg-olive-800 dark:text-white dark:placeholder-olive-500"
        />

        <div className="mt-4 flex gap-3">
          <button
            onClick={handleAnalyze}
            disabled={loading || !bidText.trim()}
            className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-olive-950 px-6 py-3 font-semibold text-white transition-colors hover:bg-olive-800 disabled:cursor-not-allowed disabled:bg-olive-300 dark:bg-olive-100 dark:text-olive-950 dark:hover:bg-olive-200 dark:disabled:bg-olive-800 dark:disabled:text-olive-600"
          >
            {loading ? (
              <>
                <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
                분석 중...
              </>
            ) : (
              <>AI 분석 시작</>
            )}
          </button>

          {result && (
            <button
              onClick={handleDownloadExcel}
              disabled={loading}
              className="flex items-center gap-2 rounded-lg bg-emerald-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-emerald-500 disabled:bg-olive-300 dark:disabled:bg-olive-700"
            >
              엑셀 다운로드
            </button>
          )}
        </div>

        {error && (
          <div className="mt-4 rounded-lg border border-red-300 bg-red-50 p-3 text-sm text-red-600 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-400">
            {error}
          </div>
        )}
      </div>

      {result && (
        <div className="overflow-hidden rounded-xl border border-olive-200 bg-white dark:border-olive-800 dark:bg-olive-900">
          <div className="flex overflow-x-auto border-b border-olive-200 dark:border-olive-800">
            {[
              { id: 'overview', label: '사업개요' },
              { id: 'equipment', label: '요구설비' },
              { id: 'criteria', label: '평가기준' },
              { id: 'documents', label: '제출서류' },
              { id: 'recommendation', label: 'UNIO추천' },
            ].map((tab) => (
              <button
                key={tab.id}
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

          <div className="p-6">
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
                          <span className="rounded bg-olive-200 px-2 py-1 text-sm text-olive-700 dark:bg-olive-700 dark:text-olive-300">
                            {item.배점}점
                          </span>
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
                        <input
                          type="checkbox"
                          className="h-4 w-4 rounded border-olive-300 bg-olive-100 dark:border-olive-600 dark:bg-olive-700"
                        />
                        <span className="flex-1 text-olive-700 dark:text-olive-300">
                          {item.서류명}
                        </span>
                        <span
                          className={`rounded px-2 py-1 text-xs ${
                            item.필수여부 === '필수'
                              ? 'bg-red-100 text-red-600 dark:bg-red-500/20 dark:text-red-400'
                              : 'bg-olive-200 text-olive-600 dark:bg-olive-700 dark:text-olive-400'
                          }`}
                        >
                          {item.필수여부}
                        </span>
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
                <div className={`mb-6 rounded-xl p-6 ${getFitnessColor(result.UNIO추천.적합도)}`}>
                  <div className="mb-1 text-sm opacity-80">입찰 적합도</div>
                  <div className="text-3xl font-bold">{result.UNIO추천.적합도}</div>
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
        </div>
      )}
    </div>
  )
}

export default BidAnalyzer
