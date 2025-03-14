export interface HistoryPoint {
  time: string
  power: number
  voltage: number
  current: number
}

export interface PowerData {
  voltage: number
  current: number
  power: number
  batteryLevel: number
  totalEnergy: number
  solarPower: number
  history: HistoryPoint[]
}

