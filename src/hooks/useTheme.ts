import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store'
import { setTheme, updateSystemTheme, type Theme } from '../store/slices/themeSlice'

/**
 * Hook for managing theme state
 */
export function useTheme() {
  const dispatch = useDispatch()
  const { theme, resolvedTheme } = useSelector((state: RootState) => state.theme)

  // Listen for system theme changes
  useEffect(() => {
    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

      const handleChange = () => {
        dispatch(updateSystemTheme())
      }

      mediaQuery.addEventListener('change', handleChange)
      return () => mediaQuery.removeEventListener('change', handleChange)
    }
  }, [theme, dispatch])

  const setThemeValue = (newTheme: Theme) => {
    dispatch(setTheme(newTheme))
  }

  const toggleTheme = () => {
    const newTheme: Theme = theme === 'light' ? 'dark' : 'light'
    dispatch(setTheme(newTheme))
  }

  return {
    theme,
    resolvedTheme,
    setTheme: setThemeValue,
    toggleTheme,
    isDark: resolvedTheme === 'dark',
    isLight: resolvedTheme === 'light',
  }
}
