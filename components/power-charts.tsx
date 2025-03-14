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

  // In a real app, this would come from the API with historical data
  const chartData = data.history.map((item) => ({
    time: item.time,
    power: item.power,
    voltage: item.voltage,
    current: item.current,
  }))

  // Define colors for each metric
  const colors = {
    power: "#10b981", // green
    voltage: "#3b82f6", // blue
    current: "#eab308", // yellow
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Historique de Puissance</CardTitle>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-2">
          <TabsList>
            <TabsTrigger value="power">Puissance</TabsTrigger>
            <TabsTrigger value="voltage">Tension</TabsTrigger>
            <TabsTrigger value="current">Courant</TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent>
        <motion.div
          key={activeTab}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="h-[300px] w-full"
        >
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorPower" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={colors.power} stopOpacity={0.8} />
                  <stop offset="95%" stopColor={colors.power} stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorVoltage" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={colors.voltage} stopOpacity={0.8} />
                  <stop offset="95%" stopColor={colors.voltage} stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorCurrent" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={colors.current} stopOpacity={0.8} />
                  <stop offset="95%" stopColor={colors.current} stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="time" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => {
                  const unit = activeTab === "power" ? "W" : activeTab === "voltage" ? "V" : "A"
                  return `${value}${unit}`
                }}
              />
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  borderColor: "hsl(var(--border))",
                  borderRadius: "0.5rem",
                  fontSize: "0.875rem",
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
                  fillOpacity={1}
                  fill="url(#colorPower)"
                  isAnimationActive={true}
                />
              )}
              {activeTab === "voltage" && (
                <Area
                  type="monotone"
                  dataKey="voltage"
                  stroke={colors.voltage}
                  fillOpacity={1}
                  fill="url(#colorVoltage)"
                  isAnimationActive={true}
                />
              )}
              {activeTab === "current" && (
                <Area
                  type="monotone"
                  dataKey="current"
                  stroke={colors.current}
                  fillOpacity={1}
                  fill="url(#colorCurrent)"
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

