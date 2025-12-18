import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store'
import { openModal, closeModal, closeAllModals } from '../store/slices/uiSlice'

/**
 * Hook for managing modals with Redux state
 */
export function useModal(modalId: string) {
  const dispatch = useDispatch()
  const modal = useSelector((state: RootState) => state.ui.modals[modalId])

  const isOpen = modal?.isOpen ?? false
  const data = modal?.modalData

  const open = useCallback(
    (data?: Record<string, unknown>) => {
      dispatch(openModal({ modalId, data }))
    },
    [dispatch, modalId]
  )

  const close = useCallback(() => {
    dispatch(closeModal(modalId))
  }, [dispatch, modalId])

  return {
    isOpen,
    data,
    open,
    close,
  }
}

/**
 * Hook for managing all modals globally
 */
export function useModalManager() {
  const dispatch = useDispatch()

  const closeAll = useCallback(() => {
    dispatch(closeAllModals())
  }, [dispatch])

  return {
    closeAll,
  }
}
