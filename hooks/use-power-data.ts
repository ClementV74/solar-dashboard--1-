"use client"

import { useEffect, useState, useRef } from "react"
import type { PowerData } from "@/lib/types"

const API_URL = "https://solary.vabre.ch/GetAllMesuresEnergie"

export function usePowerData() {
  const [data, setData] = useState<PowerData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const lastFetchedDataRef = useRef<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL)
        if (!response.ok) throw new Error("Erreur de récupération des données")

        const jsonData = await response.json()

        // Vérifier si les données ont changé pour éviter les re-rendus inutiles
        const dataString = JSON.stringify(jsonData)
        if (dataString === lastFetchedDataRef.current && data !== null) {
          return // Ne pas mettre à jour si les données sont identiques
        }

        lastFetchedDataRef.current = dataString

        // Trier les données par date (plus récente en premier)
        const sortedData = [...jsonData].sort(
          (a, b) => new Date(b.measure_date).getTime() - new Date(a.measure_date).getTime(),
        )

        // Obtenir la dernière mesure valide
        const latestData = sortedData[0]

        // Formater l'historique (limité aux 24 dernières entrées)
        const formattedHistory = sortedData
          .slice(0, 24)
          .map((entry) => ({
            time: new Date(entry.measure_date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            power: Number.parseFloat(entry.power) || 0,
            voltage: Number.parseFloat(entry.voltage) || 0,
            current: Number.parseFloat(entry.current) || 0,
          }))
          .reverse() // Inverser pour avoir l'ordre chronologique

        setData({
          voltage: Number.parseFloat(latestData.voltage) || 0,
          current: Number.parseFloat(latestData.current) || 0,
          power: Number.parseFloat(latestData.power) || 0,
          batteryLevel: Number.parseFloat(latestData.battery_level) || 0,
          totalEnergy: Number.parseFloat(latestData.total_energy) || 0,
          solarPower: Number.parseFloat(latestData.solar_power) || 0,
          history: formattedHistory,
        })

        if (isLoading) {
          setIsLoading(false)
        }
      } catch (err) {
        console.error("Erreur:", err)
        setError(err as Error)
        if (isLoading) {
          setIsLoading(false)
        }
      }
    }

    // Charger les données initiales
    fetchData()

    // Configurer l'intervalle pour les mises à jour
    intervalRef.current = setInterval(fetchData, 10000) // Augmenté à 10 secondes

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }, [])

  return { data, isLoading, error }
}

