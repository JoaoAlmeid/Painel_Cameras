'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { useState } from 'react'
import {
  TextField,
  Button,
  Alert,
  CircularProgress,
} from '@mui/material'
import api from '@/utils/api'
import styles from './page.module.scss'

export default function RedefinirSenhaClient() {
  const searchParams = useSearchParams()
  const token = searchParams.get('token')
  const router = useRouter()

  const [novaSenha, setNovaSenha] = useState('')
  const [mensagem, setMensagem] = useState('')
  const [erro, setErro] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    setMensagem('')
    setErro('')
    setLoading(true)

    try {
      const res = await api.post('/admin/auth/resetar-senha', {
        token,
        novaSenha,
      })

      if (res.status === 200) {
        setMensagem('Senha redefinida com sucesso. Redirecionando para login...')
        setTimeout(() => router.push('/login'), 3000)
      } else {
        setErro('Erro ao redefinir a senha.')
      }
    } catch (error) {
      setErro('Token inválido ou expirado.')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  if (!token) {
    return (
      <div className={styles.container}>
        <Alert severity="error">
          Token ausente ou inválido. Solicite uma nova recuperação de senha.
        </Alert>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.formBox}>
        <h5>Redefinir Senha</h5>

        {mensagem && <Alert severity="success" sx={{ mb: 2 }}>{mensagem}</Alert>}
        {erro && <Alert severity="error" sx={{ mb: 2 }}>{erro}</Alert>}

        <TextField
          label="Nova senha"
          type="password"
          fullWidth
          variant="outlined"
          value={novaSenha}
          onChange={(e) => setNovaSenha(e.target.value)}
          sx={{ mb: 2 }}
        />

        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : 'Redefinir Senha'}
        </Button>
      </div>
    </div>
  )
}
