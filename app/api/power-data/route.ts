import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch("https://feegaffe.fr/solar/solar.php");

    if (!response.ok) {
      throw new Error(`Erreur API: ${response.statusText}`);
    }

    const apiData = await response.json();

    // Adapter les données retournées
    const data = {
      id: apiData.id,
      voltage: parseFloat(apiData.voltage),
      current: parseFloat(apiData.current),
      power: parseFloat(apiData.power),
      batteryLevel: parseInt(apiData.battery_level, 10),
      totalEnergy: parseFloat(apiData.total_energy),
      solarPower: parseFloat(apiData.solar_power),
      timestamp: apiData.timestamp
    };

    return NextResponse.json(data);
  } catch (error) {
    console.error("Erreur lors de la récupération des données :", error);
    return NextResponse.json({ error: "Impossible de récupérer les données" }, { status: 500 });
  }
}
