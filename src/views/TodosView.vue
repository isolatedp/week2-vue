<script setup lang="ts">
interface TodoForm {
  id: string
  createTime: number | null
  content: string
  status: boolean
}

import { onMounted, ref, reactive } from 'vue'
import { useRouter } from 'vue-router'

import axios from 'axios'

import { BACKEND_URL } from '../services/global-variables'
import { tokenValidHandler } from '../services/auth-service'
import { getStatus } from '../services/status-service'

const router = useRouter()
const todoList = ref<TodoForm[]>([])
const editForm = reactive<TodoForm>({
  id: '',
  createTime: null,
  content: '',
  status: false
})

onMounted(async () => {
  // 檢查是否已登入
  const loginResult = await tokenValidHandler()
  if (!loginResult) {
    alert('請先登入，將跳轉至登入頁')
    router.push('/login')
  }

  await getTodos()
})

const addTodo = async () => {
  // 先驗證是否已登入
  const loginResult = tokenValidHandler()
  if (!loginResult) {
    router.push('/login')
  }

  // 驗證資料是否正確
  if (!validFormData()) return

  const url = `${BACKEND_URL}/todos`
  const headers = {
    Authorization: getStatus('userInfo').token
  }
  const postData = {
    content: editForm.content
  }

  let apiResult: any
  try {
    const response = await axios.post(url, postData, { headers })
    apiResult = response.data
  } catch (error: any) {
    const response = error.response
    const errorMsg = response?.data?.message ? `新增失敗，${response.data.message}` : '新增失敗'
    alert(errorMsg)
    apiResult = response?.data
  }

  if (apiResult.status) {
    alert('新增成功')
    Object.assign(editForm, {
      id: '',
      createTime: null,
      content: '',
      status: false
    })
    await getTodos()
  }
}

const editTodo = (curTodo: TodoForm) => {
  Object.assign(editForm, curTodo)
}

const updateTodo = async () => {
  // 先驗證是否已登入
  const loginResult = tokenValidHandler()
  if (!loginResult) {
    router.push('/login')
  }

  // 驗證資料是否正確
  if (!validFormData()) return

  const url = `${BACKEND_URL}/todos/${editForm.id}`
  const headers = {
    Authorization: getStatus('userInfo').token
  }
  const postData = {
    content: editForm.content
  }

  let apiResult: any
  try {
    const response = await axios.put(url, postData, { headers })
    apiResult = response.data
  } catch (error: any) {
    const response = error.response
    const errorMsg = response?.data?.message ? `更新失敗，${response.data.message}` : '更新失敗'
    alert(errorMsg)
    apiResult = response?.data
  }

  if (apiResult.status) {
    alert('更新成功')
    Object.assign(editForm, {
      id: '',
      createTime: null,
      content: '',
      status: false
    })
    await getTodos()
  }
}

const removeTodo = async (id: string) => {
  console.log('移除代辦事項', id)
  // 先驗證是否已登入
  const loginResult = tokenValidHandler()
  if (!loginResult) {
    router.push('/login')
  }

  const url = `${BACKEND_URL}/todos/${id}`
  const headers = {
    Authorization: getStatus('userInfo').token
  }

  let apiResult: any
  try {
    const response = await axios.delete(url, { headers })
    apiResult = response.data
  } catch (error: any) {
    const response = error.response
    const errorMsg = response?.data?.message ? `移除失敗，${response.data.message}` : '移除失敗'
    alert(errorMsg)
    apiResult = response?.data
  }

  if (apiResult.status) {
    alert('移除成功')
    await getTodos()
  }
}

const validFormData = () => {
  // 代辦事項不得為空
  if (!editForm.content) {
    alert('請輸入代辦事項')
    return false
  }

  // 代辦事項不可以已存在代辦事項
  switch (editForm.createTime) {
    case null:
      if (todoList.value.find((todo) => todo.content === editForm.content)) {
        alert('代辦事項已存在')
        return false
      }
      break
    default:
      if (
        todoList.value.find((todo) => todo.content === editForm.content && todo.id !== editForm.id)
      ) {
        alert('代辦事項已存在')
        return false
      }
      break
  }

  return true
}

const getTodos = async () => {
  // 先驗證是否已登入
  const loginResult = tokenValidHandler()
  if (!loginResult) {
    router.push('/login')
  }

  const url = `${BACKEND_URL}/todos`
  const headers = {
    Authorization: getStatus('userInfo').token
  }

  let apiResult: any
  try {
    const response = await axios.get(url, { headers })
    apiResult = response.data
  } catch (error: any) {
    const response = error.response
    const errorMsg = response?.data?.message ? `取得失敗，${response.data.message}` : '取得失敗'
    alert(errorMsg)
    apiResult = response?.data
  }

  if (apiResult.status) {
    todoList.value = apiResult.data as TodoForm[]
  }
}

const cancelEdit = () => {
  Object.assign(editForm, {
    id: '',
    createTime: null,
    content: '',
    status: false
  })
}

const toggleTodo = async (todo: TodoForm) => {
  // 先驗證是否已登入
  const loginResult = await tokenValidHandler()
  if (loginResult) {
    router.push('/login')
  }

  const url = `${BACKEND_URL}/todos/${todo.id}/toggle`
  const headers = {
    Authorization: getStatus('userInfo').token
  }

  let apiResult: any
  try {
    const response = axios.patch(url, {}, { headers })
    apiResult = ref({ status: true })
  } catch (error: any) {
    const response = error.response
    const errorMsg = response?.data?.message ? `切換失敗，${response.data.message}` : '切換失敗'
    alert(errorMsg)
    apiResult = response?.data
  }

  if (apiResult.status) {
    alert('切換成功')
    getTodos()
  }
}
</script>

<template>
  <h1>代辦事項頁 TodosView</h1>
  <!-- <div>
    <button style="margin-right: 0.5rem">全部</button>
    <button style="margin-right: 0.5rem">未完成</button>
    <button style="margin-right: 0.5rem">已完成</button>
  </div> -->
  <hr />
  <div>
    <input
      v-if="editForm.createTime === null"
      type="text"
      placeholder="請輸入代辦事項"
      v-model="editForm.content"
    />
    <input
      v-if="editForm.createTime !== null"
      type="text"
      placeholder="請輸入代辦事項"
      :disabled="true"
    />
    <button
      style="margin-left: 0.5rem"
      @click.prevent="addTodo"
      :disabled="editForm.createTime !== null"
    >
      新增
    </button>
    <div style="padding: 0.5rem 0 0.5rem" v-for="todo in todoList" :key="todo.id">
      <input
        type="checkbox"
        style="margin: 0 0.5rem 0"
        v-model="todo.status"
        :disabled="editForm.createTime !== null"
        @click="toggleTodo(todo)"
      />
      <span v-if="editForm.createTime !== todo.createTime">{{ todo.content }}</span>
      <input
        v-if="editForm.createTime === todo.createTime"
        type="text"
        style="margin: 0 0.5rem 0"
        v-model="editForm.content"
      />
      <span v-if="editForm.createTime === null">
        <button style="margin-right: 0.5rem" @click.prevent="editTodo(todo)">編輯</button>
        <button style="margin-right: 0.5rem" @click.prevent="removeTodo(todo.id)">刪除</button>
      </span>
      <span v-else-if="editForm.createTime === todo.createTime">
        <button style="margin-right: 0.5rem" @click.prevent="updateTodo">確認</button>
        <button style="margin-right: 0.5rem" @click.prevent="cancelEdit">取消</button>
      </span>
    </div>
  </div>
</template>

<style scoped></style>
