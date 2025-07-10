import { Suspense } from 'react'
import RedefinirSenhaClient from './RedefinirSenhaClient'

export default function RedefinirSenhaPage() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <RedefinirSenhaClient />
    </Suspense>
  )
}
