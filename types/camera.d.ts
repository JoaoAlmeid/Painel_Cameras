export interface Camera {
  cameraId: string
  nome: string
  url: string
  ativo: boolean
  localizacao?: string
  latitude: number
  longitude: number
}

export interface ListaCamerasResponse {
  data: Camera[]
  page: number
  total: number
  totalPages: number
}

export interface CameraFormData {
  nome: string
  url: string
  localizacao: string
  latitude: string
  longitude: string
}

export interface ModalAddCameraProps {
  open: boolean
  onClose: () => void
  onSuccess: () => void
  cameraEdit?: Camera | null
}