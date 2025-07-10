'use client'

import { useState } from 'react'
import {
  Button,
  TextField,
  Alert,
  CircularProgress,
} from '@mui/material'
import api from '@/utils/api'
import styles from './page.module.scss'

export default function RecuperarSenhaPage() {
  const [email, setEmail] = useState('')
  const [mensagem, setMensagem] = useState('')
  const [erro, setErro] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    setMensagem('')
    setErro('')
    setLoading(true)

    try {
      const res = await api.post('/admin/auth/esqueci-senha', { email })

      if (res.status === 200) {
        setMensagem(res.data.message || 'Instruções de recuperação enviadas.')
      } else {
        setErro('Falha ao enviar o e-mail de recuperação.')
      }
    } catch (error) {
      setErro('Erro ao processar a recuperação. Verifique o e-mail.')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.formBox}>
        <h5>Recuperação de Senha</h5>

        {mensagem && <Alert severity="success" sx={{ mb: 2 }}>{mensagem}</Alert>}
        {erro && <Alert severity="error" sx={{ mb: 2 }}>{erro}</Alert>}

        <TextField
          label="E-mail cadastrado"
          fullWidth
          type="email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ mb: 2 }}
        />

        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : 'Enviar Código'}
        </Button>
      </div>
    </div>
  )
}
