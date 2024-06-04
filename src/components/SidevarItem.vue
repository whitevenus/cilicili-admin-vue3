<script setup lang="ts">
import { Icon } from 'tdesign-vue-next'

defineProps({
  item: {
    type: Object,
    default: null
  }
})
</script>

<template>
  <t-menu-item v-if="item && !item.children" :value="item.name" :to="{ name: item.name }">
    <template #icon>
      <icon :name="item.meta.icon" />
    </template>
    {{ item.meta.title }}
  </t-menu-item>

  <t-submenu v-if="item && item.children" :value="item.name" :title="item.meta.title">
    <template #icon>
      <icon :name="item.meta.icon" />
    </template>
    <sidevar-item
      v-for="subItem in item.children"
      :key="subItem.name"
      :item="subItem"
    ></sidevar-item>
  </t-submenu>
</template>

<style scoped></style>
