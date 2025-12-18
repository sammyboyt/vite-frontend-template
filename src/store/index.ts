import { configureStore } from '@reduxjs/toolkit'
import uiSlice from './slices/uiSlice'
import themeSlice from './slices/themeSlice'
import notificationSlice from './slices/notificationSlice'

export const store = configureStore({
  reducer: {
    ui: uiSlice,
    theme: themeSlice,
    notifications: notificationSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
