import { clsx } from 'clsx/lite'
import type { ComponentPropsWithoutRef, ReactNode } from 'react'

const variants = {
  solid: {
    default: 'bg-olive-100 text-olive-700 dark:bg-olive-800 dark:text-olive-300',
    primary: 'bg-olive-950 text-white dark:bg-olive-100 dark:text-olive-950',
    secondary: 'bg-olive-200 text-olive-800 dark:bg-olive-700 dark:text-olive-200',
    success: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-400',
    warning: 'bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-400',
    danger: 'bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-400',
    info: 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-400',
  },
  outline: {
    default:
      'border border-olive-300 text-olive-700 dark:border-olive-600 dark:text-olive-300',
    primary:
      'border border-olive-950 text-olive-950 dark:border-olive-100 dark:text-olive-100',
    secondary:
      'border border-olive-400 text-olive-600 dark:border-olive-500 dark:text-olive-400',
    success:
      'border border-emerald-300 text-emerald-700 dark:border-emerald-600 dark:text-emerald-400',
    warning:
      'border border-amber-300 text-amber-700 dark:border-amber-600 dark:text-amber-400',
    danger: 'border border-red-300 text-red-700 dark:border-red-600 dark:text-red-400',
    info: 'border border-blue-300 text-blue-700 dark:border-blue-600 dark:text-blue-400',
  },
  soft: {
    default: 'bg-olive-50 text-olive-600 dark:bg-olive-900/30 dark:text-olive-400',
    primary: 'bg-olive-100/80 text-olive-900 dark:bg-olive-800/50 dark:text-olive-200',
    secondary: 'bg-olive-100/50 text-olive-600 dark:bg-olive-800/30 dark:text-olive-400',
    success: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400',
    warning: 'bg-amber-50 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400',
    danger: 'bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-400',
    info: 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
  },
}

const sizes = {
  xs: 'px-1.5 py-0.5 text-xs',
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-2.5 py-1 text-sm',
  lg: 'px-3 py-1.5 text-sm',
}

type BadgeProps = {
  variant?: keyof typeof variants
  color?: keyof (typeof variants)['solid']
  size?: keyof typeof sizes
  dot?: boolean
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  removable?: boolean
  onRemove?: () => void
} & ComponentPropsWithoutRef<'span'>

export function Badge({
  variant = 'solid',
  color = 'default',
  size = 'md',
  dot = false,
  leftIcon,
  rightIcon,
  removable = false,
  onRemove,
  className,
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={clsx(
        'inline-flex items-center gap-1 rounded-full font-medium',
        variants[variant][color],
        sizes[size],
        className
      )}
      {...props}
    >
      {dot && (
        <span
          className={clsx(
            'h-1.5 w-1.5 rounded-full',
            color === 'success' && 'bg-emerald-500',
            color === 'warning' && 'bg-amber-500',
            color === 'danger' && 'bg-red-500',
            color === 'info' && 'bg-blue-500',
            color === 'primary' && 'bg-olive-950 dark:bg-olive-100',
            color === 'secondary' && 'bg-olive-500',
            color === 'default' && 'bg-olive-400'
          )}
          aria-hidden="true"
        />
      )}
      {leftIcon}
      {children}
      {rightIcon}
      {removable && (
        <button
          type="button"
          onClick={onRemove}
          className={clsx(
            '-mr-0.5 ml-0.5 rounded-full p-0.5 transition-colors hover:bg-black/10 dark:hover:bg-white/10',
            'focus:outline-none focus-visible:ring-2 focus-visible:ring-olive-500'
          )}
          aria-label="Remove"
        >
          <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </span>
  )
}

// Convenience components for common use cases
export function StatusBadge({
  status,
  ...props
}: Omit<BadgeProps, 'color' | 'dot'> & {
  status: 'online' | 'offline' | 'away' | 'busy' | 'pending'
}) {
  const statusConfig = {
    online: { color: 'success' as const, label: '온라인' },
    offline: { color: 'default' as const, label: '오프라인' },
    away: { color: 'warning' as const, label: '자리비움' },
    busy: { color: 'danger' as const, label: '바쁨' },
    pending: { color: 'info' as const, label: '대기중' },
  }

  const config = statusConfig[status]

  return (
    <Badge dot color={config.color} {...props}>
      {props.children || config.label}
    </Badge>
  )
}

export function CountBadge({
  count,
  max = 99,
  ...props
}: Omit<BadgeProps, 'children'> & {
  count: number
  max?: number
}) {
  const displayCount = count > max ? `${max}+` : count.toString()

  return (
    <Badge size="xs" {...props}>
      {displayCount}
    </Badge>
  )
}
