"use client"

import { useEffect, useState } from "react"
import type { PowerData } from "@/lib/types"

const API_URL = "https://feegaffe.fr/solar/solar.php"

export function usePowerData() {
  const [data, setData] = useState<PowerData | null>(null)
  const [history, setHistory] = useState<{ time: string; power: number; voltage: number; current: number }[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL)
        if (!response.ok) throw new Error("Erreur de récupération des données")

        const jsonData = await response.json()

        const formattedData: PowerData = {
          voltage: parseFloat(jsonData.voltage),
          current: parseFloat(jsonData.current),
          power: parseFloat(jsonData.power),
          batteryLevel: parseFloat(jsonData.battery_level),
          totalEnergy: parseFloat(jsonData.total_energy),
          solarPower: parseFloat(jsonData.solar_power),
          history: [], // On gère l'historique séparément
        }

        setData(formattedData)

        // Ajouter aux historiques (max 24 entrées)
        setHistory((prevHistory) => {
          const newEntry = {
            time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            power: formattedData.power,
            voltage: formattedData.voltage,
            current: formattedData.current,
          }
          return [...prevHistory.slice(-23), newEntry] // Garde max 24 entrées
        })
      } catch (err) {
        setError(err as Error)
      } finally {
        setIsLoading(false)
      }
    }

    // Premier appel direct
    fetchData()

    // Rafraîchir toutes les 5 secondes
    const interval = setInterval(fetchData, 5000)

    return () => clearInterval(interval)
  }, [])

  return { data, history, isLoading, error }
}
