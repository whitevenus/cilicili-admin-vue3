<script setup lang="ts">
import { useAppStore } from '@/store'
import SidebarItem from '@/components/SidevarItem.vue'
import { usePermissionStore } from '@/store/permission'
const appStore = useAppStore()
const permissionStore = usePermissionStore()
</script>

<template>
  <t-aside :width="appStore.menuCollapse ? '64px' : '232px'">
    <t-menu :collapsed="appStore.menuCollapse">
      <sidebar-item
        v-for="item in permissionStore.menuRoutes"
        :key="item.name"
        :item="item"
      ></sidebar-item>
    </t-menu>
  </t-aside>
</template>

<style scoped></style>
