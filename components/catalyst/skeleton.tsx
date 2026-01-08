import { clsx } from 'clsx/lite'
import type { ComponentPropsWithoutRef } from 'react'

type SkeletonProps = {
  variant?: 'text' | 'circular' | 'rectangular'
  width?: string | number
  height?: string | number
  animation?: 'pulse' | 'shimmer' | 'none'
} & ComponentPropsWithoutRef<'div'>

export function Skeleton({
  variant = 'text',
  width,
  height,
  animation = 'pulse',
  className,
  ...props
}: SkeletonProps) {
  return (
    <div
      className={clsx(
        'bg-olive-200 dark:bg-olive-800',
        variant === 'text' && 'h-4 w-full rounded',
        variant === 'circular' && 'rounded-full',
        variant === 'rectangular' && 'rounded-lg',
        animation === 'pulse' && 'animate-pulse',
        animation === 'shimmer' && 'animate-shimmer bg-gradient-to-r from-olive-200 via-olive-100 to-olive-200 dark:from-olive-800 dark:via-olive-700 dark:to-olive-800 bg-[length:200%_100%]',
        className
      )}
      style={{
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : height,
      }}
      aria-hidden="true"
      {...props}
    />
  )
}

// Convenience components
export function SkeletonText({ lines = 3, className, ...props }: { lines?: number } & Omit<SkeletonProps, 'variant'>) {
  return (
    <div className={clsx('space-y-2', className)} {...props}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          variant="text"
          width={i === lines - 1 ? '60%' : '100%'}
        />
      ))}
    </div>
  )
}

export function SkeletonAvatar({ size = 40, ...props }: { size?: number } & Omit<SkeletonProps, 'variant' | 'width' | 'height'>) {
  return (
    <Skeleton
      variant="circular"
      width={size}
      height={size}
      {...props}
    />
  )
}

export function SkeletonCard({ className, ...props }: Omit<SkeletonProps, 'variant'>) {
  return (
    <div className={clsx('rounded-xl border border-olive-200 bg-white p-6 dark:border-olive-800 dark:bg-olive-900', className)} {...props}>
      <div className="flex items-center gap-4">
        <SkeletonAvatar />
        <div className="flex-1 space-y-2">
          <Skeleton width="40%" height={16} />
          <Skeleton width="60%" height={12} />
        </div>
      </div>
      <div className="mt-4">
        <SkeletonText lines={2} />
      </div>
    </div>
  )
}

export function SkeletonTable({ rows = 5, cols = 4, className, ...props }: { rows?: number; cols?: number } & Omit<SkeletonProps, 'variant'>) {
  return (
    <div className={clsx('w-full', className)} {...props}>
      {/* Header */}
      <div className="flex gap-4 border-b border-olive-200 pb-3 dark:border-olive-800">
        {Array.from({ length: cols }).map((_, i) => (
          <Skeleton key={i} height={12} className="flex-1" />
        ))}
      </div>
      {/* Rows */}
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={rowIndex} className="flex gap-4 border-b border-olive-100 py-3 dark:border-olive-800">
          {Array.from({ length: cols }).map((_, colIndex) => (
            <Skeleton key={colIndex} height={16} className="flex-1" />
          ))}
        </div>
      ))}
    </div>
  )
}
