"use client"

import { motion } from "framer-motion"
import { Battery, Calendar, Clock, Zap } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import type { PowerData } from "@/lib/types"

interface EnergyUsageCardProps {
  data: PowerData
}

export function EnergyUsageCard({ data }: EnergyUsageCardProps) {
  const { totalEnergy } = data

  // Calculate daily target (for demonstration)
  const dailyTarget = 2000 // Wh
  const progress = Math.min(100, (totalEnergy / dailyTarget) * 100)

  // Get current date and time
  const now = new Date()
  const date = now.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })
  const time = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-primary" />
          Résumé de Consommation d'Énergie
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">{date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">{time}</span>
            </div>
            <div className="flex items-center gap-2">
              <Battery className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">État de la batterie : Excellent</span>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-medium">Consommation Quotidienne</span>
                <span className="text-sm font-medium">
                  {totalEnergy.toFixed(2)} Wh / {dailyTarget} Wh
                </span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>

            <div className="rounded-lg bg-muted p-4">
              <h4 className="mb-2 text-sm font-medium">Conseils d'Économie d'Énergie</h4>
              <ul className="text-xs text-muted-foreground">
                <motion.li
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="mb-1"
                >
                  Optimisez l'angle des panneaux solaires pour une exposition maximale
                </motion.li>
                <motion.li
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="mb-1"
                >
                  Nettoyez régulièrement les panneaux pour une meilleure efficacité
                </motion.li>
                <motion.li initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
                  Planifiez les activités à forte consommation pendant les heures de pointe d'ensoleillement
                </motion.li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

