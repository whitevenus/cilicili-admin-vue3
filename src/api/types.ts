export type TokenRequest = {
  username: string
  password: string
}
export type ErrorResponse = {
  code: number
  message: string
}

export type UserInfo = {
  username: string
  nickname: string
  roles: Array<string>
  permissions: Array<string>
}
