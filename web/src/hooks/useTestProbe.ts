import { useEffect, useState } from 'react'
import { apiUrl } from '../apiClient'
import type { TestProbeResponse } from '../types'

interface TestProbeState {
  loading: boolean
  data: TestProbeResponse | null
  error: Error | null
}

export const useTestProbe = (): TestProbeState => {
  const [testProbe, setTestProbe] = useState<TestProbeState>({
    loading: true,
    data: null,
    error: null,
  })

  useEffect(() => {
    const controller = new AbortController()
    const fetchTest = async () => {
      try {
        const url = new URL(apiUrl('/test'), window.location.origin)
        url.searchParams.set('test_id', '123')

        const res = await fetch(url, { signal: controller.signal })
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const data: TestProbeResponse = await res.json()
        setTestProbe({ loading: false, data, error: null })
      } catch (err) {
        if (err instanceof Error && err.name === 'AbortError') return
        const error = err instanceof Error ? err : new Error('Failed to contact test endpoint.')
        setTestProbe({ loading: false, data: null, error })
      }
    }

    fetchTest()
    return () => controller.abort()
  }, [])

  return testProbe
}
