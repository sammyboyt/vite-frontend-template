import { createSlice, PayloadAction, nanoid } from '@reduxjs/toolkit'

export type NotificationType = 'success' | 'error' | 'warning' | 'info'

export interface Notification {
  id: string
  type: NotificationType
  title: string
  message?: string
  duration?: number
  action?: {
    label: string
    onClick: () => void
  }
}

interface NotificationState {
  notifications: Notification[]
}

const initialState: NotificationState = {
  notifications: [],
}

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    addNotification: {
      reducer: (state, action: PayloadAction<Notification>) => {
        state.notifications.push(action.payload)
      },
      prepare: (notification: Omit<Notification, 'id'>) => ({
        payload: {
          ...notification,
          id: nanoid(),
        },
      }),
    },
    removeNotification: (state, action: PayloadAction<string>) => {
      state.notifications = state.notifications.filter(
        (notification) => notification.id !== action.payload
      )
    },
    clearAllNotifications: (state) => {
      state.notifications = []
    },
  },
})

export const { addNotification, removeNotification, clearAllNotifications } =
  notificationSlice.actions

export default notificationSlice.reducer
