'use client'

import { Card, CardContent, Typography, CardActions, IconButton, Avatar } from '@mui/material'
import { Edit, Delete } from '@mui/.icons-material-vjRVHZ9z'
import api from '@/utils/api'
import { AdminCardProps } from '@/types/admins'

export default function AdminCard({ admin, onRefresh, onEdit, superId }: AdminCardProps) {
  const handleDelete = async () => {
    if (confirm(`Deseja remover o admin ${admin.email}?`)) {
      try {
        await api.delete(`/admin/deletar/${admin.adminId}`, {
          data: { superId }
        })
        onRefresh()
      } catch (err) {
        if (err instanceof Error) {
          console.error(err.message)
          alert('Erro ao deletar administrador')   
        } else {
          console.error('Erro desconhecido ao deletar administrador')
          alert('Erro ao deletar administrador')   
        }
      }
    }
  }

  return (
    <Card>
      <CardContent>
        <Avatar sx={{ bgcolor: '#555' }} aria-label='admin'>AD</Avatar>
        <Typography variant="h6">{admin.nome}</Typography>
        <Typography variant="body2">{admin.email}</Typography>
        <Typography variant="caption">{admin.nivel}</Typography>
      </CardContent>
      <CardActions>
        <IconButton onClick={() => onEdit(admin)}><Edit /></IconButton>
        <IconButton color="error" onClick={handleDelete}><Delete /></IconButton>
      </CardActions>
    </Card>
  )
}
