<script setup lang="ts">
import { PermissionEnum } from '@/config/permission.config'
</script>

<template>
  <div>
    用户管理
    <t-button v-permission="PermissionEnum.USER_LIST_CREATE">添加用户</t-button>
  </div>
</template>

<style scoped></style>
