import { ref } from 'vue'

const status = ref<{ [key: string]: any }>({})

export const setStatus = (key: string, value: any) => {
  status.value = { ...status.value, [key]: value }
}

export const getStatus = (key: string | null = null) => {
  return key === null ? status.value : status.value[key]
}

export const resetStatus = () => {
  status.value = {}
}
