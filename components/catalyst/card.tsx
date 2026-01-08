import { clsx } from 'clsx/lite'
import type { ComponentPropsWithoutRef, ReactNode } from 'react'

type CardProps = {
  variant?: 'default' | 'elevated' | 'outline' | 'filled'
  padding?: 'none' | 'sm' | 'md' | 'lg'
  hover?: boolean
} & ComponentPropsWithoutRef<'div'>

export function Card({
  variant = 'default',
  padding = 'md',
  hover = false,
  className,
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={clsx(
        'rounded-xl transition-all duration-200',
        variant === 'default' &&
          'border border-olive-200 bg-white dark:border-olive-800 dark:bg-olive-900',
        variant === 'elevated' &&
          'border border-olive-100 bg-white shadow-lg shadow-olive-900/5 dark:border-olive-800 dark:bg-olive-900 dark:shadow-black/20',
        variant === 'outline' &&
          'border border-olive-300 bg-transparent dark:border-olive-700',
        variant === 'filled' && 'bg-olive-50 dark:bg-olive-800/50',
        padding === 'none' && 'p-0',
        padding === 'sm' && 'p-4',
        padding === 'md' && 'p-6',
        padding === 'lg' && 'p-8',
        hover && 'hover:border-olive-300 hover:shadow-md dark:hover:border-olive-600',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

type CardHeaderProps = {
  title: ReactNode
  description?: ReactNode
  action?: ReactNode
} & ComponentPropsWithoutRef<'div'>

export function CardHeader({ title, description, action, className, ...props }: CardHeaderProps) {
  return (
    <div className={clsx('mb-4 flex items-start justify-between gap-4', className)} {...props}>
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-olive-950 dark:text-white">{title}</h3>
        {description && (
          <p className="mt-1 text-sm text-olive-600 dark:text-olive-400">{description}</p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  )
}

export function CardContent({ className, children, ...props }: ComponentPropsWithoutRef<'div'>) {
  return (
    <div className={clsx('text-olive-700 dark:text-olive-300', className)} {...props}>
      {children}
    </div>
  )
}

export function CardFooter({ className, children, ...props }: ComponentPropsWithoutRef<'div'>) {
  return (
    <div
      className={clsx(
        'mt-4 flex items-center gap-3 border-t border-olive-200 pt-4 dark:border-olive-700',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

// Stats Card for dashboard
type StatsCardProps = {
  title: string
  value: string | number
  change?: {
    value: number
    trend: 'up' | 'down' | 'neutral'
  }
  icon?: ReactNode
} & Omit<CardProps, 'children'>

export function StatsCard({ title, value, change, icon, ...props }: StatsCardProps) {
  return (
    <Card {...props}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-olive-600 dark:text-olive-400">{title}</p>
          <p className="mt-2 text-3xl font-bold text-olive-950 dark:text-white">{value}</p>
          {change && (
            <p
              className={clsx(
                'mt-1 text-sm font-medium',
                change.trend === 'up' && 'text-emerald-600 dark:text-emerald-400',
                change.trend === 'down' && 'text-red-600 dark:text-red-400',
                change.trend === 'neutral' && 'text-olive-600 dark:text-olive-400'
              )}
            >
              {change.trend === 'up' && '↑ '}
              {change.trend === 'down' && '↓ '}
              {change.value > 0 ? '+' : ''}
              {change.value}%
            </p>
          )}
        </div>
        {icon && (
          <div className="rounded-lg bg-olive-100 p-3 text-olive-600 dark:bg-olive-800 dark:text-olive-400">
            {icon}
          </div>
        )}
      </div>
    </Card>
  )
}

// List Card for dashboard
type ListCardProps = {
  title: string
  items: Array<{
    id: string | number
    label: string
    value?: string | number
    badge?: ReactNode
  }>
  emptyMessage?: string
} & Omit<CardProps, 'children'>

export function ListCard({
  title,
  items,
  emptyMessage = '항목이 없습니다.',
  ...props
}: ListCardProps) {
  return (
    <Card {...props}>
      <CardHeader title={title} />
      {items.length === 0 ? (
        <p className="py-4 text-center text-sm text-olive-500 dark:text-olive-400">
          {emptyMessage}
        </p>
      ) : (
        <ul className="divide-y divide-olive-100 dark:divide-olive-800">
          {items.map((item) => (
            <li
              key={item.id}
              className="flex items-center justify-between py-3 first:pt-0 last:pb-0"
            >
              <span className="text-sm text-olive-700 dark:text-olive-300">{item.label}</span>
              <div className="flex items-center gap-2">
                {item.value !== undefined && (
                  <span className="text-sm font-medium text-olive-950 dark:text-white">
                    {item.value}
                  </span>
                )}
                {item.badge}
              </div>
            </li>
          ))}
        </ul>
      )}
    </Card>
  )
}
