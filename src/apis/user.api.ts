import { User } from 'src/types/user.type'
import { SuccessResponseApi } from 'src/types/utils.type'
import http from 'src/utils/http'

interface BodyUpdateProfile extends Omit<User, '_id' | 'roles' | 'createAt' | 'updateAt' | 'email'> {
  password?: string
  newPassword?: string
}
const userAPI = {
  getProfile() {
    return http.get<SuccessResponseApi<User>>('me')
  },
  updateProfile(body: BodyUpdateProfile) {
    return http.put<SuccessResponseApi<User>>('user', body)
  },
  uploadAvata(body: FormData) {
    return http.post('user/upload-avata', body, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }
}
export default userAPI
