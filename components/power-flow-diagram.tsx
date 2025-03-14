"use client"

import { motion } from "framer-motion"
import { Battery, Cpu, Zap } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import type { PowerData } from "@/lib/types"

interface PowerFlowDiagramProps {
  data: PowerData
}

export function PowerFlowDiagram({ data }: PowerFlowDiagramProps) {
  const { power, batteryLevel, solarPower } = data

  return (
    <Card>
      <CardContent className="flex h-[500px] items-center justify-center overflow-hidden p-6">
        <div className="relative flex w-full max-w-md flex-col items-center h-full py-6">
          {/* Solar Panel */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="relative z-20 flex flex-col items-center mb-8"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-yellow-500/10 p-2">
              <Zap className="h-7 w-7 text-yellow-500" />
            </div>
            <div className="mt-2 text-sm font-medium">Panneau Solaire</div>
            <div className="text-xs text-muted-foreground">{solarPower.toFixed(1)} W</div>
          </motion.div>

          {/* Power Flow Line - Solar to Battery */}
          <div className="relative h-[35px] w-full mb-12">
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 35, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="absolute left-1/2 top-0 h-[35px] w-0.5 -translate-x-1/2 bg-gradient-to-b from-yellow-500 to-purple-500 z-10"
            >
              {/* Animated energy dots */}
              <motion.div
                className="absolute left-1/2 top-0 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-yellow-500"
                animate={{
                  top: ["0%", "100%"],
                  opacity: [1, 0.7, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
              />
            </motion.div>
          </div>

          {/* Battery */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="relative z-20 flex flex-col items-center mb-8"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-500/10">
              <Battery className="h-7 w-7 text-purple-500" />
            </div>
            <div className="mt-2 text-sm font-medium">Batterie</div>
            <div className="text-xs text-muted-foreground">{batteryLevel.toFixed(2)}%</div>
            <div className="mt-2 h-1 w-20 overflow-hidden rounded-full bg-muted">
              <motion.div
                className="h-full bg-purple-500"
                initial={{ width: 0 }}
                animate={{ width: `${batteryLevel}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
            </div>
          </motion.div>

          {/* Power Flow Line - Battery to Inverter */}
          <div className="relative h-[35px] w-full mb-12">
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 35, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="absolute left-1/2 top-0 h-[35px] w-0.5 -translate-x-1/2 bg-gradient-to-b from-purple-500 to-green-500 z-10"
            >
              {/* Animated energy dots */}
              <motion.div
                className="absolute left-1/2 top-0 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-purple-500"
                animate={{
                  top: ["0%", "100%"],
                  opacity: [1, 0.7, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                  delay: 0.5,
                }}
              />
            </motion.div>
          </div>

          {/* Inverter/Load */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.8 }}
            className="relative z-20 flex flex-col items-center"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500/10 p-2">
              <Cpu className="h-7 w-7 text-green-500" />
            </div>
            <div className="mt-2 text-sm font-medium">Onduleur/Charge</div>
            <div className="text-xs text-muted-foreground">{power.toFixed(1)} W</div>
          </motion.div>
        </div>
      </CardContent>
    </Card>
  )
}

