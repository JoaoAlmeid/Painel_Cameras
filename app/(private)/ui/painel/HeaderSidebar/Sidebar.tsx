'use client'

import { ReactNode, useState } from 'react'
import styles from './style.module.scss'
import { FaBars, FaChevronLeft } from 'react-icons/fa'
import Image from 'next/image'
import { IconButton } from '@mui/material'
import MenuList from './MenuList'

interface HeaderProps {
  children: ReactNode;
}

export default function SideBar({ children }: HeaderProps) {
  const [open, setOpen] = useState(false)

  const toggleDrawer = () => setOpen(!open)

  return (
    <div className={styles.container}>
      <aside className={`${styles.drawer} ${open ? styles.open : styles.closed}`}>
        <div className={styles.header}>
          <Image
            src={open ? '/imagens/Logo_App.png' : '/imagens/Favicon_App.png'}
            alt="Logo"
            width={open ? 100 : 32}
            height={30}
            loading='lazy'
            className={styles.logo}
          />
          <IconButton onClick={toggleDrawer} className={styles.iconToggle}>
            <FaChevronLeft />
          </IconButton>
        </div>
        <MenuList open={open} usuarioId='123' />
      </aside>

      <div className={styles.main}>
        <div className={styles.appBar}>
          {!open && (
            <button className={styles.iconToggle} onClick={toggleDrawer}>
              <FaBars />
            </button>
          )}
          <h1>Câmeras C-Com FM</h1>
        </div>
        <div className={styles.content}>
          {children}
        </div>
      </div>
    </div>
  )
}
