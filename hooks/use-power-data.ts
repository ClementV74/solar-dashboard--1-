"use client"

import { useEffect, useState } from "react"
import type { PowerData } from "@/lib/types"

const API_REALTIME = "https://feegaffe.fr/solar/solar.php"
const API_HISTORY = "https://feegaffe.fr/solar/get_history.php"

export function usePowerData() {
  const [data, setData] = useState<PowerData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await fetch(API_HISTORY)
        if (!response.ok) throw new Error("Erreur de récupération de l'historique")

        const jsonData = await response.json()
        const formattedHistory = jsonData.map((entry: any) => ({
          time: new Date(entry.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          power: parseFloat(entry.power),
          voltage: parseFloat(entry.voltage),
          current: parseFloat(entry.current),
        }))

        setData({
          voltage: parseFloat(jsonData[0].voltage),
          current: parseFloat(jsonData[0].current),
          power: parseFloat(jsonData[0].power),
          batteryLevel: parseFloat(jsonData[0].battery_level),
          totalEnergy: parseFloat(jsonData[0].total_energy),
          solarPower: parseFloat(jsonData[0].solar_power),
          history: formattedHistory.reverse(),
        })

        setIsLoading(false)
      } catch (err) {
        setError(err as Error)
        setIsLoading(false)
      }
    }

    const fetchRealtimeData = async () => {
      try {
        const response = await fetch(API_REALTIME)
        if (!response.ok) throw new Error("Erreur de récupération des données")

        const jsonData = await response.json()

        setData((prevData) => {
          if (!prevData) return null

          const newEntry = {
            time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            power: parseFloat(jsonData.power),
            voltage: parseFloat(jsonData.voltage),
            current: parseFloat(jsonData.current),
          }

          return {
            voltage: parseFloat(jsonData.voltage),
            current: parseFloat(jsonData.current),
            power: parseFloat(jsonData.power),
            batteryLevel: parseFloat(jsonData.battery_level),
            totalEnergy: parseFloat(jsonData.total_energy),
            solarPower: parseFloat(jsonData.solar_power),
            history: [...prevData.history.slice(-23), newEntry], // Garde 24 entrées max
          }
        })
      } catch (err) {
        setError(err as Error)
      }
    }

    fetchHistory()
    const interval = setInterval(fetchRealtimeData, 5000)

    return () => clearInterval(interval)
  }, [])

  return { data, isLoading, error }
}
