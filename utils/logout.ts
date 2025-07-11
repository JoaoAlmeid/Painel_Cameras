import api from "./api"

export async function logout() {
  try {
    await api.post('/admin/auth/sair', null, {
      withCredentials: true
    })

    // Limpa cookies acessíveis via JS
    document.cookie.split(';').forEach(cookie => {
      const nome = cookie.split('=')[0].trim()
      document.cookie = `${nome}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.ccomfm.com.br`
    })

    // Redireciona
    window.location.href = '/'
  } catch (err) {
    console.error('Erro ao sair do painel:', err)
  }
}
