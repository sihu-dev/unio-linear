export default function DashboardLoading() {
  return (
    <div className="min-h-screen bg-olive-50 dark:bg-[#08090A]">
      {/* Header Skeleton */}
      <header className="sticky top-0 z-50 border-b border-olive-950/10 bg-white/80 backdrop-blur-sm dark:border-white/10 dark:bg-[#08090A]/80">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <div className="h-6 w-20 animate-pulse rounded bg-olive-200 dark:bg-olive-800" />
          <div className="flex gap-4">
            <div className="h-8 w-24 animate-pulse rounded bg-olive-200 dark:bg-olive-800" />
            <div className="h-8 w-8 animate-pulse rounded-full bg-olive-200 dark:bg-olive-800" />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-8">
        {/* Stats Skeleton */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="rounded-xl border border-olive-950/10 bg-white p-6 dark:border-white/10 dark:bg-white/5"
            >
              <div className="h-4 w-20 animate-pulse rounded bg-olive-200 dark:bg-olive-800" />
              <div className="mt-2 h-8 w-32 animate-pulse rounded bg-olive-200 dark:bg-olive-800" />
            </div>
          ))}
        </div>

        {/* Content Skeleton */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="h-64 animate-pulse rounded-xl bg-olive-200 dark:bg-olive-800" />
          <div className="h-64 animate-pulse rounded-xl bg-olive-200 dark:bg-olive-800" />
        </div>
      </main>
    </div>
  )
}
