import type { Metadata } from "next"
import "./globals.css"
import SmoothScroll from "../components/SmoothScroll"

export const metadata: Metadata = {
  title: "PigeonPag — A solução Pix que está em todos os lugares",
  description: "Mais aprovação e menos taxas, a uma integração de distância.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body>
        <SmoothScroll />
        {children}
      </body>
    </html>
  )
}
