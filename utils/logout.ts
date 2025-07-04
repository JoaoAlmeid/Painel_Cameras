import api from "./api"

export async function logout() {
  try {
    await api.post('/admin/auth/sair')
  } catch (err) {
    console.error('Erro ao sair:', err)
  } finally {
    window.location.href = '/login'
  }
}
