import { NextResponse } from "next/server"

export async function GET() {
  try {
    const response = await fetch("https://solary.vabre.ch/GetAllMesuresEnergie")

    if (!response.ok) {
      throw new Error(`Erreur API: ${response.statusText}`)
    }

    const apiData = await response.json()

    // Trier les données par date (plus récente en premier)
    const sortedData = [...apiData].sort(
      (a, b) => new Date(b.measure_date).getTime() - new Date(a.measure_date).getTime(),
    )

    // Obtenir la dernière mesure
    const latestData = sortedData[0]

    // Adapter les données retournées
    const data = {
      id: latestData.mesure_id,
      voltage: Number.parseFloat(latestData.voltage) || 0,
      current: Number.parseFloat(latestData.current) || 0,
      power: Number.parseFloat(latestData.power) || 0,
      batteryLevel: Number.parseFloat(latestData.battery_level) || 0,
      totalEnergy: Number.parseFloat(latestData.total_energy) || 0,
      solarPower: Number.parseFloat(latestData.solar_power) || 0,
      timestamp: latestData.measure_date,
      energy_generated_kwh: Number.parseFloat(latestData.energy_generated_kwh) || 0,
      energy_consumed_kwh: Number.parseFloat(latestData.energy_consumed_kwh) || 0,
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error("Erreur lors de la récupération des données :", error)
    return NextResponse.json({ error: "Impossible de récupérer les données" }, { status: 500 })
  }
}

