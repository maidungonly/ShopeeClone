import http from 'src/utils/http'
import { AuthResponse } from 'src/types/auth.type'

const authAPI = {
  registerAccount(body: { email: string; password: string }) {
    return http.post<AuthResponse>('/register', body)
  },
  loginAccount(body: { email: string; password: string }) {
    return http.post<AuthResponse>('/login', body)
  },
  logout() {
    return http.post('/logout')
  }
}

export default authAPI
