<script setup lang="ts">
import { PermissionEnum } from '@/config/permission.config'
import { useEditDialog } from '@/composables/useEditDialog'
import type { RoleCreateRequest, RoleInfo } from '@/api/types'
import roleApi from '@/api/role'
import { reactive } from 'vue'
import { useSearch } from '@/composables/useSearch'
import RoleEditDialog from '@/views/user/role-edit-dialog.vue'
import { Icon } from 'tdesign-vue-next'

const searchKey = reactive({
  name: '',
  label: ''
})

const columns = [
  { colKey: 'id', title: 'ID' },
  { colKey: 'name', title: '角色名称' },
  { colKey: 'label', title: '角色标识' },
  { colKey: 'operation', title: '操作' }
]

const { data, fetchData, loading, pagination, onPageChange } = useSearch<
  RoleInfo,
  {
    name: string
    label: string
  }
>(roleApi, searchKey)

const { handleCreate, handleEdit, onDialogClose, showDialog, editData, handleConfirm } =
  useEditDialog<RoleInfo, RoleCreateRequest>(roleApi, '角色')
</script>

<template>
  <t-card>
    <div class="action-area">
      <t-button v-permission="PermissionEnum.USER_ROLES_CREATE" @click="handleCreate"
        >创建角色</t-button
      >
    </div>
    <div class="search-area">
      <t-input v-model="searchKey.name" class="search-input" placeholder="请输入角色名称"></t-input>
      <t-input
        v-model="searchKey.label"
        class="search-input"
        placeholder="请输入角色标识"
      ></t-input>
      <t-button @click="fetchData">
        <template #icon>
          <icon name="search"></icon>
        </template>
      </t-button>
    </div>
    <t-table
      :columns="columns"
      :loading="loading"
      row-key="index"
      :data="data"
      :pagination="pagination"
      @page-change="onPageChange"
    >
      <template #operation="row">
        <t-button
          v-permission="PermissionEnum.USER_LIST_EDIT"
          variant="text"
          theme="primary"
          @click="handleEdit(row)"
        >
          <template #icon>
            <icon name="edit"></icon>
          </template>
          编辑
        </t-button>
      </template>
    </t-table>
  </t-card>
  <role-edit-dialog
    :show="showDialog"
    :data="editData"
    @close="onDialogClose"
    @confirm="handleConfirm"
  ></role-edit-dialog>
</template>

<style scoped></style>
