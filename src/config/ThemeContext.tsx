'use client';
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
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('cricket_academy_theme_mode')
      if (saved) try { return JSON.parse(saved) as boolean } catch { return false }
    }
    return false
  })
  useEffect(() => { localStorage.setItem('cricket_academy_theme_mode', JSON.stringify(isDarkMode)) }, [isDarkMode])
  const toggleTheme = () => setIsDarkMode((p) => !p)
  const theme = createTheme({
    palette: {
      mode: isDarkMode ? 'dark' : 'light',
      primary: { main: '#1d4ed8', light: '#3b82f6', dark: '#0b5aa0' },
      secondary: { main: '#10b981' },
      background: { default: isDarkMode ? '#0f172a' : '#f8fafc', paper: isDarkMode ? '#1e293b' : '#ffffff' },
      text: { primary: isDarkMode ? '#f1f5f9' : '#0f172a', secondary: isDarkMode ? '#cbd5e1' : '#475569' },
      divider: isDarkMode ? '#334155' : '#e2e8f0',
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
      MuiCssBaseline: { styleOverrides: { body: { backgroundColor: isDarkMode ? '#0f172a' : '#f8fafc' } } },
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