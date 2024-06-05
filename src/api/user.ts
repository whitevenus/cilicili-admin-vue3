import type { ListResult, UserCreateRequest, UserFilter, UserInfo } from './types'
import request from '@/api/request'

const user = (): Promise<UserInfo> => {
  return request.get('/users/me')
}

const list = (filter: UserFilter): Promise<ListResult<UserInfo>> => {
  return request.get('/users', { params: filter })
}

const create = (userCreateRequest: UserCreateRequest): Promise<UserInfo> => {
  return request.post('/users', userCreateRequest)
}
const edit = (id: string, userEditRequest: UserCreateRequest): Promise<UserInfo> => {
  return request.post(`/users/${id}`, userEditRequest)
}

export default {
  user,
  list,
  create,
  edit
}
