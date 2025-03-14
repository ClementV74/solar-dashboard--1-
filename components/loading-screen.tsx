"use client"

import { motion } from "framer-motion"
import { Zap } from "lucide-react"

export function LoadingScreen() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-background">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
        className="flex h-20 w-20 items-center justify-center rounded-full bg-primary"
      >
        <Zap className="h-10 w-10 text-primary-foreground" />
      </motion.div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mt-4 text-lg font-medium"
      >
        Connexion au système de surveillance solaire...
      </motion.p>
    </div>
  )
}

