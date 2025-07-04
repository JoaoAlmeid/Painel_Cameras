'use client'

import { AppBar, Toolbar, IconButton, Box } from '@mui/material'
import { FaWhatsapp, FaUserCircle } from 'react-icons/fa'
import Link from 'next/link'
import Image from 'next/image'
import styles from './header.module.scss'

export default function Header() {
  const numeroZap = process.env.NUMBER_WPP || 'https://ccomfm.com.br/contato'

  return (
    <AppBar position="sticky" className={styles.header} elevation={1}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {/* Botão WhatsApp */}
        <Link href={numeroZap} target="_blank">
          <IconButton color="primary">
            <FaWhatsapp className={styles.icon} />
          </IconButton>
        </Link>

        {/* Logo Centralizado */}
        <Box sx={{ flexGrow: 1, textAlign: 'center' }}>
          <Link href={'/'}>
            <Image
                src={'/imagens/Logo_App.png'}
                alt='Logo C-Com FM'
                width={100}
                height={32}
            />
          </Link>
        </Box>

        {/* Ícone de Usuário */}
        <Link href="/login">
          <IconButton color="primary">
            <FaUserCircle className={styles.icon} />
          </IconButton>
        </Link>
      </Toolbar>
    </AppBar>
  )
}
