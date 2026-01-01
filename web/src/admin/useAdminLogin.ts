import { requestAdminLogin } from './AdminLoginApi'

interface UseAdminLoginResult {
  submit: () => Promise<void>
}

export const useAdminLogin = (username: string, password: string): UseAdminLoginResult => {
  const submit = async (): Promise<void> => {
    try {
      await requestAdminLogin(username, password)
    } catch (err) {
      console.error(err)
    }
  }

  return {
    submit,
  }
}
