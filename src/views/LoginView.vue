<script setup lang="ts">
interface LoginForm {
  email: string
  password: string
}
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

import { tokenValidHandler, loginHandler } from '../services/auth-service'

const router = useRouter()
const editForm = ref<LoginForm>({
  email: '',
  password: ''
})

// 頁面渲染時，檢查是否已登入
onMounted(async () => {
  const validResult = await tokenValidHandler(true)

  if (!validResult) {
    alert('你已登入，將跳轉至首頁')
    router.push('/')
  }
})

const validFormData = () => {
  const validResult = ref(true)
  if (!editForm.value.email || !editForm.value.password) {
    alert('請輸入信箱與密碼')
    validResult.value = false
    return validResult.value
  }

  if (editForm.value.password.length < 6) {
    alert('密碼長度不得小於 6 個字元')
    validResult.value = false
  }

  return validResult.value
}

const login = async () => {
  if (!validFormData()) return

  const result = await loginHandler(editForm.value.email, editForm.value.password)

  if (result) router.push('/')
}
</script>

<template>
  <h1>登入頁 LoginView</h1>
  <div style="max-width: 300px">
    <label for="emailInput">信箱 Email</label><br />
    <input
      id="emailInput"
      style="width: 100%; margin-bottom: 0.5rem"
      type="email"
      v-model="editForm.email"
    /><br />
    <label for="passwordInput">密碼 Password</label><br />
    <input
      id="passwordInput"
      style="width: 100%; margin-bottom: 0.5rem"
      type="password"
      v-model="editForm.password"
    /><br />
    <button style="width: 100%; margin-bottom: 0.5rem" @click.prevent="login">登入 Login</button>
    <hr />
    <span>沒有帳號? <RouterLink to="/register">註冊 Register</RouterLink></span>
  </div>
</template>

<style scoped></style>
