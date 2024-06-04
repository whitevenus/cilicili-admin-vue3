<script setup lang="ts">
import { Icon } from 'tdesign-vue-next'
import type { SubmitContext } from 'tdesign-vue-next'
import { reactive, ref } from 'vue'
import type { TokenRequest } from '@/api/types'
import { useAppStore, useUserStore } from '@/store/index'
import message from '@/utils/message'
import { useRouter } from 'vue-router'

const loginForm = reactive<TokenRequest>({
  username: '',
  password: ''
})

const appStore = useAppStore()
const userStore = useUserStore()
const loading = ref(false)
const router = useRouter()
const handleLogin = async ({ validateResult }: SubmitContext<FormData>) => {
  if (validateResult !== true) {
    return
  }
  loading.value = true
  try {
    await appStore.login(loginForm)
    await userStore.fetchCurrentUser()
    message.success('登录成功')
    router.push({ name: 'dashboard' })
  } finally {
    loading.value = false
  }
}

const rules = {
  username: [{ required: true, message: '请填写用户名' }],
  password: [{ required: true, message: '请填写密码' }]
}
</script>

<template>
  <div class="login-container">
    <div class="content">
      <t-card>
        <h1>CiliCili Admin</h1>
        <t-form
          class="login-form"
          ref="form"
          :rules="rules"
          :data="loginForm"
          :colon="true"
          :label-width="0"
          @submit="handleLogin"
        >
          <t-form-item name="username">
            <t-input v-model="loginForm.username" clearable placeholder="请输入用户名">
              <template #prefix-icon>
                <icon name="desktop" />
              </template>
            </t-input>
          </t-form-item>

          <t-form-item name="password">
            <t-input
              v-model="loginForm.password"
              type="password"
              clearable
              placeholder="请输入密码"
            >
              <template #prefix-icon>
                <icon name="lock-on" />
              </template>
            </t-input>
          </t-form-item>

          <t-form-item>
            <t-button theme="primary" type="submit" block :loading="loading">登录</t-button>
          </t-form-item>
        </t-form>
      </t-card>
    </div>
  </div>
</template>

<style lang="less" scoped>
.login-container {
  width: 100%;
  height: 100vh;
  background-color: #f5f5f5;
  display: flex;
  justify-content: center;
  align-items: center;
  .content {
    width: 400px;
    h1 {
      text-align: center;
    }
    .login-form {
      margin: 20px 0;
    }
  }
}
</style>
