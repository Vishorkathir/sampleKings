import React, { createContext, useContext, useState, useEffect } from 'react'
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material'

type ThemeContextValue = { isDarkMode: boolean; toggleTheme: () => void }
const ThemeContext = createContext<ThemeContextValue | undefined>(undefined)
export function useThemeMode(): ThemeContextValue {
  const context = useContext(ThemeContext)
  if (!context) throw new Error('useThemeMode must be used within ThemeContextProvider')
  return context
}
export default function ThemeContextProvider({ children }: { children: React.ReactNode }) {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('cricket_academy_theme_mode')
    if (saved) try { return JSON.parse(saved) as boolean } catch { return false }
    return false
  })
  useEffect(() => { localStorage.setItem('cricket_academy_theme_mode', JSON.stringify(isDarkMode)) }, [isDarkMode])
  const toggleTheme = () => setIsDarkMode((p) => !p)
  const theme = createTheme({
    palette: {
      mode: isDarkMode ? 'dark' : 'light',
      primary: { main: 'oklch(0.52 0.20 260)', light: 'oklch(0.60 0.18 260)', dark: 'oklch(0.42 0.19 260)' },
      secondary: { main: 'oklch(0.84 0.18 158)' },
      background: { default: isDarkMode ? 'oklch(0.14 0.02 260)' : 'oklch(0.985 0.01 255)', paper: isDarkMode ? 'oklch(0.19 0.02 260)' : 'oklch(1 0 0)' },
      text: { primary: isDarkMode ? 'oklch(0.97 0.01 260)' : 'oklch(0.16 0.02 260)', secondary: isDarkMode ? 'oklch(0.78 0.02 260)' : 'oklch(0.56 0.03 260)' },
      divider: 'oklch(0.92 0.02 260)',
    },
    shape: { borderRadius: 12 },
    typography: {
      fontFamily: '"Manrope", system-ui, sans-serif',
      h1: { fontFamily: '"Bricolage Grotesque", system-ui, sans-serif', letterSpacing: '-0.02em', fontWeight: 800 },
      h2: { fontFamily: '"Bricolage Grotesque", system-ui, sans-serif', letterSpacing: '-0.02em', fontWeight: 800 },
      button: { textTransform: 'none' as const, fontWeight: 700 },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: { borderRadius: 10, boxShadow: 'none', fontWeight: 700, letterSpacing: '-0.01em', textTransform: 'none' as const },
          contained: { ':hover': { boxShadow: 'none' } },
        },
      },
      MuiPaper: { styleOverrides: { root: { backgroundImage: 'none' } } },
      MuiChip: { styleOverrides: { root: { fontWeight: 700 } } },
      MuiCssBaseline: { styleOverrides: { body: { backgroundColor: isDarkMode ? 'oklch(0.14 0.02 260)' : 'oklch(0.985 0.01 255)' } } },
    },
  })
  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  )
}
