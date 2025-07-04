'use client'

import { Card, CardContent, Typography, Button } from '@mui/material'
import type { Camera } from '@/types/camera'

type CardCameraProps = {
  camera: Camera
}

export default function CameraLista({ camera }: CardCameraProps) {
  return (
    <Card
      sx={{
        mb: 2,
        backgroundColor: camera.ativo ? '#e8f5e9' : '#ffebee',
      }}
    >
      <CardContent>
        <Typography variant="subtitle1">{camera.nome}</Typography>
        <Typography variant="body2" color="textSecondary">
          Status: {camera.ativo ? 'Ativa' : 'Inativa'}
        </Typography>
        {camera.ativo ? 
          <Button
            variant="outlined"
            size="small"
            sx={{ mt: 1 }}
            href={camera.url}
            target="_blank"
          >
            Ver ao Vivo
          </Button>
         : ''}
      </CardContent>
    </Card>
  )
}
