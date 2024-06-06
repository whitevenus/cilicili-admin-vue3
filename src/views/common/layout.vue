<script setup lang="ts">
import globalHeader from '@/views/common/header.vue'
import sidebar from '@/views/common/sidebar.vue'
</script>

<template>
  <t-layout class="main-layout">
    <sidebar></sidebar>
    <t-layout>
      <global-header></global-header>
      <t-content class="content-layout"><router-view></router-view></t-content>
      <t-footer style="text-align: center">Copyright @ 2024-2025 CiliCiliAdmin</t-footer>
    </t-layout>
  </t-layout>
</template>

<style lang="less" scoped>
.main-layout {
  height: 100vh;
  .content-layout {
    padding: 24px;
  }
}
</style>
