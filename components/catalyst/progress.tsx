import { clsx } from 'clsx/lite'
import type { ComponentPropsWithoutRef } from 'react'

type ProgressProps = {
  value: number
  max?: number
  size?: 'sm' | 'md' | 'lg'
  color?: 'default' | 'purple' | 'success' | 'warning' | 'danger'
  showLabel?: boolean
  label?: string
} & Omit<ComponentPropsWithoutRef<'div'>, 'children'>

const sizes = {
  sm: 'h-1',
  md: 'h-1.5',
  lg: 'h-2',
}

const colors = {
  default: 'bg-olive-600 dark:bg-olive-400',
  purple: 'bg-linear-purple',
  success: 'bg-emerald-500',
  warning: 'bg-amber-500',
  danger: 'bg-red-500',
}

export function Progress({
  value,
  max = 100,
  size = 'md',
  color = 'purple',
  showLabel = false,
  label,
  className,
  ...props
}: ProgressProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100)

  return (
    <div className={clsx('w-full', className)} {...props}>
      {(showLabel || label) && (
        <div className="mb-1 flex justify-between text-xs text-olive-500 dark:text-olive-400">
          <span>{label}</span>
          {showLabel && <span>{Math.round(percentage)}%</span>}
        </div>
      )}
      <div
        className={clsx(
          'w-full overflow-hidden rounded-full bg-olive-200 dark:bg-olive-700',
          sizes[size]
        )}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
      >
        <div
          className={clsx(
            'h-full rounded-full transition-all duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]',
            colors[color]
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}

// Indeterminate progress bar
export function ProgressIndeterminate({
  size = 'md',
  color = 'purple',
  className,
  ...props
}: Omit<ProgressProps, 'value' | 'max' | 'showLabel' | 'label'>) {
  return (
    <div
      className={clsx(
        'w-full overflow-hidden rounded-full bg-olive-200 dark:bg-olive-700',
        sizes[size],
        className
      )}
      role="progressbar"
      aria-valuetext="Loading"
      {...props}
    >
      <div
        className={clsx(
          'h-full w-1/3 animate-[progress-indeterminate_1.5s_ease-in-out_infinite] rounded-full',
          colors[color]
        )}
      />
      <style>{`
        @keyframes progress-indeterminate {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(400%); }
        }
      `}</style>
    </div>
  )
}
