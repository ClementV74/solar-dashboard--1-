"use client"

import { cn } from "@/lib/utils"

import { motion } from "framer-motion"
import { Battery, Zap, ZapOff } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { PowerData } from "@/lib/types"

interface PowerMetricsProps {
  data: PowerData
}

export function PowerMetrics({ data }: PowerMetricsProps) {
  const { voltage, current, power, batteryLevel, totalEnergy } = data

  const metrics = [
    {
      title: "Tension",
      value: `${voltage.toFixed(1)} V`,
      icon: Zap,
      color: "text-blue-500",
    },
    {
      title: "Courant",
      value: `${current.toFixed(2)} A`,
      icon: Zap,
      color: "text-yellow-500",
    },
    {
      title: "Puissance",
      value: `${power.toFixed(2)} W`,
      icon: ZapOff,
      color: "text-green-500",
    },
    {
      title: "Batterie",
      value: `${batteryLevel.toFixed(2)}%`,
      icon: Battery,
      color: "text-purple-500",
    },
  ]

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric, index) => (
        <motion.div
          key={metric.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
              <metric.icon className={cn("h-4 w-4", metric.color)} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              {metric.title === "Batterie" && (
                <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-muted">
                  <motion.div
                    className="h-full bg-primary"
                    initial={{ width: 0 }}
                    animate={{ width: `${batteryLevel}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  />
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}

