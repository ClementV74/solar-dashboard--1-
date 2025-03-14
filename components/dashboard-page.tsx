"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

import { usePowerData } from "@/hooks/use-power-data"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { PowerMetrics } from "@/components/power-metrics"
import { PowerFlowDiagram } from "@/components/power-flow-diagram"
import { PowerCharts } from "@/components/power-charts"
import { LoadingScreen } from "@/components/loading-screen"
import { EnergyUsageCard } from "@/components/energy-usage-card"
import { useTheme } from "@/hooks/use-theme"

export function DashboardPage() {
  const { data, isLoading, error } = usePowerData()
  const [isMounted, setIsMounted] = useState(false)
  const { theme } = useTheme() // Ajouter cette ligne

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null

  if (isLoading) return <LoadingScreen />

  if (error) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background text-foreground">
        <div className="rounded-lg bg-card p-8 shadow-lg">
          <h2 className="mb-4 text-2xl font-bold text-destructive">Erreur de Connexion</h2>
          <p>Impossible de se connecter au système de surveillance d'énergie. Veuillez vérifier votre connexion.</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`flex h-screen w-full flex-col bg-background text-foreground ${theme}`}>
      <DashboardHeader />
      <div className="flex flex-1 overflow-hidden">
        <DashboardSidebar />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid gap-6"
          >
            <PowerMetrics data={data} />
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <PowerFlowDiagram data={data} />
              <PowerCharts data={data} />
            </div>
            <EnergyUsageCard data={data} />
          </motion.div>
        </main>
      </div>
    </div>
  )
}

