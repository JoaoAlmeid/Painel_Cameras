'use client'

import Link from 'next/link'
import Image from 'next/image'
import styles from './header.module.scss'
import RedesSociaisRadio from './redesSociais'
import { Button } from '@mui/material'
import { FaHeadphonesAlt } from 'react-icons/fa'

export default function Header() {
  const siteRadio = "https://ccomfm.com.br"
  const oucaAgora = "https://ccomfm.com.br/ao-vivo"

  return (
    <header className={styles.header}>
      <div className={styles.col_right}>
        <Button 
          variant="text" 
          href={oucaAgora || siteRadio} 
          endIcon={<FaHeadphonesAlt 
          className={styles.icon_ouca} />}
        >
          Ouça Agora!
        </Button>
      </div>
      <div className={styles.col_middle}>
        <Link href={'/'}>
          <Image
            src={'/imagens/Logo_App.png'}
            alt='Logo C-Com FM'
            width={100}
            height={32}
          />
        </Link>
      </div>
      <div className={styles.col_left}>
        <RedesSociaisRadio />
      </div>
    </header>
  )
}
