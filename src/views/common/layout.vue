<script setup lang="ts">
import globalHeader from '@/views/common/header.vue'
import sidebar from '@/views/common/sidebar.vue'
</script>

<template>
  <t-layout class="main-layout">
    <sidebar></sidebar>
    <t-layout>
      <global-header></global-header>
      <t-content><router-view></router-view></t-content>
      <t-footer>Footer</t-footer>
    </t-layout>
  </t-layout>
</template>

<style lang="less" scoped>
.main-layout {
  height: 100vh;
}
</style>
