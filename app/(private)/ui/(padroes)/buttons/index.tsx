'use client'

import React from 'react'
import styles from './button.module.scss'

type BotaoProps = {
  children: React.ReactNode
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  className?: string
}

export default function Botao({ children, onClick, type = 'button', className = '' }: BotaoProps) {
  return (
    <button onClick={onClick} type={type} className={`${styles.botao} ${className}`}>
      {children}
    </button>
  )
}
