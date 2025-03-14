"use client"

import { motion } from "framer-motion"
import { Home, Settings, ZapOff } from "lucide-react"
import Link from "next/link"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useSidebar } from "@/hooks/use-sidebar"

const navItems = [
  { icon: Home, label: "Tableau de bord", href: "/" },
  { icon: Settings, label: "Paramètres", href: "/settings" },
]

export function DashboardSidebar() {
  const { isOpen } = useSidebar()

  return (
    <motion.aside
      initial={{ width: 0, opacity: 0 }}
      animate={{
        width: isOpen ? 240 : 0,
        opacity: isOpen ? 1 : 0,
      }}
      className={cn("hidden h-full border-r border-border bg-card md:block", isOpen ? "md:w-60" : "md:w-0")}
    >
      <div className="flex h-full flex-col p-4">
        <div className="mb-8 flex items-center justify-center">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
            <ZapOff className="h-6 w-6 text-primary-foreground" />
          </div>
        </div>
        <nav className="space-y-2">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <Button variant={item.href === "/" ? "default" : "ghost"} className="w-full justify-start">
                <item.icon className="mr-2 h-5 w-5" />
                {item.label}
              </Button>
            </Link>
          ))}
        </nav>
        <div className="mt-auto rounded-lg bg-muted p-4">
          <h3 className="mb-2 font-medium">État du Système</h3>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-green-500"></div>
            <span className="text-sm">En ligne</span>
          </div>
          <div className="mt-2 text-xs text-muted-foreground">
            Dernière mise à jour : {new Date().toLocaleTimeString()}
          </div>
        </div>
      </div>
    </motion.aside>
  )
}

