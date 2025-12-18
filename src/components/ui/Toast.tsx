import React, { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from 'lucide-react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../store'
import { removeNotification, type NotificationType } from '../../store/slices/notificationSlice'
import { cn } from '../../utils/cn'

interface ToastProps {
  id: string
  type: NotificationType
  title: string
  message?: string
  duration?: number
  action?: {
    label: string
    onClick: () => void
  }
  onClose: (id: string) => void
}

const Toast: React.FC<ToastProps> = ({
  id,
  type,
  title,
  message,
  duration = 5000,
  action,
  onClose
}) => {
  const dispatch = useDispatch()

  // Auto-remove toast after duration
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        onClose(id)
      }, duration)

      return () => clearTimeout(timer)
    }
  }, [id, duration, onClose])

  const handleClose = () => {
    onClose(id)
  }

  const icons = {
    success: CheckCircle,
    error: AlertCircle,
    warning: AlertTriangle,
    info: Info,
  }

  const colors = {
    success: 'bg-green-50 border-green-200 text-green-800',
    error: 'bg-red-50 border-red-200 text-red-800',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    info: 'bg-blue-50 border-blue-200 text-blue-800',
  }

  const iconColors = {
    success: 'text-green-600',
    error: 'text-red-600',
    warning: 'text-yellow-600',
    info: 'text-blue-600',
  }

  const Icon = icons[type]

  return (
    <div
      className={cn(
        'flex items-start p-4 rounded-lg border shadow-lg max-w-sm w-full animate-in slide-in-from-right duration-300',
        colors[type]
      )}
      role="alert"
    >
      <Icon className={cn('w-5 h-5 mr-3 mt-0.5 flex-shrink-0', iconColors[type])} />
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-semibold">{title}</h4>
        {message && (
          <p className="text-sm mt-1 opacity-90">{message}</p>
        )}
        {action && (
          <button
            onClick={action.onClick}
            className="text-sm font-medium underline mt-2 hover:opacity-75"
          >
            {action.label}
          </button>
        )}
      </div>
      <button
        onClick={handleClose}
        className="ml-3 flex-shrink-0 p-1 rounded hover:bg-black/10 transition-colors"
        aria-label="Close notification"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  )
}

interface ToastContainerProps {
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center'
}

export const ToastContainer: React.FC<ToastContainerProps> = ({
  position = 'top-right'
}) => {
  const notifications = useSelector((state: RootState) => state.notifications.notifications)
  const dispatch = useDispatch()

  const handleClose = (id: string) => {
    dispatch(removeNotification(id))
  }

  const positionClasses = {
    'top-right': 'top-4 right-4',
    'top-left': 'top-4 left-4',
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'top-center': 'top-4 left-1/2 transform -translate-x-1/2',
  }

  if (notifications.length === 0) return null

  const container = (
    <div
      className={cn(
        'fixed z-50 pointer-events-none',
        positionClasses[position]
      )}
    >
      <div className="flex flex-col space-y-2 pointer-events-auto">
        {notifications.map((notification) => (
          <Toast
            key={notification.id}
            {...notification}
            onClose={handleClose}
          />
        ))}
      </div>
    </div>
  )

  if (typeof document !== 'undefined') {
    return createPortal(container, document.body)
  }

  return null
}

// Hook for showing toasts (convenience wrapper)
export const useToast = () => {
  const dispatch = useDispatch()

  const toast = React.useCallback(
    (type: NotificationType, title: string, message?: string, duration?: number) => {
      dispatch(addNotification({
        type,
        title,
        message,
        duration,
      }))
    },
    [dispatch]
  )

  return {
    success: (title: string, message?: string, duration?: number) =>
      toast('success', title, message, duration),
    error: (title: string, message?: string, duration?: number) =>
      toast('error', title, message, duration),
    warning: (title: string, message?: string, duration?: number) =>
      toast('warning', title, message, duration),
    info: (title: string, message?: string, duration?: number) =>
      toast('info', title, message, duration),
  }
}

// Import here to avoid circular dependency
import { addNotification } from '../../store/slices/notificationSlice'
