export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-olive-50 dark:bg-[#08090A]">
      <div className="flex flex-col items-center gap-4">
        <div className="relative size-12">
          <div className="absolute inset-0 animate-spin rounded-full border-4 border-olive-200 border-t-[#5E6AD2] dark:border-olive-800 dark:border-t-[#5E6AD2]" />
        </div>
        <p className="text-sm text-olive-600 dark:text-olive-400">로딩 중...</p>
      </div>
    </div>
  )
}
