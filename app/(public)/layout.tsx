import "../../styles/globals.scss";
import 'leaflet/dist/leaflet.css'
import type { Metadata } from "next";
import Header from "./(componentes)/ui/header";
import Footer from "./(componentes)/ui/footer";
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

export const metadata: Metadata = {
  title: "Sistema de Câmeras | C-COM FM",
  description: "Sistema de câmera C-Com FM - com mapa de cameras e visualização ao-vivo",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${roboto.variable} ${poppins.variable} antialiased`}>
        <Header />
        <main>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
