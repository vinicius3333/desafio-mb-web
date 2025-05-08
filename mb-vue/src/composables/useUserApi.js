import { ref } from 'vue'
import { createUser } from '@/services/userService'

export function useUserApi() {
  const loading = ref(false)

  async function registerUser(data) {
    loading.value = true

    try {
      await createUser(data)
      alert('Sucesso na criação do usuário')
    } catch (err) {
      alert('Erro ao criar usuário')
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    registerUser,
  }
}
