"use client"

import { useEffect, useState } from "react"

import type { PowerData } from "@/lib/types"

// Mock data for demonstration
const mockHistoryData = Array.from({ length: 24 }).map((_, i) => {
  const hour = i.toString().padStart(2, "0")
  return {
    time: `${hour}:00`,
    power: 100 + Math.random() * 150,
    voltage: 12 + Math.random() * 2,
    current: 2 + Math.random() * 3,
  }
})

const initialData: PowerData = {
  voltage: 12.6,
  current: 3.2,
  power: 40.32,
  batteryLevel: 78,
  totalEnergy: 1250,
  solarPower: 120,
  history: mockHistoryData,
}

export function usePowerData() {
  const [data, setData] = useState<PowerData>(initialData)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    // Simulate loading
    const loadingTimer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    // In a real app, this would be a WebSocket connection or API polling
    const socket = {
      connect: () => {
        console.log("Connecting to WebSocket...")
        // Simulate real-time data updates
        const interval = setInterval(() => {
          setData((prevData) => {
            // Simulate small changes in values
            const newVoltage = prevData.voltage + (Math.random() * 0.4 - 0.2)
            const newCurrent = prevData.current + (Math.random() * 0.3 - 0.15)
            const newPower = newVoltage * newCurrent

            // Update history with new data point
            const newHistory = [
              ...prevData.history.slice(1),
              {
                time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
                power: newPower,
                voltage: newVoltage,
                current: newCurrent,
              },
            ]

            return {
              ...prevData,
              voltage: newVoltage,
              current: newCurrent,
              power: newPower,
              batteryLevel: Number.parseFloat(
                Math.min(100, prevData.batteryLevel + (Math.random() * 2 - 0.5)).toFixed(2),
              ),
              totalEnergy: prevData.totalEnergy + newPower / 3600, // kWh calculation
              solarPower: 100 + Math.random() * 50,
              history: newHistory,
            }
          })
        }, 5000)

        return () => clearInterval(interval)
      },
      disconnect: () => {
        console.log("Disconnecting from WebSocket...")
      },
    }

    const cleanup = socket.connect()

    return () => {
      clearTimeout(loadingTimer)
      cleanup()
      socket.disconnect()
    }
  }, [])

  return { data, isLoading, error }
}

