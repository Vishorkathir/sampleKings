'use client';
type LogLevel = 'error' | 'warn' | 'info' | 'debug'

const LOG_LEVELS: Record<string, LogLevel> = {
  ERROR: 'error',
  WARN: 'warn',
  INFO: 'info',
  DEBUG: 'debug',
}

const logLevel: string =
  (process.env as Record<string, string | undefined>).VITE_LOG_LEVEL ||
  ((process.env.NODE_ENV === "production") ? 'error' : 'debug')

const shouldLog = (level: LogLevel): boolean => {
  const levels: LogLevel[] = ['error', 'warn', 'info', 'debug']
  return levels.indexOf(level) <= levels.indexOf(logLevel as LogLevel)
}

const Logger = {
  error: (context: string, message: string, error?: unknown): void => {
    if (shouldLog('error')) {
      console.error(`[${context}] ${message}`, error)
    }
  },
  warn: (context: string, message: string, data?: unknown): void => {
    if (shouldLog('warn')) {
      console.warn(`[${context}] ${message}`, data)
    }
  },
  info: (context: string, message: string, data?: unknown): void => {
    if (shouldLog('info')) {
      console.info(`[${context}] ${message}`, data)
    }
  },
  debug: (context: string, message: string, data?: unknown): void => {
    if (shouldLog('debug') && !(process.env.NODE_ENV === "production")) {
      console.log(`[${context}] ${message}`, data)
    }
  },
}

export { LOG_LEVELS }
export default Logger