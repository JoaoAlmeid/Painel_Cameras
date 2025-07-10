import type { Metadata } from "next";

export const metadate: Metadata = {
    title: "Câmera | Câmeras C-Com",
    description: "Câmera C-Com FM.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {children}
    </>
  );
}