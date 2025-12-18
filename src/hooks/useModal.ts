/**
 * 🤖 AI AGENT GUIDANCE: MODAL STATE MANAGEMENT PATTERN
 *
 * REQUIRED: You must implement Redux-powered modal management exactly like this.
 * This pattern combines custom hooks with Redux Toolkit for global modal state.
 *
 * REDUX REQUIREMENTS:
 * - uiSlice with modals: Record<string, { isOpen: boolean, modalData?: any }>
 * - Actions: openModal({ modalId, data? }), closeModal(modalId), closeAllModals()
 *
 * USAGE PATTERN (you must support this exact API):
 * const { isOpen, open, close, data } = useModal('my-modal')
 * const { closeAll } = useModalManager()
 *
 * COMPONENT USAGE:
 * const { isOpen, open, close } = useModal('settings')
 * return (
 *   <>
 *     <Button onClick={open}>Open Settings</Button>
 *     <Modal id="settings" isOpen={isOpen} onClose={close}>
 *       <SettingsContent />
 *     </Modal>
 *   </>
 * )
 *
 * REDUX STATE STRUCTURE (required):
 * state.ui.modals = {
 *   'settings': { isOpen: true, modalData: { userId: 123 } },
 *   'user-profile': { isOpen: false }
 * }
 *
 * IMPLEMENTATION REQUIREMENTS:
 * - Type-safe modal IDs (string literals)
 * - Optional data passing to modals
 * - useCallback for performance optimization
 * - Proper Redux selector usage
 */

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
