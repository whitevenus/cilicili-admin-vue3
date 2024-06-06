<script setup lang="ts">
import ErrorPage from '@/components/ErrorPage.vue'
</script>

<template>
  <error-page title="403无权限访问" description="您当前无权访问该页面, 若有疑问请和网站管理员联系">
    <template #image>
      <img src="@/assets/images/not-allowed.png" />
    </template>
  </error-page>
</template>

<style scoped></style>
