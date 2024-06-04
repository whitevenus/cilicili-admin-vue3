import type { Directive, DirectiveBinding } from 'vue'
import { useUserStore } from '@/store'

const hasNotPermission = (value: string) => {
  return useUserStore().currentUser?.permissions.indexOf(value) === -1
}

export const PermissionDirective: Directive = {
  mounted(el: Element, { value }: DirectiveBinding) {
    hasNotPermission(value) && el.parentNode?.removeChild(el)
  }
}
