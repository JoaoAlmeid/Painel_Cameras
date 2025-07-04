'use client'

import { useState } from 'react'
import {
  Button,
  TextField,
  Alert,
} from '@mui/material'
import { useRouter } from 'next/navigation'
import api from '@/utils/api'
import Image from 'next/image'
import styles from './login.module.scss'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')
  const router = useRouter()

  const login = async () => {
    setErro('')
    try {
      const res = await api.post('/admin/auth/login', { email, senha })

      if (res.status === 200) {
        router.replace('/painel')
      } else {
        setErro('Credenciais inválidas')
      }
    } catch (error) {
      setErro('Erro ao fazer login. Verifique suas credenciais.')
      console.error(error)
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.login}>
        <div className={styles.headerLogin}>
          <Image
            src={'/imagens/Logo_App.png'}
            alt='Logo C-Com FM'
            width={100}
            height={32}
          />
          <h5>Login de Administrador</h5>
        </div>

        {erro && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {erro}
          </Alert>
        )}

        <div className={styles.formLogin}>
          <TextField
            label="E-mail"
            variant="outlined"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
          />
          <TextField
            label="Senha"
            variant="outlined"
            fullWidth
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
          <Button variant="contained" color="primary" onClick={login} sx={{ mt: 2 }}>
            Entrar
          </Button>
        </div>
      </div>
    </div>
  )
}
