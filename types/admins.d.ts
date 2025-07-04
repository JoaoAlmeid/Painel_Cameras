export interface Admin {
  adminId: string
  email: string
  nome?: string
  nivel: string
  criadoEm: string
  atualizadoEm: string
}

export interface AdminListResponse {
  data: Admin[]
  page: number
  total: number
  totalPages: number
}

export interface AdminCardProps {
  admin: Admin
  onRefresh: () => void
  onEdit: (admin: Admin) => void 
  superId: string
}

export interface ModalAdminProps {
  open: boolean
  onClose: () => void
  onSuccess: () => void
  adminEdit?: Admin | null
  criadoPorId: string
}