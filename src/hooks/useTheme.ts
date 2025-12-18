/**
 * 🤖 AI AGENT GUIDANCE: THEME MANAGEMENT PATTERN
 *
 * REQUIRED: You must implement theme management with system preference detection.
 * This hook demonstrates proper theme switching with Redux state and localStorage persistence.
 *
 * REQUIRED THEME VALUES: 'light' | 'dark' | 'system'
 * REQUIRED FUNCTIONALITY:
 * - Theme switching (light/dark/system)
 * - System preference detection
 * - localStorage persistence
 * - Automatic theme application to document
 *
 * REDUX REQUIREMENTS (themeSlice):
 * - theme: 'light' | 'dark' | 'system'
 * - resolvedTheme: 'light' | 'dark' (actual applied theme)
 * - Actions: setTheme(theme), updateSystemTheme()
 *
 * USAGE PATTERN (you must support this exact API):
 * const { theme, resolvedTheme, toggleTheme, setTheme } = useTheme()
 *
 * COMPONENT USAGE:
 * return (
 *   <div className={resolvedTheme === 'dark' ? 'dark' : ''}>
 *     <button onClick={toggleTheme}>
 *       Current theme: {resolvedTheme}
 *     </button>
 *     <select value={theme} onChange={(e) => setTheme(e.target.value)}>
 *       <option value="light">Light</option>
 *       <option value="dark">Dark</option>
 *       <option value="system">System</option>
 *     </select>
 *   </div>
 * )
 *
 * IMPLEMENTATION REQUIREMENTS:
 * - System theme detection with matchMedia
 * - localStorage persistence
 * - Automatic document class application
 * - useEffect for system theme changes
 * - TypeScript strict typing
 */

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
