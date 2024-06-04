import type { UserInfo } from './types'
import request from '@/api/request'

const user = (): Promise<UserInfo> => {
  return request.get('/users/me')
}

export default {
  user
}
