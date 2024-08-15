<script setup lang="ts">
import { computed } from 'vue'
import { RouterView, RouterLink, useRoute } from 'vue-router'

import * as authService from './services/auth-service'
import * as statusService from './services/status-service'

const userInfo = computed(() => statusService.getStatus('userInfo'))
const route = useRoute()
</script>

<template>
  <RouterLink to="/">Home</RouterLink>&nbsp;|&nbsp;
  <RouterLink to="/todos" v-if="!userInfo">Todos</RouterLink>
  <RouterLink to="/todos" v-if="userInfo">Todos</RouterLink>&nbsp;|&nbsp;
  <RouterLink to="/login" v-if="!userInfo">Login</RouterLink>
  <a href="#" v-if="userInfo" @click.prevent="authService.logoutHandler">Logout</a>
  <RouterView />
</template>

<style scoped></style>
