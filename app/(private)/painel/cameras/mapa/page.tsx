import type { Metadata } from "next";
import MapaPageClient from "./pageClient";

export const metadata: Metadata = {
  title: "Mapa de Câmeras | C-COM FM"
}

export default function MapaPage() {
  return (
    <MapaPageClient />
  )
}
