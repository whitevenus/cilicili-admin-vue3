import { defineStore } from 'pinia'
import type { UserState } from './types'
import userApi from '@/api/user'
import { usePermissionStore } from './permission'

export const useUserStore = defineStore('user', {
  state: (): UserState => ({ currentUser: null }),
  actions: {
    async fetchCurrentUser(): Promise<void> {
      this.currentUser = await userApi.user()
      // TODO: super admin
      usePermissionStore().generateRoutes(this.currentUser.permissions)
    }
  },
  persist: true
})
