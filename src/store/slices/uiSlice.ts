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
