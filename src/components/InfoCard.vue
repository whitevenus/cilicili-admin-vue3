<script setup lang="ts">
import { Icon } from 'tdesign-vue-next'

type Info = {
  icon: string
  title: string
  color: string
  number: number
  unit: string
}

interface Props {
  info: Info
}

defineProps<Props>()
</script>

<template>
  <t-card
    class="info-card"
    size="medium"
    :style="`--info-card-primary-color: ${info.color}`"
    :bordered="false"
  >
    <template #header>
      <div class="header">{{ info.title }}</div>
    </template>
    <div class="info">
      <div class="number">
        {{ info.number }}<span class="unit">{{ info.unit }}</span>
      </div>
      <icon class="icon" :name="info.icon"></icon>
    </div>
  </t-card>
</template>

<style lang="less" scoped>
.info-card {
  cursor: pointer;
  transition: 0.3s;

  .header {
    font-size: 16px;
    font-weight: bold;
  }

  .info {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    .icon {
      font-size: 45px;
      color: var(--info-card-primary-color);
      transition: 0.3s;
    }

    .number {
      font-size: 40px;
      .unit {
        font-size: 16px;
        margin-left: 8px;
      }
    }
  }

  &:hover {
    background-color: var(--info-card-primary-color);
    color: #fff;

    .icon {
      color: #fff;
      transform: scale(1.2);
    }
  }
}
</style>
