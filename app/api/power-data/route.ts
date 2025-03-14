import { NextResponse } from "next/server"

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

export async function GET() {
  // In a real app, this would connect to your Arduino or database
  const data = {
    voltage: 12.6,
    current: 3.2,
    power: 40.32,
    batteryLevel: 78,
    totalEnergy: 1250,
    solarPower: 120,
    history: mockHistoryData,
  }

  return NextResponse.json(data)
}

