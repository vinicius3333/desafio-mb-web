import { useUserApi } from '../useUserApi'
import { createUser } from '@/services/userService'
import { describe, expect, beforeEach, vi, it } from 'vitest'

vi.mock('@/services/userService', () => ({
  createUser: vi.fn(),
}))

describe('useUserApi', () => {
  const alertMock = vi.spyOn(window, 'alert').mockImplementation(() => {})

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should changes loading property to true and false and call window.alert with success message', async () => {
    const data = {}
    createUser.mockResolvedValueOnce(undefined)

    const { registerUser, loading } = useUserApi()
    const promise = registerUser(data)

    expect(loading.value).toBe(true)

    await promise

    expect(createUser).toHaveBeenCalledWith(data)
    expect(alertMock).toHaveBeenCalledWith('Sucesso na criação do usuário')
    expect(loading.value).toBe(false)
  })

  it('should changes loading property to true and false and call window.alert with error message', async () => {
    const data = {}
    createUser.mockRejectedValueOnce(new Error('Erro'))

    const { registerUser, loading } = useUserApi()
    const promise = registerUser(data)

    expect(loading.value).toBe(true)

    await promise

    expect(createUser).toHaveBeenCalledWith(data)
    expect(alertMock).toHaveBeenCalledWith('Erro ao criar usuário')
    expect(loading.value).toBe(false)
  })
})
