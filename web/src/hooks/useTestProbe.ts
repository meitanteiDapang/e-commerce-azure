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
        // Build URL via URL to avoid manual string concatenation and keep types happy.
        const url = new URL(apiUrl('/test'), window.location.origin)
        url.searchParams.set('test_id', '123')
        const requestPayload = {
          input: 5,
          timestamp: Date.now(),
        }

        const res = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(requestPayload),
          signal: controller.signal,
        })
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const data: TestProbeResponse = await res.json()
        setTestProbe({ loading: false, data, error: null })
      } catch (err) {
        if (err instanceof Error && err.name === 'AbortError') return
        // Collapse unknown errors into a typed Error so UI can show message safely.
        const error = err instanceof Error ? err : new Error('Failed to contact test endpoint.')
        setTestProbe({ loading: false, data: null, error })
      }
    }

    fetchTest()
    return () => controller.abort()
  }, [])

  return testProbe
}
