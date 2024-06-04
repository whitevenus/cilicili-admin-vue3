import type { RouteRecordRaw } from 'vue-router'
import LoginView from '@/views/login/index.vue'
import LayoutView from '@/views/common/layout.vue'
import PageLayout from '@/views/common/pageLayout.vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import { useAppStore } from '@/store/app'
import { PermissionEnum } from '@/config/permission.config'

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
        component: PageLayout,
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
          }
        ]
      }
    ]
  },
  { path: '/login', name: 'login', component: LoginView }
]

const router = createRouter({
  routes,
  history: createWebHashHistory(),
  strict: true,
  scrollBehavior: () => ({ left: 0, top: 0 })
})

// URL whiteList
const whiteList = ['/login']

// router Guard
router.beforeEach((to, from) => {
  const appStore = useAppStore()
  if (!appStore.token) {
    // the store don't has token
    if (whiteList.indexOf(to.path) !== -1) {
      // this url in whiteList, just go
      return true
    } else {
      // this url not in whiteList, go /login with the current url
      return `/login?redirect=${to.path}`
    }
  } else if (to.path === '/login') {
    // the store already has token and this url is /login, just go dashboard
    return { name: 'dashboard' }
  } else {
    // the store already has token and this url is not /login, just go
    return true
  }
})

export default router
