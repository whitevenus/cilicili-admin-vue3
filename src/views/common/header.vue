<script setup lang="ts">
import { useAppStore, useUserStore } from '@/store'
import { Icon } from 'tdesign-vue-next'
import type { DropdownOption } from 'tdesign-vue-next'
import { useRouter, useRoute } from 'vue-router'
import CollapseButton from '@/components/CollapseButton.vue'

const userStore = useUserStore()
const appStore = useAppStore()
const router = useRouter()
const route = useRoute()
const clickHandler = async ({ value }: DropdownOption) => {
  switch (value) {
    case 'logout':
      await appStore.logout()
      await router.push(`/login?redirect=${route.fullPath}`)
      break
    default:
      throw new Error('该指令未设置任何操作')
  }
}
</script>

<template>
  <t-header class="header">
    <collapse-button v-model:collapsed="appStore.menuCollapse"></collapse-button>
    <div class="opration-area">
      <t-dropdown
        :options="[{ content: '退出登录', value: 'logout' }]"
        trigger="click"
        @click="clickHandler"
      >
        <t-button theme="default" variant="text">
          <template #icon><icon name="user" /></template>
          {{ userStore.currentUser?.nickname }}
        </t-button>
      </t-dropdown>
    </div>
  </t-header>
</template>

<style lang="less" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
}
</style>
