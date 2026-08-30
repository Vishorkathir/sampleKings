import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import './globals.css'
import App from './App'
import ErrorBoundary from './components/ErrorBoundary'
import ThemeContextProvider from './config/ThemeContext'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <StrictMode>
      <ErrorBoundary>
        <ThemeContextProvider>
          <App />
        </ThemeContextProvider>
      </ErrorBoundary>
    </StrictMode>
  </BrowserRouter>,
)
