import type { ListResult, RoleFilter, RoleCreateRequest, RoleInfo } from './types'
import request from '@/api/request'

const list = (filter: RoleFilter): Promise<ListResult<RoleInfo>> => {
  return request.get('/roles', { params: filter })
}

const create = (roleCreateRequest: RoleCreateRequest): Promise<RoleInfo> => {
  return request.post('/roles', roleCreateRequest)
}
const edit = (id: string, roleEditRequest: RoleCreateRequest): Promise<RoleInfo> => {
  return request.post(`/roles/${id}`, roleEditRequest)
}

export default {
  list,
  create,
  edit
}
