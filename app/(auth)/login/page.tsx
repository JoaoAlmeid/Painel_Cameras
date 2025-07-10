'use client'

import { MouseEvent, useState } from 'react'
import {
  Button,
  TextField,
  Alert,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from '@mui/material'
import { useRouter } from 'next/navigation'
import api from '@/utils/api'
import Image from 'next/image'
import styles from './login.module.scss'
import { MdVisibility, MdVisibilityOff } from 'react-icons/md'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [erro, setErro] = useState('')
  const router = useRouter()

  const handleClickShowPassword = () => setShowPassword((show) => !show)
  
  const handleMousePassword = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
  }

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
          <FormControl>
            <InputLabel htmlFor="input-senha">Senha</InputLabel>
            <OutlinedInput
              id='input-senha'
              type={showPassword ? 'text' : 'password'}
              endAdornment={
                <InputAdornment position='end'>
                  <IconButton
                    aria-label={
                      showPassword ? 'Esconder a senha' : 'Exibir a senha'
                    }
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMousePassword}
                    onMouseUp={handleMousePassword}
                    edge="end"
                  >
                    {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Senha"
              onChange={(e) => setSenha(e.target.value)}
            />
          </FormControl>
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
          <Button variant='text' color='primary' href='/esqueci-senha'>
            Esqueci minha Senha
          </Button>
        </div>
      </div>
    </div>
  )
}
