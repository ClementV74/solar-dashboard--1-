import type React from "react"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Dashboard Énergie Solaire",
  description: "Moniteur d'énergie solaire en temps réel",
  image: "https://feegaffe.fr/logo.png",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={inter.className}>{children}</body>
    </html>
  )
}

import "./globals.css"



import './globals.css'