'use client'

import Link from 'next/link'
import { FaHome, FaVideo, FaMapMarkedAlt, FaUsers, FaSignOutAlt } from 'react-icons/fa'
import styles from './style.module.scss'
import { MouseEvent } from 'react'
import { logout } from '@/utils/logout'

interface DrawerMenuProps {
  open: boolean
  usuarioId: string
}

const menuItems = [
  { label: 'Painel', href: '/painel', icon: <FaHome /> },
  { label: 'Câmeras', href: '/painel/cameras', icon: <FaVideo /> },
  { label: 'Mapa', href: '/painel/cameras/mapa', icon: <FaMapMarkedAlt /> },
  { label: 'Administradores', href: '/painel/admin/todos', icon: <FaUsers /> },
]

export default function ListMenu({ open }: DrawerMenuProps) {
    const handleLogout = async (e: MouseEvent) => {
        e.preventDefault()
        await logout()
    }

    return (
        <nav className={styles.menu}>
            {menuItems.map((item) => (
                <Link 
                    key={item.href} 
                    href={item.href} 
                    className={`${styles.menuItem} ${open ? styles.show : styles.hide}`}
                >
                    <span className={styles.icon}>{item.icon}</span>
                    <span className={`${styles.label} ${open ? styles.show : styles.hide}`}>{item.label}</span>
                </Link>
            ))}
                <Link 
                    href='/sair'
                    onClick={handleLogout}
                    className={`${styles.menuItem} ${open ? styles.show : styles.hide}`}
                >
                    <span className={styles.icon}><FaSignOutAlt /></span>
                    <span className={`${styles.label} ${open ? styles.show : styles.hide}`}>Sair</span>
                </Link>
        </nav>
    )
}
