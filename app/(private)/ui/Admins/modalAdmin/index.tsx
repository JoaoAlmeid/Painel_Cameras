'use client'

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Alert
} from '@mui/material'
import { useState, useEffect } from 'react'
import { AxiosError } from 'axios'
import type { ModalAdminProps } from '@/types/admins'
import api from '@/utils/api'

export default function ModalAdmin({
  open,
  onClose,
  onSuccess,
  adminEdit
}: ModalAdminProps) {
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const isEdicao = !!adminEdit

  useEffect(() => {
    if (adminEdit) {
      setNome(adminEdit.nome || '')
      setEmail(adminEdit.email)
      setSenha('')
    } else {
      setNome('')
      setEmail('')
      setSenha('')
    }

    setErro(null)
  }, [adminEdit, open])

  async function handleSubmit() {
    setErro(null)
    setLoading(true)

    try {
      if (isEdicao) {
        await api.put('/admin/atualizar', {
          adminId: adminEdit!.adminId,
          email,
          senha: senha || undefined,
          nome,
        })
      } else {
        await api.post('/admin/criar', {
          email,
          senha,
          nome
        })
      }

      onSuccess()
      onClose()
    } catch (error) {
      const err = error as AxiosError<{ erro: string }>
      setErro(err.response?.data?.erro || 'Erro ao salvar administrador')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{isEdicao ? 'Editar Administrador' : 'Novo Administrador'}</DialogTitle>
      <DialogContent>
        {erro && <Alert severity="error" sx={{ mb: 2 }}>{erro}</Alert>}

        <TextField
          label="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          fullWidth
          margin="normal"
        />

        <TextField
          label="E-mail"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          margin="normal"
        />

        <TextField
          label={isEdicao ? 'Nova Senha (opcional)' : 'Senha'}
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          fullWidth
          margin="normal"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={loading}>Cancelar</Button>
        <Button onClick={handleSubmit} variant="contained" disabled={loading}>
          {isEdicao ? 'Salvar Alterações' : 'Criar'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
