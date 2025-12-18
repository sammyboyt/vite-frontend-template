/**
 * 🤖 AI AGENT GUIDANCE: UI STATE MANAGEMENT WITH REDUX TOOLKIT
 *
 * REQUIRED: You must implement a uiSlice with this exact structure and actions.
 * This demonstrates proper Redux Toolkit patterns for global UI state management.
 *
 * REQUIRED STATE STRUCTURE:
 * - modals: Record<string, { isOpen: boolean, modalId: string, modalData?: any }>
 * - sidebar: { isOpen: boolean }
 * - loading: { global: boolean, operations: Record<string, boolean> }
 *
 * REQUIRED ACTIONS (you must implement all of these):
 * - openModal({ modalId, data? }) - Open modal with optional data
 * - closeModal(modalId) - Close specific modal
 * - closeAllModals() - Close all modals (for navigation, etc.)
 * - toggleSidebar() - Toggle sidebar visibility
 * - setSidebar(boolean) - Set sidebar state explicitly
 * - setGlobalLoading(boolean) - Global loading spinner
 * - setOperationLoading({ operation, loading }) - Operation-specific loading
 *
 * REDUX STORE INTEGRATION:
 * import uiReducer from './slices/uiSlice'
 * const store = configureStore({
 *   reducer: {
 *     ui: uiReducer,
 *     // other reducers...
 *   }
 * })
 *
 * USAGE IN COMPONENTS:
 * const { isOpen, open, close } = useModal('settings') // uses this slice
 * const sidebarOpen = useSelector(state => state.ui.sidebar.isOpen)
 * const isLoading = useSelector(state => state.ui.loading.global)
 *
 * IMPLEMENTATION REQUIREMENTS:
 * - Strict TypeScript interfaces
 * - Proper action payload typing with PayloadAction<T>
 * - Immutable state updates (Redux Toolkit handles this)
 * - Consistent naming conventions
 */

import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ModalState {
  isOpen: boolean
  modalId: string | null
  modalData?: Record<string, unknown>
}

interface UiState {
  modals: Record<string, ModalState>
  sidebar: {
    isOpen: boolean
  }
  loading: {
    global: boolean
    operations: Record<string, boolean>
  }
}

const initialState: UiState = {
  modals: {},
  sidebar: {
    isOpen: false,
  },
  loading: {
    global: false,
    operations: {},
  },
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    openModal: (
      state,
      action: PayloadAction<{
        modalId: string
        data?: Record<string, unknown>
      }>
    ) => {
      const { modalId, data } = action.payload
      state.modals[modalId] = {
        isOpen: true,
        modalId,
        modalData: data,
      }
    },
    closeModal: (state, action: PayloadAction<string>) => {
      const modalId = action.payload
      if (state.modals[modalId]) {
        state.modals[modalId].isOpen = false
      }
    },
    closeAllModals: (state) => {
      Object.keys(state.modals).forEach((modalId) => {
        state.modals[modalId].isOpen = false
      })
    },
    toggleSidebar: (state) => {
      state.sidebar.isOpen = !state.sidebar.isOpen
    },
    setSidebar: (state, action: PayloadAction<boolean>) => {
      state.sidebar.isOpen = action.payload
    },
    setGlobalLoading: (state, action: PayloadAction<boolean>) => {
      state.loading.global = action.payload
    },
    setOperationLoading: (
      state,
      action: PayloadAction<{ operation: string; loading: boolean }>
    ) => {
      const { operation, loading } = action.payload
      state.loading.operations[operation] = loading
    },
  },
})

export const {
  openModal,
  closeModal,
  closeAllModals,
  toggleSidebar,
  setSidebar,
  setGlobalLoading,
  setOperationLoading,
} = uiSlice.actions

export default uiSlice.reducer
