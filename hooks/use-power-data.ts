"use client"

import { useEffect, useState } from "react"
import type { PowerData } from "@/lib/types"

const API_URL = "https://feegaffe.fr/solar/solar.php"

export function usePowerData() {
  const [data, setData] = useState<PowerData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL)
        if (!response.ok) throw new Error("Erreur de récupération des données")

        const jsonData = await response.json()

        setData((prevData) => {
          const newData: PowerData = {
            voltage: parseFloat(jsonData.voltage),
            current: parseFloat(jsonData.current),
            power: parseFloat(jsonData.power),
            batteryLevel: parseFloat(jsonData.battery_level),
            totalEnergy: parseFloat(jsonData.total_energy),
            solarPower: parseFloat(jsonData.solar_power),
            history: prevData
              ? [
                  ...prevData.history.slice(-23), // Garde max 24 entrées
                  {
                    time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
                    power: parseFloat(jsonData.power),
                    voltage: parseFloat(jsonData.voltage),
                    current: parseFloat(jsonData.current),
                  },
                ]
              : [],
          }
          return newData
        })
      } catch (err) {
        setError(err as Error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
    const interval = setInterval(fetchData, 5000)

    return () => clearInterval(interval)
  }, [])

  return { data, isLoading, error }
}
