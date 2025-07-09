import Head from "next/head";
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <Head>
          <title>Login | Câmeras C-Com</title>
      </Head>
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
