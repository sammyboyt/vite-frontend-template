import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type Theme = 'light' | 'dark' | 'system'

interface ThemeState {
  theme: Theme
  resolvedTheme: 'light' | 'dark'
}

const getSystemTheme = (): 'light' | 'dark' => {
  if (typeof window !== 'undefined') {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }
  return 'light'
}

const getInitialTheme = (): Theme => {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('theme') as Theme
    if (stored && ['light', 'dark', 'system'].includes(stored)) {
      return stored
    }
  }
  return 'system'
}

const initialState: ThemeState = {
  theme: getInitialTheme(),
  resolvedTheme: getSystemTheme(),
}

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<Theme>) => {
      state.theme = action.payload
      state.resolvedTheme = action.payload === 'system' ? getSystemTheme() : action.payload

      if (typeof window !== 'undefined') {
        localStorage.setItem('theme', action.payload)
        document.documentElement.classList.toggle('dark', state.resolvedTheme === 'dark')
      }
    },
    updateSystemTheme: (state) => {
      if (state.theme === 'system') {
        state.resolvedTheme = getSystemTheme()
        if (typeof window !== 'undefined') {
          document.documentElement.classList.toggle('dark', state.resolvedTheme === 'dark')
        }
      }
    },
  },
})

export const { setTheme, updateSystemTheme } = themeSlice.actions

export default themeSlice.reducer
