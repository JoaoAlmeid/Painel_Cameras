'use client'

import Image from 'next/image'
import styles from './footer.module.scss'
import Link from 'next/link'

export default function Footer() {
  const anoAtual = new Date().getFullYear()

  return (
    <footer className={styles.footer}>
      <span className={styles.copy}>
        C-COM FM - Além Paraíba © {anoAtual} - Todos os direitos reservados.
      </span>
      <span className={styles.dev}>
        Desenvolvido por 
        <Link href='https://acrie.com.br' target='_blank'>
          <Image
            src='/imagens/Logo_Acrie.png'
            alt='Logo Acrie'
            width={35}
            height={12}
          />
        </Link>
      </span>
    </footer>
  )
}
