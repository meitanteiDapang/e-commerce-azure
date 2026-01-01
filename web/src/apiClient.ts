const defaultBase =
  typeof window !== 'undefined' && window.location.origin.includes('localhost')
    ? 'http://localhost:8080'
    : 'https://api.dapang.live'

const rawBase = (import.meta.env.VITE_API_BASE_URL as string | undefined) || defaultBase

const API_BASE = rawBase.replace(/\/$/, '')

export const apiUrl = (path: string): string => `${API_BASE}${path.startsWith('/') ? path : `/${path}`}`
