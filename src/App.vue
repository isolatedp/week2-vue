<script setup lang="ts">
import { computed } from 'vue'
import { RouterView, RouterLink, useRouter } from 'vue-router'

import * as authService from './services/auth-service'
import * as statusService from './services/status-service'

const userInfo = computed(() => statusService.getStatus('userInfo'))
const router = useRouter()

const logout = async () => {
  const result = await authService.logoutHandler()
  if (result) {
    alert('登出成功，將跳轉至首頁')
    statusService.resetStatus()
    router.push('/')
  }
}
</script>

<template>
  <RouterLink to="/">Home</RouterLink>&nbsp;|&nbsp;
  <RouterLink to="/todos" v-if="!userInfo">Todos</RouterLink>
  <RouterLink to="/todos" v-if="userInfo">Todos</RouterLink>&nbsp;|&nbsp;
  <RouterLink to="/login" v-if="!userInfo">Login</RouterLink>
  <a href="#" v-if="userInfo" @click.prevent="logout()">Logout</a>
  <RouterView />
</template>

<style scoped></style>
