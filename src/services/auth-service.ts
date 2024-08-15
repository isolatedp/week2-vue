import { ref } from 'vue'
import { useRouter } from 'vue-router'

import axios from 'axios'

import { setStatus, getStatus, resetStatus } from './status-service'
import { BACKEND_URL } from './global-variables'

const router = useRouter()

export const loginHandler = async (email: string, password: string) => {
  const url = `${BACKEND_URL}/users/sign_in`
  const postData = {
    email: email,
    password: password
  }

  let apiResult: any
  try {
    const response = await axios.post(url, postData)
    apiResult = response.data
  } catch (error: any) {
    const response = error.response
    const errorMsg = response?.data?.message ? `登入失敗: ${response.data.message}` : '登入失敗'
    apiResult = response?.data || {}
    alert(errorMsg)
    return false
  }

  if (apiResult?.status) {
    setStatus('userInfo', apiResult)
    return true
  }

  alert('登入失敗')
  return false
}

export const logoutHandler = async () => {
  const url = `${BACKEND_URL}/users/sign_out`
  const token = getStatus('userInfo').token
  const headers = {
    Authorization: token
  }

  let apiResult: any
  try {
    const response = await axios.post(url, {}, { headers })
    apiResult = response.data
  } catch (error: any) {
    const response = error.response
    const errorMsg = response?.data?.message ? `登出失敗: ${response.data.message}` : '登出失敗'
    apiResult = response?.data || {}
    alert(errorMsg)
    return false
  }

  if (apiResult?.status) {
    resetStatus()
    return true
  }
}

export const tokenValidHandler = async (isLoginPage: boolean = false) => {
  const result = ref(false)
  const url = `${BACKEND_URL}/users/checkout`
  const token = getStatus('userInfo')?.token

  // 無 token 處理
  if (!token && isLoginPage) return true
  else if (!token) {
    resetStatus()
    return result.value
  }

  const headers = {
    Authorization: token
  }

  let apiResult: any
  try {
    const response = await axios.get(url, { headers })
    apiResult = response.data
  } catch (error: any) {
    const response = error.response
    const errorMsg = response?.data?.message ? `驗證失敗: ${response.data.message}` : '驗證失敗'
    apiResult = response?.data || {}
    alert(errorMsg)
  }

  if (apiResult?.status && apiResult.nickname !== getStatus('userInfo').nickname) {
    resetStatus()
  }

  result.value = apiResult.status

  if (isLoginPage) result.value = !result.value

  return result.value
}
