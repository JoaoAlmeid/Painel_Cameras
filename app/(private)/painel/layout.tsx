import type { Metadata } from "next";
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import SideBar from "../ui/painel/HeaderSidebar/Sidebar";
import '../../../styles/globals.scss'
import 'leaflet/dist/leaflet.css'

export const metadata: Metadata = {
  title: {
    default: "Painel",
    template: "%s | Painel"
  },
  description: "Painel de administração do sistema.",
};

export default async function PainelLayout({ children }: { children: React.ReactNode }) {
    const cookieStore = cookies();
    const token = (await cookieStore).get('token');

    if (!token) {
        redirect('/login');
    }

    return (
      <html lang="pt-BR">
        <body>
          <div>
              <SideBar>{children}</SideBar>
          </div>
        </body>
      </html>
    )
}