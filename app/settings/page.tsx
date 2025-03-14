"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Clock, Moon, Save, Sun, Zap } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { toast } from "@/hooks/use-toast"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { useTheme } from "@/hooks/use-theme"

export default function SettingsPage() {
  const { theme, setTheme } = useTheme()
  const [notifications, setNotifications] = useState(true)
  const [autoUpdate, setAutoUpdate] = useState(true)
  const [refreshInterval, setRefreshInterval] = useState("5")
  const [batteryThreshold, setBatteryThreshold] = useState(20)
  const [systemName, setSystemName] = useState("Système Solaire Principal")

  const handleSave = () => {
    toast({
      title: "Paramètres sauvegardés",
      description: "Vos préférences ont été mises à jour avec succès.",
    })
  }

  return (
    <div className="flex h-screen w-full flex-col bg-background text-foreground">
      <DashboardHeader />
      <div className="flex flex-1 overflow-hidden">
        <DashboardSidebar />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-4xl"
          >
            <div className="mb-6">
              <h1 className="text-2xl font-bold">Paramètres</h1>
              <p className="text-muted-foreground">Gérez vos préférences et configurations du système</p>
            </div>

            <Tabs defaultValue="general" className="w-full">
              <TabsList className="mb-4 grid w-full grid-cols-3">
                <TabsTrigger value="general">Général</TabsTrigger>
                <TabsTrigger value="system">Système</TabsTrigger>
                <TabsTrigger value="notifications">Notifications</TabsTrigger>
              </TabsList>

              <TabsContent value="general">
                <Card>
                  <CardHeader>
                    <CardTitle>Paramètres Généraux</CardTitle>
                    <CardDescription>Configurez les paramètres généraux de l'interface utilisateur</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="system-name">Nom du Système</Label>
                      <Input id="system-name" value={systemName} onChange={(e) => setSystemName(e.target.value)} />
                    </div>

                    <div className="space-y-2">
                      <Label>Thème</Label>
                      <RadioGroup value={theme} onValueChange={setTheme} className="flex gap-4">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="light" id="light" />
                          <Label htmlFor="light" className="flex items-center gap-1">
                            <Sun className="h-4 w-4" /> Clair
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="dark" id="dark" />
                          <Label htmlFor="dark" className="flex items-center gap-1">
                            <Moon className="h-4 w-4" /> Sombre
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="system" id="system" />
                          <Label htmlFor="system">Système</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="refresh">Intervalle de Rafraîchissement</Label>
                      <Select value={refreshInterval} onValueChange={setRefreshInterval}>
                        <SelectTrigger id="refresh">
                          <SelectValue placeholder="Sélectionnez un intervalle" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 seconde</SelectItem>
                          <SelectItem value="5">5 secondes</SelectItem>
                          <SelectItem value="10">10 secondes</SelectItem>
                          <SelectItem value="30">30 secondes</SelectItem>
                          <SelectItem value="60">1 minute</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="auto-update">Mise à jour automatique</Label>
                        <p className="text-sm text-muted-foreground">
                          Mettre à jour automatiquement les données en temps réel
                        </p>
                      </div>
                      <Switch id="auto-update" checked={autoUpdate} onCheckedChange={setAutoUpdate} />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="system">
                <Card>
                  <CardHeader>
                    <CardTitle>Paramètres du Système Solaire</CardTitle>
                    <CardDescription>
                      Configurez les paramètres spécifiques à votre installation solaire
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label>Seuil d'alerte de batterie faible ({batteryThreshold}%)</Label>
                        <span className="text-sm text-muted-foreground">{batteryThreshold}%</span>
                      </div>
                      <Slider
                        value={[batteryThreshold]}
                        min={5}
                        max={50}
                        step={1}
                        onValueChange={(value) => setBatteryThreshold(value[0])}
                      />
                      <p className="text-xs text-muted-foreground">
                        Vous recevrez une alerte lorsque la batterie descendra en dessous de ce seuil
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="panel-type">Type de Panneau Solaire</Label>
                      <Select defaultValue="monocrystalline">
                        <SelectTrigger id="panel-type">
                          <SelectValue placeholder="Sélectionnez un type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="monocrystalline">Monocristallin</SelectItem>
                          <SelectItem value="polycrystalline">Polycristallin</SelectItem>
                          <SelectItem value="thinfilm">Film mince</SelectItem>
                          <SelectItem value="bifacial">Bifacial</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="battery-type">Type de Batterie</Label>
                      <Select defaultValue="lithium">
                        <SelectTrigger id="battery-type">
                          <SelectValue placeholder="Sélectionnez un type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="lithium">Lithium-ion</SelectItem>
                          <SelectItem value="leadacid">Plomb-acide</SelectItem>
                          <SelectItem value="agm">AGM</SelectItem>
                          <SelectItem value="gel">Gel</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="inverter-power">Puissance de l'Onduleur (W)</Label>
                      <Input id="inverter-power" type="number" defaultValue="2000" />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="notifications">
                <Card>
                  <CardHeader>
                    <CardTitle>Paramètres de Notification</CardTitle>
                    <CardDescription>Configurez comment et quand vous souhaitez être notifié</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="notifications">Notifications</Label>
                        <p className="text-sm text-muted-foreground">Activer les notifications du système</p>
                      </div>
                      <Switch id="notifications" checked={notifications} onCheckedChange={setNotifications} />
                    </div>

                    <div className="space-y-2">
                      <Label>Types d'Alertes</Label>
                      <div className="grid gap-2">
                        <div className="flex items-center space-x-2">
                          <Switch id="battery-alert" defaultChecked />
                          <Label htmlFor="battery-alert" className="flex items-center gap-1">
                            <Zap className="h-4 w-4 text-yellow-500" /> Batterie faible
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch id="system-alert" defaultChecked />
                          <Label htmlFor="system-alert">Erreurs système</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch id="performance-alert" defaultChecked />
                          <Label htmlFor="performance-alert">Problèmes de performance</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch id="maintenance-alert" defaultChecked />
                          <Label htmlFor="maintenance-alert">Rappels de maintenance</Label>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="quiet-hours">Heures de Silence</Label>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="start-time" className="text-xs">
                            Début
                          </Label>
                          <div className="flex items-center">
                            <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                            <Input id="start-time" type="time" defaultValue="22:00" />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="end-time" className="text-xs">
                            Fin
                          </Label>
                          <div className="flex items-center">
                            <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                            <Input id="end-time" type="time" defaultValue="07:00" />
                          </div>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Aucune notification ne sera envoyée pendant ces heures
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            <div className="mt-6 flex justify-end">
              <Button onClick={handleSave} className="flex items-center gap-2">
                <Save className="h-4 w-4" />
                Sauvegarder les Paramètres
              </Button>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  )
}

