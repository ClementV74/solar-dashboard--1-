"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { PowerData } from "@/lib/types"

interface PowerChartsProps {
  data: PowerData
}

export function PowerCharts({ data }: PowerChartsProps) {
  const [activeTab, setActiveTab] = useState("power")

  // Utiliser les données d'historique de l'API
  const chartData = data.history

  // Définir les couleurs pour chaque métrique
  const colors = {
    power: "#10b981", // vert
    voltage: "#3b82f6", // bleu
    current: "#f59e0b", // jaune
  }

  // Calculer les valeurs min et max pour l'axe Y
  const getYDomain = () => {
    if (activeTab === "power") {
      const values = chartData.map((item) => item.power)
      const max = Math.max(...values, 60) // Au moins 60W pour la puissance
      return [0, Math.ceil(max / 15) * 15] // Arrondir au multiple de 15 supérieur
    } else if (activeTab === "voltage") {
      const values = chartData.map((item) => item.voltage)
      const max = Math.max(...values, 250) // Au moins 250V pour la tension
      return [0, Math.ceil(max / 50) * 50] // Arrondir au multiple de 50 supérieur
    } else {
      const values = chartData.map((item) => item.current)
      const max = Math.max(...values, 15) // Au moins 15A pour le courant
      return [0, Math.ceil(max / 5) * 5] // Arrondir au multiple de 5 supérieur
    }
  }

  // Générer les ticks pour l'axe Y
  const getYTicks = () => {
    const [min, max] = getYDomain()
    const step = (max - min) / 4 // 4 intervalles pour 5 ticks
    return [min, min + step, min + 2 * step, min + 3 * step, max]
  }

  return (
    <Card className="bg-[#0f172a] text-white border-none">
      <CardHeader>
        <CardTitle>Historique de Puissance</CardTitle>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-2">
          <TabsList className="bg-[#1e293b]">
            <TabsTrigger value="power" className="data-[state=active]:bg-[#334155] data-[state=active]:text-white">
              Puissance
            </TabsTrigger>
            <TabsTrigger value="voltage" className="data-[state=active]:bg-[#334155] data-[state=active]:text-white">
              Tension
            </TabsTrigger>
            <TabsTrigger value="current" className="data-[state=active]:bg-[#334155] data-[state=active]:text-white">
              Courant
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent>
        <motion.div
          key={activeTab}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="h-[400px] w-full"
        >
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
              <XAxis
                dataKey="time"
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tick={{ fill: "#888888" }}
              />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                domain={getYDomain()}
                ticks={getYTicks()}
                tick={{ fill: "#888888" }}
                tickFormatter={(value) => {
                  const unit = activeTab === "power" ? "W" : activeTab === "voltage" ? "V" : "A"
                  return `${value}${unit}`
                }}
              />
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1e293b",
                  borderColor: "#475569",
                  borderRadius: "0.5rem",
                  fontSize: "0.875rem",
                  color: "white",
                }}
                formatter={(value, name) => {
                  const unit = name === "power" ? "W" : name === "voltage" ? "V" : "A"
                  const nameTranslation = {
                    power: "Puissance",
                    voltage: "Tension",
                    current: "Courant",
                  }
                  return [
                    `${Number.parseFloat(value).toFixed(2)} ${unit}`,
                    nameTranslation[name as keyof typeof nameTranslation],
                  ]
                }}
              />
              {activeTab === "power" && (
                <Area
                  type="monotone"
                  dataKey="power"
                  stroke={colors.power}
                  strokeWidth={2}
                  fill={colors.power}
                  fillOpacity={0.5}
                  isAnimationActive={true}
                />
              )}
              {activeTab === "voltage" && (
                <Area
                  type="monotone"
                  dataKey="voltage"
                  stroke={colors.voltage}
                  strokeWidth={2}
                  fill={colors.voltage}
                  fillOpacity={0.5}
                  isAnimationActive={true}
                />
              )}
              {activeTab === "current" && (
                <Area
                  type="monotone"
                  dataKey="current"
                  stroke={colors.current}
                  strokeWidth={2}
                  fill={colors.current}
                  fillOpacity={0.5}
                  isAnimationActive={true}
                />
              )}
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>
      </CardContent>
    </Card>
  )
}

