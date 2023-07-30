type Role = 'User' | 'Admin'
export interface User {
  _id: string
  roles: Role[]
  email: string
  name: string
  date_of_birth: null
  address: string
  createAt: string
  updateAt: string
}
