export async function createUser(payload) {
  // Could be better call an external config file for this
  const API_URL = import.meta.env.VITE_API_URL

  const response = await fetch(`${API_URL}/registration`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'Erro ao criar usuário')
  }

  return response.json()
}
