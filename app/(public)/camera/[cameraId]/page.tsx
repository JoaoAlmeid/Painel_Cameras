import { Metadata } from "next";
import CameraPageClient from "./pageClient";

export const metadata: Metadata =  {
  title: "Câmera | C-COM FM"
}

export default function CameraPagina() {
  return (
    <CameraPageClient />
  )
}
