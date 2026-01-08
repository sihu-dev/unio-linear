'use client'

import { clsx } from 'clsx/lite'
import { forwardRef, type ComponentPropsWithoutRef, type ReactNode } from 'react'

const variants = {
  solid: {
    primary:
      'bg-olive-950 text-white hover:bg-olive-800 dark:bg-olive-100 dark:text-olive-950 dark:hover:bg-white',
    secondary:
      'bg-olive-100 text-olive-950 hover:bg-olive-200 dark:bg-olive-800 dark:text-white dark:hover:bg-olive-700',
    danger: 'bg-red-600 text-white hover:bg-red-500 dark:bg-red-500 dark:hover:bg-red-400',
    success:
      'bg-emerald-600 text-white hover:bg-emerald-500 dark:bg-emerald-500 dark:hover:bg-emerald-400',
    purple:
      'bg-linear-purple text-white hover:bg-linear-purple-light dark:bg-linear-purple dark:hover:bg-linear-purple-light',
  },
  outline: {
    primary:
      'border border-olive-300 text-olive-950 hover:bg-olive-50 dark:border-olive-700 dark:text-white dark:hover:bg-olive-800',
    secondary:
      'border border-olive-200 text-olive-600 hover:bg-olive-50 dark:border-olive-800 dark:text-olive-400 dark:hover:bg-olive-900',
    danger:
      'border border-red-300 text-red-600 hover:bg-red-50 dark:border-red-700 dark:text-red-400 dark:hover:bg-red-950',
    success:
      'border border-emerald-300 text-emerald-600 hover:bg-emerald-50 dark:border-emerald-700 dark:text-emerald-400 dark:hover:bg-emerald-950',
    purple:
      'border border-linear-purple text-linear-purple hover:bg-linear-purple/10 dark:border-linear-purple dark:text-linear-purple-light dark:hover:bg-linear-purple/10',
  },
  ghost: {
    primary: 'text-olive-950 hover:bg-olive-100 dark:text-white dark:hover:bg-olive-800',
    secondary: 'text-olive-600 hover:bg-olive-100 dark:text-olive-400 dark:hover:bg-olive-800',
    danger: 'text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950',
    success: 'text-emerald-600 hover:bg-emerald-50 dark:text-emerald-400 dark:hover:bg-emerald-950',
    purple: 'text-linear-purple hover:bg-linear-purple/10 dark:text-linear-purple-light dark:hover:bg-linear-purple/10',
  },
}

const sizes = {
  xs: 'px-2 py-1 text-xs',
  sm: 'px-2.5 py-1.5 text-sm',
  md: 'px-3 py-2 text-sm',
  lg: 'px-4 py-2.5 text-base',
  xl: 'px-5 py-3 text-base',
}

type ButtonProps = {
  variant?: keyof typeof variants
  color?: keyof (typeof variants)['solid']
  size?: keyof typeof sizes
  loading?: boolean
  leftIcon?: ReactNode
  rightIcon?: ReactNode
} & ComponentPropsWithoutRef<'button'>

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = 'solid',
    color = 'primary',
    size = 'md',
    loading = false,
    leftIcon,
    rightIcon,
    disabled,
    className,
    children,
    ...props
  },
  ref
) {
  const isDisabled = disabled || loading

  return (
    <button
      ref={ref}
      disabled={isDisabled}
      className={clsx(
        'inline-flex items-center justify-center gap-2 rounded-lg font-medium',
        'transition-all duration-200 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-olive-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-olive-950',
        'disabled:cursor-not-allowed disabled:opacity-50',
        'active:scale-[0.98]',
        variants[variant][color],
        sizes[size],
        className
      )}
      {...props}
    >
      {loading ? (
        <svg
          className="h-4 w-4 animate-spin"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          />
        </svg>
      ) : (
        leftIcon
      )}
      {children}
      {!loading && rightIcon}
    </button>
  )
})

type ButtonLinkProps = {
  variant?: keyof typeof variants
  color?: keyof (typeof variants)['solid']
  size?: keyof typeof sizes
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  href: string
} & Omit<ComponentPropsWithoutRef<'a'>, 'href'>

export const ButtonLink = forwardRef<HTMLAnchorElement, ButtonLinkProps>(function ButtonLink(
  {
    variant = 'solid',
    color = 'primary',
    size = 'md',
    leftIcon,
    rightIcon,
    className,
    children,
    href,
    ...props
  },
  ref
) {
  return (
    <a
      ref={ref}
      href={href}
      className={clsx(
        'inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-200',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-olive-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-olive-950',
        'hover:scale-[1.02] active:scale-[0.98]',
        variants[variant][color],
        sizes[size],
        className
      )}
      {...props}
    >
      {leftIcon}
      {children}
      {rightIcon}
    </a>
  )
})

export const IconButton = forwardRef<HTMLButtonElement, Omit<ButtonProps, 'leftIcon' | 'rightIcon'>>(
  function IconButton({ size = 'md', className, children, ...props }, ref) {
    const iconSizes = {
      xs: 'p-1',
      sm: 'p-1.5',
      md: 'p-2',
      lg: 'p-2.5',
      xl: 'p-3',
    }

    return (
      <Button
        ref={ref}
        size={size}
        className={clsx(iconSizes[size], 'aspect-square', className)}
        {...props}
      >
        {children}
      </Button>
    )
  }
)
