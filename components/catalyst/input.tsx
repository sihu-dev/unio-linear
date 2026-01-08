'use client'

import { clsx } from 'clsx/lite'
import { forwardRef, useState, type ComponentPropsWithoutRef, type ReactNode } from 'react'

const sizes = {
  sm: 'px-2.5 py-1.5 text-sm',
  md: 'px-3 py-2 text-sm',
  lg: 'px-4 py-2.5 text-base',
}

type InputProps = {
  size?: keyof typeof sizes
  error?: boolean
  errorMessage?: string
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  leftAddon?: ReactNode
  rightAddon?: ReactNode
} & Omit<ComponentPropsWithoutRef<'input'>, 'size'>

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    size = 'md',
    error = false,
    errorMessage,
    leftIcon,
    rightIcon,
    leftAddon,
    rightAddon,
    className,
    disabled,
    id,
    ...props
  },
  ref
) {
  const errorId = errorMessage && id ? `${id}-error` : undefined

  return (
    <div className="w-full">
      <div className="relative flex">
        {leftAddon && (
          <span className="inline-flex items-center rounded-l-lg border border-r-0 border-olive-300 bg-olive-50 px-3 text-sm text-olive-600 dark:border-olive-700 dark:bg-olive-800 dark:text-olive-400">
            {leftAddon}
          </span>
        )}
        <div className="relative flex-1">
          {leftIcon && (
            <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-olive-400 dark:text-olive-500">
              {leftIcon}
            </span>
          )}
          <input
            ref={ref}
            id={id}
            disabled={disabled}
            aria-invalid={error}
            aria-describedby={errorId}
            className={clsx(
              'w-full transition-all duration-200',
              'bg-white text-olive-950 placeholder-olive-400',
              'dark:bg-olive-900 dark:text-white dark:placeholder-olive-500',
              'border border-olive-300 dark:border-olive-700',
              'focus:outline-none focus:ring-2 focus:ring-olive-500 focus:border-transparent',
              'dark:focus:ring-olive-400',
              'disabled:cursor-not-allowed disabled:bg-olive-50 disabled:text-olive-500',
              'dark:disabled:bg-olive-800 dark:disabled:text-olive-600',
              error && 'border-red-500 focus:ring-red-500 dark:border-red-500 dark:focus:ring-red-400',
              leftAddon ? 'rounded-l-none' : 'rounded-l-lg',
              rightAddon ? 'rounded-r-none' : 'rounded-r-lg',
              leftIcon && 'pl-10',
              rightIcon && 'pr-10',
              sizes[size],
              className
            )}
            {...props}
          />
          {rightIcon && (
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-olive-400 dark:text-olive-500">
              {rightIcon}
            </span>
          )}
        </div>
        {rightAddon && (
          <span className="inline-flex items-center rounded-r-lg border border-l-0 border-olive-300 bg-olive-50 px-3 text-sm text-olive-600 dark:border-olive-700 dark:bg-olive-800 dark:text-olive-400">
            {rightAddon}
          </span>
        )}
      </div>
      {errorMessage && (
        <p id={errorId} className="mt-1.5 text-sm text-red-600 dark:text-red-400" role="alert">
          {errorMessage}
        </p>
      )}
    </div>
  )
})

type TextareaProps = {
  size?: keyof typeof sizes
  error?: boolean
  errorMessage?: string
} & Omit<ComponentPropsWithoutRef<'textarea'>, 'size'>

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { size = 'md', error = false, errorMessage, className, disabled, id, ...props },
  ref
) {
  const errorId = errorMessage && id ? `${id}-error` : undefined

  return (
    <div className="w-full">
      <textarea
        ref={ref}
        id={id}
        disabled={disabled}
        aria-invalid={error}
        aria-describedby={errorId}
        className={clsx(
          'w-full min-h-[100px] resize-y transition-all duration-200',
          'bg-white text-olive-950 placeholder-olive-400',
          'dark:bg-olive-900 dark:text-white dark:placeholder-olive-500',
          'border border-olive-300 rounded-lg dark:border-olive-700',
          'focus:outline-none focus:ring-2 focus:ring-olive-500 focus:border-transparent',
          'dark:focus:ring-olive-400',
          'disabled:cursor-not-allowed disabled:bg-olive-50 disabled:text-olive-500',
          'dark:disabled:bg-olive-800 dark:disabled:text-olive-600',
          error && 'border-red-500 focus:ring-red-500 dark:border-red-500 dark:focus:ring-red-400',
          sizes[size],
          className
        )}
        {...props}
      />
      {errorMessage && (
        <p id={errorId} className="mt-1.5 text-sm text-red-600 dark:text-red-400" role="alert">
          {errorMessage}
        </p>
      )}
    </div>
  )
})

type SelectProps = {
  size?: keyof typeof sizes
  error?: boolean
  errorMessage?: string
  leftIcon?: ReactNode
} & Omit<ComponentPropsWithoutRef<'select'>, 'size'>

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { size = 'md', error = false, errorMessage, leftIcon, className, disabled, id, children, ...props },
  ref
) {
  const errorId = errorMessage && id ? `${id}-error` : undefined

  return (
    <div className="w-full">
      <div className="relative">
        {leftIcon && (
          <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-olive-400 dark:text-olive-500">
            {leftIcon}
          </span>
        )}
        <select
          ref={ref}
          id={id}
          disabled={disabled}
          aria-invalid={error}
          aria-describedby={errorId}
          className={clsx(
            'w-full appearance-none transition-all duration-200',
            'bg-white text-olive-950',
            'dark:bg-olive-900 dark:text-white',
            'border border-olive-300 rounded-lg dark:border-olive-700',
            'focus:outline-none focus:ring-2 focus:ring-olive-500 focus:border-transparent',
            'dark:focus:ring-olive-400',
            'disabled:cursor-not-allowed disabled:bg-olive-50 disabled:text-olive-500',
            'dark:disabled:bg-olive-800 dark:disabled:text-olive-600',
            error && 'border-red-500 focus:ring-red-500 dark:border-red-500 dark:focus:ring-red-400',
            leftIcon && 'pl-10',
            'pr-10',
            sizes[size],
            className
          )}
          {...props}
        >
          {children}
        </select>
        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-olive-400 dark:text-olive-500">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </div>
      {errorMessage && (
        <p id={errorId} className="mt-1.5 text-sm text-red-600 dark:text-red-400" role="alert">
          {errorMessage}
        </p>
      )}
    </div>
  )
})

type CheckboxProps = {
  label?: ReactNode
  description?: string
} & Omit<ComponentPropsWithoutRef<'input'>, 'type'>

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  { label, description, className, disabled, id, ...props },
  ref
) {
  return (
    <div className="flex items-start gap-3">
      <input
        ref={ref}
        type="checkbox"
        id={id}
        disabled={disabled}
        className={clsx(
          'h-4 w-4 rounded border-olive-300 text-olive-950 transition-colors',
          'focus:ring-2 focus:ring-olive-500 focus:ring-offset-2',
          'dark:border-olive-600 dark:bg-olive-900 dark:focus:ring-offset-olive-950',
          'disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        {...props}
      />
      {(label || description) && (
        <div className="flex flex-col">
          {label && (
            <label
              htmlFor={id}
              className={clsx(
                'text-sm font-medium text-olive-900 dark:text-white',
                disabled && 'cursor-not-allowed opacity-50'
              )}
            >
              {label}
            </label>
          )}
          {description && (
            <p className="text-sm text-olive-500 dark:text-olive-400">{description}</p>
          )}
        </div>
      )}
    </div>
  )
})

type SearchInputProps = {
  onSearch?: (value: string) => void
  loading?: boolean
} & Omit<InputProps, 'leftIcon' | 'type'>

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(function SearchInput(
  { onSearch, loading = false, ...props },
  ref
) {
  const [value, setValue] = useState('')

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && onSearch) {
      onSearch(value)
    }
  }

  return (
    <Input
      ref={ref}
      type="search"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onKeyDown={handleKeyDown}
      leftIcon={
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      }
      rightIcon={
        loading ? (
          <svg className="h-5 w-5 animate-spin" fill="none" viewBox="0 0 24 24">
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
        ) : undefined
      }
      {...props}
    />
  )
})
