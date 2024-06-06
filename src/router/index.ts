import type { RouteRecordName, RouteRecordRaw } from 'vue-router'
import LoginView from '@/views/login/index.vue'
import LayoutView from '@/views/common/layout.vue'
import PageLayoutView from '@/views/common/pageLayout.vue'
import NotFoundView from '@/views/error/not-found.vue'
import NotAllowedView from '@/views/error/not-allowed.vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import { useAppStore } from '@/store/app'
import { PermissionEnum } from '@/config/permission.config'
import { usePermissionStore } from '@/store/permission'

declare module 'vue-router' {
  interface RouteMeta extends Record<string | number | symbol, undefined> {
    permission?: string
    icon?: string
    title?: string
  }
}

export const MENU_ROUTE_NAME = 'menuRoot'

export const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: MENU_ROUTE_NAME,
    component: LayoutView,
    redirect: { name: 'dashbaord' },
    children: [
      {
        path: 'dashboard',
        name: 'dashboard',
        component: () => import('@/views/dashboard/index.vue'),
        meta: {
          permission: PermissionEnum.DASHBOARD,
          title: '控制台',
          icon: 'dashboard'
        }
      },
      {
        path: 'user',
        name: 'user',
        component: PageLayoutView,
        meta: {
          permission: PermissionEnum.USER,
          title: '用户',
          icon: 'usergroup'
        },
        redirect: { name: 'user-list' },
        children: [
          {
            name: 'user-list',
            path: 'list',
            component: () => import('@/views/user/index.vue'),
            meta: {
              permission: PermissionEnum.USER_LIST,
              title: '用户管理',
              icon: 'user'
            }
          },
          {
            name: 'role-list',
            path: 'roles',
            component: () => import('@/views/user/roles.vue'),
            meta: {
              permission: PermissionEnum.USER_ROLES,
              title: '角色管理',
              icon: 'secured'
            }
          }
        ]
      }
    ]
  },
  { path: '/login', name: 'login', component: LoginView },
  { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFoundView },
  { path: '/403', name: 'not-allowed', component: NotAllowedView }
]

const router = createRouter({
  routes,
  history: createWebHashHistory(),
  strict: true,
  scrollBehavior: () => ({ left: 0, top: 0 })
})

// URL whiteList
const whiteList: Array<RouteRecordName> = ['login', 'not-found', 'not-allowed']

// router Guard
router.beforeEach((to, from) => {
  const appStore = useAppStore()
  console.log(111)
  console.log(to)
  console.log(to.name)
  if (to.name) {
    const PermissionStore = usePermissionStore()
    const hasNoPermission = !PermissionStore.permissionRouteNamesList.includes(to.name)
    if (!appStore.token) {
      // the store don't has token
      if (whiteList.indexOf(to.name) !== -1) {
        // this url in whiteList, just go
        return true
      } else {
        // this url not in whiteList, go /login with the current url
        return `/login?redirect=${to.path}`
      }
    } else {
      // the store already has token
      if (hasNoPermission) {
        // no permission
        if (whiteList.indexOf(to.name) !== -1) {
          // this url in whiteList, just go this url
          return true
        } else {
          // this url is not in whitelist, just go 403
          return { name: 'not-allowed' }
        }
      } else if (to.path === '/login') {
        // the store already has token and this url is /login, just go dashboard
        return { name: 'dashboard' }
      } else {
        // this url is not /login, just go
        return true
      }
    }
  }
})

export default router
