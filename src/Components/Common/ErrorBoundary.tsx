'use client';
import { Component, type ReactNode } from 'react'
import { Box, Typography, Button, Container } from '@mui/material'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import Logger from '../../utils/logger'

type Props = {
  children: ReactNode
}

type State = {
  hasError: boolean
  error: Error | null
  errorInfo: unknown
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    }
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: unknown): void {
    Logger.error('ErrorBoundary', 'Caught an error', error)
    this.setState({
      error,
      errorInfo,
    })
  }

  handleReset = (): void => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    })
    window.location.href = '/'
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <Container maxWidth="sm">
          <Box
            sx={{
              minHeight: '100vh',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 3,
              py: 4,
            }}
          >
            <ErrorOutlineIcon sx={{ fontSize: 80, color: 'error.main' }} />
            <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', textAlign: 'center', color: '#333' }}>
              Oops! Something went wrong
            </Typography>
            <Typography variant="body1" sx={{ textAlign: 'center', color: '#666', mb: 2 }}>
              We&apos;re sorry for the inconvenience. Please try refreshing the page or contact support if the problem persists.
            </Typography>
            {process.env.DEV && this.state.error && (
              <Box
                sx={{
                  width: '100%',
                  p: 2,
                  bgcolor: '#f5f5f5',
                  border: '1px solid #ddd',
                  borderRadius: 1,
                  mb: 2,
                  maxHeight: 200,
                  overflow: 'auto',
                  fontFamily: 'monospace',
                  fontSize: 12,
                  color: '#d32f2f',
                }}
              >
                <Typography variant="caption" component="div" sx={{ fontWeight: 'bold', mb: 1 }}>
                  Error Details:
                </Typography>
                <Typography variant="caption" component="div">
                  {this.state.error.toString()}
                </Typography>
              </Box>
            )}
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button variant="contained" color="primary" onClick={this.handleReset} sx={{ px: 4, py: 1.5, fontSize: '1rem', fontWeight: 'bold' }}>
                Go Home
              </Button>
              <Button variant="outlined" color="primary" onClick={() => window.location.reload()} sx={{ px: 4, py: 1.5, fontSize: '1rem', fontWeight: 'bold' }}>
                Refresh Page
              </Button>
            </Box>
          </Box>
        </Container>
      )
    }
    return this.props.children
  }
}

export default ErrorBoundary