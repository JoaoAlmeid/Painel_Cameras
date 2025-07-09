import '../../../styles/globals.scss'
import 'leaflet/dist/leaflet.css'
import Head from "next/head";
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import SideBar from "../ui/painel/HeaderSidebar/Sidebar";


export default async function PainelLayout({ children }: { children: React.ReactNode }) {
    const cookieStore = cookies();
    const token = (await cookieStore).get('token');

    if (!token) {
        redirect('/login');
    }

    return (
      <html lang="pt-BR">
        <Head>
          <title>Painel | Câmeras C-Com</title>
          <meta name="description" content="Painel de administração das câmeras" />
        </Head>
        <body>
          <div>
              <SideBar>{children}</SideBar>
          </div>
        </body>
      </html>
    )
}