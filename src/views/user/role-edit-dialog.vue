<script setup lang="ts">
import type { RoleInfo } from '@/api/types'
import { computed, ref, watch } from 'vue'
import type { Ref } from 'vue'
import { permissionsTree } from '@/config/permission.config'

interface Props {
  show: boolean
  data: RoleInfo | null
}

const props = withDefaults(defineProps<Props>(), {
  show: false
})

const rules = {
  name: [
    {
      required: true,
      message: '角色名称不能为空',
      trigger: 'blur'
    }
  ]
}

const emit = defineEmits(['close', 'confirm'])

const visible = computed(() => props.show)

const defaultData: RoleInfo = {
  id: '',
  name: '',
  label: '',
  permissions: []
}

const role: Ref<RoleInfo> = ref(props.data || defaultData)

watch(props, (newValue) => {
  role.value = newValue.data || defaultData
})

const handleConfirm = () => {
  emit('confirm', role.value)
}
</script>

<template>
  <t-dialog
    width="900px"
    :visible="visible"
    :header="role.id ? '编辑角色' : '创建角色'"
    @close="$emit('close')"
    @confirm="handleConfirm"
  >
    <t-form :data="role" :rules="rules" class="dialog-form">
      <t-form-item label="用户名称" name="name">
        <t-input v-if="role.id" placeholder="请输入角色名称" :value="role.name" disabled />
        <t-input v-else placeholder="请输入角色名称" v-model="role.name" />
      </t-form-item>
      <t-form-item label="角色标识" name="lable">
        <t-input placeholder="请输入角色标识" v-model="role.label" />
      </t-form-item>
      <t-form-item label="角色权限集" name="permissions">
        <t-tree
          :data="permissionsTree"
          hover
          expand-all
          :checkable="true"
          value-mode="all"
          v-model="role.permissions"
        ></t-tree>
      </t-form-item>
    </t-form>
  </t-dialog>
</template>

<style scoped></style>
