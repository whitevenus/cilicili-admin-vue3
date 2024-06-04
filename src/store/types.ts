import type { UserInfo } from '@/api/types'
import type { RouteRecordRaw } from 'vue-router'

export type AppState = {
  token: string
  menuCollapse: boolean
}
export type UserState = {
  currentUser: UserInfo | null
}

export type PermissionState = {
  routes: Array<RouteRecordRaw>
}
