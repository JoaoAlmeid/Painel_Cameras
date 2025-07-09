import "../../styles/globals.scss";
import 'leaflet/dist/leaflet.css'
import Head from "next/head";
import Header from "./(componentes)/ui/header";
import Footer from "./(componentes)/ui/footer";
import styles from './page.module.scss'
import { Roboto, Poppins } from "next/font/google";

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
        <title>Cameras C-Com FM - 102,7 Além Paraiba</title>
        <meta name="description" content="Sistema de câmera C-Com FM - com mapa de cameras e visualização ao-vivo" />
        <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
      </Head>
      <body
        className={`${roboto.variable} ${poppins.variable} antialiased`}
        >
        <Header />
        <main className={styles.mainContainer}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
