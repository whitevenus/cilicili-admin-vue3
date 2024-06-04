import type { TokenRequest } from './types'
import request from '@/api/request'

const createToken = (tokenRequest: TokenRequest): Promise<string> => {
  return request.post('/token', tokenRequest)
}

export default {
  createToken
}
