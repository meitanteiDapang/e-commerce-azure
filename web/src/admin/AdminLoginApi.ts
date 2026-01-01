import { apiUrl } from '../apiClient'

export const requestAdminLogin = async (username: string, password: string): Promise<unknown> => {
  const params = new URLSearchParams({ username, password })
  const res = await fetch(apiUrl(`/adminLogin?${params.toString()}`), {
    method: 'POST',
  })

  if (res.ok) {
    return res.json()
  }

  const data = await res.json().catch(() => null)


  if (data.status == 401) {
    const message = (data as { message: string }).message
    throw new Error(message)
  }
  const message = (data as { message?: string } | null)?.message || `Admin login failed (HTTP ${res.status})`
  throw new Error(message)
}
