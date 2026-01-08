'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Error tracked - could integrate with Sentry/LogRocket
    void error
  }, [error])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-olive-50 px-6 dark:bg-[#08090A]">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-olive-950 dark:text-white">
          문제가 발생했습니다
        </h1>
        <p className="mt-4 text-lg text-olive-600 dark:text-olive-400">
          일시적인 오류가 발생했습니다. 다시 시도해 주세요.
        </p>
        {error.digest && (
          <p className="mt-2 text-sm text-olive-500 dark:text-olive-500">
            오류 코드: {error.digest}
          </p>
        )}
        <div className="mt-8 flex justify-center gap-4">
          <button
            onClick={reset}
            className="rounded-full bg-olive-950 px-6 py-2 text-sm font-medium text-white hover:bg-olive-800 dark:bg-olive-300 dark:text-olive-950 dark:hover:bg-olive-200"
          >
            다시 시도
          </button>
          <a
            href="/"
            className="rounded-full bg-olive-950/10 px-6 py-2 text-sm font-medium text-olive-950 hover:bg-olive-950/20 dark:bg-white/10 dark:text-white dark:hover:bg-white/20"
          >
            홈으로
          </a>
        </div>
      </div>
    </div>
  )
}
