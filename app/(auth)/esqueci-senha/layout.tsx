import type { Metadata } from "next";
import { Roboto, Poppins } from "next/font/google"
import "../../../styles/globals.scss"
import styles from './login.module.scss'

const roboto = Roboto({
  weight: ['300', '500', '600', '700'],
  variable: "--font-roboto",
  subsets: ["latin"],
});

const poppins = Poppins({
  weight: ['300', '400', '500', '600'],
  variable: "--font-poppins",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Esqueci Senha | Câmeras C-Com",
  description: "Recuperar acesso ao painel de câmeras da C-Com FM.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${roboto.variable} ${poppins.variable} antialiased`}
      >
        <div className={styles.mainContainer}>
          {children}
        </div>
      </body>
    </html>
  );
}