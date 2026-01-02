import { useEffect, useState } from 'react'
import { apiUrl } from '../apiClient'
import type { RoomType } from '../types'

interface RoomTypesState {
  loading: boolean
  data: RoomType[]
  error: Error | null
}

export const useRoomTypes = (): RoomTypesState => {
  const [roomTypes, setRoomTypes] = useState<RoomTypesState>({
    loading: true,
    data: [],
    error: null,
  })

  useEffect(() => {
    const controller = new AbortController()

    const fetchRoomTypes = async () => {
      try {
        const res = await fetch(apiUrl('/room-types'), {
          signal: controller.signal,
        })
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const data: RoomType[] = await res.json()
        setRoomTypes({ loading: false, data, error: null })
      } catch (err) {
        if (err instanceof Error && err.name === 'AbortError') return
        // Normalize unknown errors into Error for consistent rendering.
        const error = err instanceof Error ? err : new Error('Failed to load room types.')
        setRoomTypes({ loading: false, data: [], error })
      }
    }

    fetchRoomTypes()

    return () => controller.abort()
  }, [])

  return roomTypes
}
