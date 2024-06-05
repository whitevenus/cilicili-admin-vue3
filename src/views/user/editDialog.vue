<script setup lang="ts">
import type { UserInfo } from '@/api/types'
import { computed, ref } from 'vue'
import type { Ref } from 'vue'
import userApi from '@/api/user'
import message from '@/utils/message'

interface Props {
  show: boolean
  data: UserInfo | null
}

const props = withDefaults(defineProps<Props>(), {
  show: false
})

const rules = {
  nickname: [
    {
      required: true,
      message: '用户昵称不能为空',
      trigger: 'blur'
    }
  ],
  username: [
    {
      required: true,
      message: '用户名不能为空',
      trigger: 'blur'
    }
  ]
}

const options = computed(() => {
  return [
    { label: '管理员', value: 'ROLE_ADMIN' },
    { label: '普通用户', value: 'ROLE_USER' }
  ]
})

const emit = defineEmits(['close', 'confirm'])

const visible = computed(() => props.show)

const defaultData: UserInfo = {
  id: '',
  username: '',
  nickname: '',
  roles: [],
  permissions: []
}

const user: Ref<UserInfo> = ref(props.data || defaultData)

const handleConfirm = () => {
  emit('confirm', user.value)
}
</script>

<template>
  <t-dialog
    width="900px"
    :visible="visible"
    :header="user.id ? '编辑用户' : '创建用户'"
    @close="$emit('close')"
    @confirm="handleConfirm"
  >
    <t-form :data="user" :rules="rules">
      <t-form-item label="用户名称" name="username">
        <t-input placeholder="请输入用户名称" v-model="user.username" />
      </t-form-item>
      <t-form-item label="用户昵称" name="nickname">
        <t-input placeholder="请输入用户昵称" v-model="user.nickname" />
      </t-form-item>

      <t-form-item label="角色" name="roles">
        <t-select v-model="user.roles" :options="options" clearable multiple></t-select>
      </t-form-item>
      <t-form-item></t-form-item>
    </t-form>
  </t-dialog>
</template>

<style scoped></style>
