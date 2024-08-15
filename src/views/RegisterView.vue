<script setup lang="ts">
interface RegisterForm {
  email: string
  password: string
  password2: string
  nickname: string
}
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

import axios from 'axios'

import { BACKEND_URL } from '../services/global-variables'
import { tokenValidHandler } from '../services/auth-service'

const router = useRouter()
const editForm = ref<RegisterForm>({
  email: '',
  password: '',
  password2: '',
  nickname: ''
})

// 頁面渲染時，檢查是否已登入
onMounted(async () => {
  const validResult = await tokenValidHandler(true)

  if (!validResult) {
    alert('你已登入，將跳轉至首頁')
    router.push('/')
  }
})

const registerHandler = async () => {
  if (!validFormData()) return

  const url = `${BACKEND_URL}/users/sign_up`
  const postData = {
    email: editForm.value.email,
    password: editForm.value.password,
    nickname: editForm.value.nickname
  }
  let apiResult: any
  try {
    const response = await axios.post(url, postData)
    apiResult = response.data
  } catch (error: any) {
    const response = error?.response
    const errorMsg = response?.data?.message ? `註冊失敗，${response.data.message}` : '註冊失敗'
    alert(errorMsg)
    apiResult = response?.data
  }

  if (apiResult.status) {
    alert('註冊成功，將跳轉至登入頁')
    router.push('/login')
  }
}

const validFormData = () => {
  const validResult = ref(true)
  if (
    !editForm.value.email ||
    !editForm.value.password ||
    !editForm.value.password2 ||
    !editForm.value.nickname
  ) {
    alert('請輸入信箱與密碼')
    validResult.value = false
    return validResult.value
  }

  if (editForm.value.password !== editForm.value.password2) {
    alert('請確認兩次輸入的密碼相同')
    validResult.value = false
    return validResult.value
  }

  if (editForm.value.password.length < 6) {
    alert('密碼長度不得小於 6 個字元')
    validResult.value = false
    return validResult.value
  }

  return validResult.value
}
</script>

<template>
  <h1>註冊頁 RegisterView</h1>
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
    <label for="password2Input">驗證密碼 Password Confirm</label><br />
    <input
      id="password2Input"
      style="width: 100%; margin-bottom: 0.5rem"
      type="password"
      v-model="editForm.password2"
    /><br />
    <label for="nicknameInput">暱稱 Nickname</label><br />
    <input
      id="nicknameInput"
      style="width: 100%; margin-bottom: 0.5rem"
      type="text"
      v-model="editForm.nickname"
    /><br />
    <button style="width: 100%; margin-bottom: 0.5rem" @click.prevent="registerHandler">
      註冊 Register
    </button>
    <hr />
    <span>已有帳號? <RouterLink to="/login">登入 Login</RouterLink></span>
  </div>
</template>

<style scoped></style>
