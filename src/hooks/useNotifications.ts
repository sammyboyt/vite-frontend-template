import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store'
import {
  addNotification,
  removeNotification,
  clearAllNotifications,
  type Notification,
  type NotificationType,
} from '../store/slices/notificationSlice'

/**
 * Hook for managing notifications/toasts
 */
export function useNotifications() {
  const dispatch = useDispatch()
  const notifications = useSelector((state: RootState) => state.notifications.notifications)

  const showNotification = useCallback(
    (notification: Omit<Notification, 'id'>) => {
      dispatch(addNotification(notification))
    },
    [dispatch]
  )

  const success = useCallback(
    (title: string, message?: string, duration?: number) => {
      dispatch(
        addNotification({
          type: 'success',
          title,
          message,
          duration,
        })
      )
    },
    [dispatch]
  )

  const error = useCallback(
    (title: string, message?: string, duration?: number) => {
      dispatch(
        addNotification({
          type: 'error',
          title,
          message,
          duration,
        })
      )
    },
    [dispatch]
  )

  const warning = useCallback(
    (title: string, message?: string, duration?: number) => {
      dispatch(
        addNotification({
          type: 'warning',
          title,
          message,
          duration,
        })
      )
    },
    [dispatch]
  )

  const info = useCallback(
    (title: string, message?: string, duration?: number) => {
      dispatch(
        addNotification({
          type: 'info',
          title,
          message,
          duration,
        })
      )
    },
    [dispatch]
  )

  const remove = useCallback(
    (id: string) => {
      dispatch(removeNotification(id))
    },
    [dispatch]
  )

  const clearAll = useCallback(() => {
    dispatch(clearAllNotifications())
  }, [dispatch])

  return {
    notifications,
    showNotification,
    success,
    error,
    warning,
    info,
    remove,
    clearAll,
  }
}
