'use client'

import { clsx } from 'clsx/lite'
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'

// Toast types
export type ToastType = 'success' | 'error' | 'warning' | 'info'
export type ToastPosition = 'top-right' | 'top-left' | 'top-center' | 'bottom-right' | 'bottom-left' | 'bottom-center'

export interface Toast {
  id: string
  type: ToastType
  title: string
  description?: string
  duration?: number
  action?: {
    label: string
    onClick: () => void
  }
}

interface ToastContextValue {
  toasts: Toast[]
  addToast: (toast: Omit<Toast, 'id'>) => string
  removeToast: (id: string) => void
  clearToasts: () => void
}

const ToastContext = createContext<ToastContextValue | null>(null)

// Toast Item Component
function ToastItem({
  toast,
  onRemove,
}: {
  toast: Toast
  onRemove: (id: string) => void
}) {
  const [isVisible, setIsVisible] = useState(false)
  const [isLeaving, setIsLeaving] = useState(false)

  useEffect(() => {
    // Trigger enter animation
    requestAnimationFrame(() => setIsVisible(true))

    // Auto dismiss
    const duration = toast.duration ?? 5000
    if (duration > 0) {
      const timer = setTimeout(() => {
        handleClose()
      }, duration)
      return () => clearTimeout(timer)
    }
  }, [toast.duration])

  const handleClose = useCallback(() => {
    setIsLeaving(true)
    setTimeout(() => onRemove(toast.id), 200)
  }, [onRemove, toast.id])

  const icons = {
    success: (
      <svg className="h-5 w-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
    ),
    error: (
      <svg className="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      </svg>
    ),
    warning: (
      <svg className="h-5 w-5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    ),
    info: (
      <svg className="h-5 w-5 text-linear-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  }

  const borderColors = {
    success: 'border-l-emerald-500',
    error: 'border-l-red-500',
    warning: 'border-l-amber-500',
    info: 'border-l-linear-purple',
  }

  return (
    <div
      role="alert"
      aria-live="polite"
      className={clsx(
        'pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg border-l-4 bg-white shadow-lg dark:bg-olive-900',
        'transition-all duration-200 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]',
        borderColors[toast.type],
        isVisible && !isLeaving ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
      )}
    >
      <div className="p-4">
        <div className="flex items-start gap-3">
          <div className="shrink-0">{icons[toast.type]}</div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-olive-950 dark:text-white">
              {toast.title}
            </p>
            {toast.description && (
              <p className="mt-1 text-sm text-olive-600 dark:text-olive-400">
                {toast.description}
              </p>
            )}
            {toast.action && (
              <button
                type="button"
                onClick={() => {
                  toast.action?.onClick()
                  handleClose()
                }}
                className="mt-2 text-sm font-medium text-linear-purple hover:text-linear-purple-light focus:outline-none focus-visible:ring-2 focus-visible:ring-linear-purple focus-visible:ring-offset-2 rounded"
              >
                {toast.action.label}
              </button>
            )}
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="shrink-0 rounded-lg p-1 text-olive-400 hover:bg-olive-100 hover:text-olive-600 dark:hover:bg-olive-800 dark:hover:text-olive-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-olive-500"
            aria-label="닫기"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

// Toast Container Component
function ToastContainer({
  position = 'top-right',
  children,
}: {
  position?: ToastPosition
  children: ReactNode
}) {
  const positionClasses = {
    'top-right': 'top-4 right-4',
    'top-left': 'top-4 left-4',
    'top-center': 'top-4 left-1/2 -translate-x-1/2',
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2',
  }

  return (
    <div
      className={clsx(
        'fixed z-50 flex flex-col gap-2 pointer-events-none',
        positionClasses[position]
      )}
      aria-label="알림"
    >
      {children}
    </div>
  )
}

// Toast Provider
export function ToastProvider({
  children,
  position = 'top-right',
  maxToasts = 5,
}: {
  children: ReactNode
  position?: ToastPosition
  maxToasts?: number
}) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const addToast = useCallback(
    (toast: Omit<Toast, 'id'>) => {
      const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
      setToasts((prev) => {
        const newToasts = [...prev, { ...toast, id }]
        // Limit max toasts
        if (newToasts.length > maxToasts) {
          return newToasts.slice(-maxToasts)
        }
        return newToasts
      })
      return id
    },
    [maxToasts]
  )

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }, [])

  const clearToasts = useCallback(() => {
    setToasts([])
  }, [])

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast, clearToasts }}>
      {children}
      <ToastContainer position={position}>
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} onRemove={removeToast} />
        ))}
      </ToastContainer>
    </ToastContext.Provider>
  )
}

// useToast Hook
export function useToast() {
  const context = useContext(ToastContext)

  if (!context) {
    throw new Error('useToast must be used within a ToastProvider')
  }

  const { addToast, removeToast, clearToasts } = context

  return {
    toast: addToast,
    dismiss: removeToast,
    dismissAll: clearToasts,
    // Convenience methods
    success: (title: string, options?: Omit<Toast, 'id' | 'type' | 'title'>) =>
      addToast({ type: 'success', title, ...options }),
    error: (title: string, options?: Omit<Toast, 'id' | 'type' | 'title'>) =>
      addToast({ type: 'error', title, ...options }),
    warning: (title: string, options?: Omit<Toast, 'id' | 'type' | 'title'>) =>
      addToast({ type: 'warning', title, ...options }),
    info: (title: string, options?: Omit<Toast, 'id' | 'type' | 'title'>) =>
      addToast({ type: 'info', title, ...options }),
  }
}

// Standalone toast function (for use outside React components)
let toastFn: ((toast: Omit<Toast, 'id'>) => string) | null = null

export function setToastFunction(fn: (toast: Omit<Toast, 'id'>) => string) {
  toastFn = fn
}

export const toast = {
  show: (options: Omit<Toast, 'id'>) => {
    if (!toastFn) {
      console.warn('Toast provider not initialized')
      return ''
    }
    return toastFn(options)
  },
  success: (title: string, options?: Omit<Toast, 'id' | 'type' | 'title'>) =>
    toast.show({ type: 'success', title, ...options }),
  error: (title: string, options?: Omit<Toast, 'id' | 'type' | 'title'>) =>
    toast.show({ type: 'error', title, ...options }),
  warning: (title: string, options?: Omit<Toast, 'id' | 'type' | 'title'>) =>
    toast.show({ type: 'warning', title, ...options }),
  info: (title: string, options?: Omit<Toast, 'id' | 'type' | 'title'>) =>
    toast.show({ type: 'info', title, ...options }),
}
