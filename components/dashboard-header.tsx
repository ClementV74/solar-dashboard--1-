"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Bell, Menu, Moon, Sun } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useSidebar } from "@/hooks/use-sidebar"
import { useTheme } from "@/hooks/use-theme"

export function DashboardHeader() {
  const { toggleSidebar } = useSidebar()
  const { theme, setTheme } = useTheme()

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex h-16 items-center justify-between border-b border-border bg-card px-4 md:px-6"
    >
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={toggleSidebar} className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Basculer la barre latérale</span>
        </Button>
        <div className="flex items-center gap-2">
          <Sun className="h-6 w-6 text-yellow-500" />
          <div>
            <h1 className="text-xl font-bold">Dashboard</h1>
            <p className="text-xs text-muted-foreground">Moniteur d'Énergie Solaire</p>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
          {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          <span className="sr-only">Changer de thème</span>
        </Button>
        <NotificationsButton />
      </div>
    </motion.header>
  )
}

function NotificationsButton() {
  const [open, setOpen] = useState(false)

  return (
    <div className="relative">
      <Button variant="ghost" size="icon" onClick={() => setOpen(!open)} className="relative">
        <Bell className="h-5 w-5" />
        <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-green-500"></span>
        <span className="sr-only">Notifications</span>
      </Button>

      {open && (
        <div
          className="absolute right-0 top-12 z-[100] w-80 rounded-md border border-border bg-card shadow-lg"
          style={{ position: "fixed", right: "16px" }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-4">
            <h3 className="mb-2 font-medium">Notifications</h3>
            <div className="space-y-2">
              <div className="rounded-md bg-muted p-2 text-sm">
                <p className="font-medium">Batterie à 78%</p>
                <p className="text-xs text-muted-foreground">Il y a 5 minutes</p>
              </div>
              <div className="rounded-md bg-muted p-2 text-sm">
                <p className="font-medium">Production optimale</p>
                <p className="text-xs text-muted-foreground">Il y a 20 minutes</p>
              </div>
            </div>
          </div>
        </div>
      )}
      {open && <div className="fixed inset-0 z-[99]" onClick={() => setOpen(false)} />}
    </div>
  )
}

