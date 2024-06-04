import { defineStore } from 'pinia'
import type { AppState } from './types'
import type { TokenRequest } from '@/api/types'
import tokenApi from '@/api/token'
import { useUserStore } from './user'

export const useAppStore = defineStore('app', {
  state: (): AppState => ({
    token: '',
    menuCollapse: false
  }),
  actions: {
    async login(loginForm: TokenRequest): Promise<void> {
      this.token = await tokenApi.createToken(loginForm)
    },
    async logout(): Promise<void> {
      const userStore = useUserStore()
      this.token = ''
      userStore.$reset()
    }
  },
  persist: true
})
