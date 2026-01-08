import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-olive-50 px-6 dark:bg-[#08090A]">
      <div className="text-center">
        <p className="text-sm font-semibold text-[#5E6AD2]">404</p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-olive-950 dark:text-white">
          페이지를 찾을 수 없습니다
        </h1>
        <p className="mt-4 text-lg text-olive-600 dark:text-olive-400">
          요청하신 페이지가 존재하지 않거나 이동되었습니다.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Link
            href="/"
            className="rounded-full bg-olive-950 px-6 py-2 text-sm font-medium text-white hover:bg-olive-800 dark:bg-olive-300 dark:text-olive-950 dark:hover:bg-olive-200"
          >
            홈으로 돌아가기
          </Link>
          <Link
            href="/analyze-bid"
            className="rounded-full bg-olive-950/10 px-6 py-2 text-sm font-medium text-olive-950 hover:bg-olive-950/20 dark:bg-white/10 dark:text-white dark:hover:bg-white/20"
          >
            입찰 분석
          </Link>
        </div>
      </div>
    </div>
  )
}
