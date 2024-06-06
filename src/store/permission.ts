import { defineStore } from 'pinia'
import type { PermissionState } from './types'
import type { RouteRecordName, RouteRecordRaw } from 'vue-router'
import { routes, MENU_ROUTE_NAME } from '@/router'

const filterRoutes = (routes: Array<RouteRecordRaw>, permissions: Array<string>) => {
  return routes.filter((route) => {
    if (route.children) {
      route.children = filterRoutes(route.children, permissions)
    }
    // meta in route ?
    // permission in meta ?
    // permission in permissions ?
    return (
      !route.meta ||
      (route.meta &&
        (!route.meta.permission ||
          (route.meta.permission && permissions.includes(route.meta.permission))))
    )
  })
}

const buildPermissionRoutesNameList = (routes: Array<RouteRecordRaw>) => {
  let nameList: Array<RouteRecordName> = []
  routes.forEach((route) => {
    if (route.children) {
      nameList.push(...buildPermissionRoutesNameList(route.children))
    }

    if (route.name) {
      nameList.push(route.name)
    }
  })
  return nameList
}

export const usePermissionStore = defineStore('permission', {
  state: (): PermissionState => ({ routes: [] }),
  actions: {
    generateRoutes(permissions: Array<string>, admin = false) {
      this.routes = admin ? routes : filterRoutes(routes, permissions)
    }
  },
  getters: {
    menuRoutes(): Array<RouteRecordRaw> | undefined {
      return this.routes.find((route: RouteRecordRaw) => route.name === MENU_ROUTE_NAME)?.children
    },
    permissionRouteNamesList(): Array<RouteRecordName> {
      return this.routes ? buildPermissionRoutesNameList(this.routes) : []
    }
  },

  persist: true
})
