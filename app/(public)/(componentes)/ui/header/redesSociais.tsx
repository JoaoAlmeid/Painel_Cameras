'use client'

import { IconButton } from '@mui/material'
import { 
    FaWhatsapp, 
    FaFacebook, 
    FaInstagram, 
    FaEnvelope, 
    FaYoutube 
} from 'react-icons/fa'
import styles from './header.module.scss'

export default function RedesSociaisRadio() {
    const whatsapp = process.env.WHATSAPP_RADIO || "https://ccomfm.com.br/"
    const facebook = process.env.FACEBOOK_RADIO || "https://ccomfm.com.br/"
    const instagram = process.env.INSTAGRAM_RADIO || "https://ccomfm.com.br/"
    const mail = process.env.EMAIL_RADIO  || "https://ccomfm.com.br/"
    const youtube = process.env.YOUTUBE_RADIO || "https://ccomfm.com.br/"
    
    return (
      <div className={styles.container_redes}>
          <IconButton href={whatsapp}>
              <FaWhatsapp className={styles.icon} />
          </IconButton>
          <IconButton href={facebook}>
              <FaFacebook className={styles.icon} />
          </IconButton>
          <IconButton href={instagram}>
              <FaInstagram className={styles.icon} />
          </IconButton>
          <IconButton href={`mailto:${mail}`}>
              <FaEnvelope className={styles.icon} />
          </IconButton>
          <IconButton href={youtube}>
              <FaYoutube className={styles.icon} />
          </IconButton>
      </div>
    )
}
