import { describe, it, expect, vi, beforeAll, afterAll } from 'vitest'
import { createUser } from '../userService'

const mockApiUrl = 'http://localhost:9090'


describe('createUser', () => {
    beforeAll(() => {
        vi.stubEnv('VITE_API_URL', mockApiUrl)
    });

    afterAll(() => {
        vi.unstubAllEnvs();
    });

    it('should return correctly when success', async () => {
        const mockResponseData = { id: 1, name: 'Vinícius' }

        vi.stubGlobal('fetch', vi.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve(mockResponseData),
            })
        ))

        const result = await createUser({ name: 'Vinícius' })

        expect(fetch).toHaveBeenCalledWith(`${mockApiUrl}/registration`, expect.objectContaining({
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: 'Vinícius' }),
        }))

        expect(result).toEqual(mockResponseData)
    })

    it('should throw error when ok:false', async () => {
        const errorMessage = 'Usuário já existe'

        vi.stubGlobal('fetch', vi.fn(() =>
            Promise.resolve({
                ok: false,
                json: () => Promise.resolve({ message: errorMessage }),
            })
        ))

        await expect(createUser({ name: 'Vinícius' })).rejects.toThrow(errorMessage)
    })

    it('should throw generic error when ok:false and not message from service', async () => {
        vi.stubGlobal('fetch', vi.fn(() =>
            Promise.resolve({
                ok: false,
                json: () => Promise.resolve({}),
            })
        ))

        await expect(createUser({ name: 'João' })).rejects.toThrow('Erro ao criar usuário')
    })
})
