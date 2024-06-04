import axios from 'axios'
import type { AxiosInstance, AxiosResponse, AxiosError, InternalAxiosRequestConfig } from 'axios'
import type { ErrorResponse } from './types'
import message from '@/utils/message'
import { useAppStore } from '@/store'

const BASE_URL: string = import.meta.env.VITE_API_BASE_URL

const instance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 60000
})

const tokenPrefix: string = import.meta.env.VITE_TOKEN_PREFIX

// Request Interceptor: take token
instance.interceptors.request.use((request: InternalAxiosRequestConfig) => {
  const appStore = useAppStore()
  if (appStore.token && request.headers) {
    request.headers['Authorization'] = tokenPrefix + appStore.token
  }
  return request
})

// Response Interceptor: Simple Error Handling
instance.interceptors.response.use(
  (response: AxiosResponse): any => {
    return response.data
  },
  async (error: AxiosError<ErrorResponse>): Promise<AxiosError> => {
    const responseData: ErrorResponse | undefined = error.response?.data
    responseData && message.error(responseData.message)
    // 401 no permission
    if (error.response?.status === 401) {
      const appStore = useAppStore()
      await appStore.logout()
    }
    return Promise.reject(error)
  }
)

export default instance
