import React from 'react'

const FORECAST = [
  { day: 'Today', temp: '27°C', rain: '40%', condition: 'Cloudy', icon: '⛅' },
  { day: 'Tomorrow', temp: '29°C', rain: '60%', condition: 'Rain likely', icon: '🌧️' },
  { day: 'Day 3', temp: '30°C', rain: '20%', condition: 'Hot and dry', icon: '☀️' },
]

export default function WeatherAlertsPage() {
  const aqi = 92
  const aqiLevel = 'Moderate'

  return (
    <section className="flex-1 p-4 md:p-6 space-y-4 overflow-y-auto">
      <div className="rounded-xl border border-slate-200 bg-white p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <p className="text-xs text-slate-500">Location</p>
          <h3 className="text-base font-semibold">Weather & Alerts • Muzaffarpur</h3>
          <p className="text-xs text-slate-500 mt-1">
            See upcoming weather, air quality and farm safety tips.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <button className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 border border-slate-300">
            Change location
          </button>
          <button className="px-3 py-1.5 rounded-lg bg-emerald-500 text-white">
            Sync with device
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="rounded-xl border border-slate-200 bg-white p-4 text-sm space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-500">Today</p>
              <h3 className="text-sm font-semibold">Conditions</h3>
            </div>
            <div className="text-right">
              <p className="text-lg font-semibold">27°C</p>
              <p className="text-[11px] text-slate-500">Feels like 29°C</p>
            </div>
          </div>
          <div className="flex items-center gap-4 mt-2">
            <div className="h-16 w-16 rounded-2xl bg-blue-100 flex items-center justify-center text-3xl">
              ⛅
            </div>
            <div className="space-y-1 text-xs">
              <p>Chance of rain: 40%</p>
              <p>Humidity: 64%</p>
              <p>Wind: 9 km/h</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 rounded-xl border border-slate-200 bg-white p-4 text-sm space-y-3">
          <p className="text-xs text-slate-500">Next 3 days forecast</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {FORECAST.map(f => (
              <div
                key={f.day}
                className="rounded-lg border border-slate-200 bg-slate-50 p-3 flex flex-col items-center gap-1"
              >
                <p className="text-[11px] text-slate-500">{f.day}</p>
                <div className="text-2xl">{f.icon}</div>
                <p className="text-sm font-semibold">{f.temp}</p>
                <p className="text-[11px] text-slate-500">{f.condition}</p>
                <p className="text-[11px] text-slate-500">Rain chance: {f.rain}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="rounded-xl border border-slate-200 bg-white p-4 text-sm space-y-2">
          <p className="text-sm font-semibold">Air Quality (AQI)</p>
          <p className="text-2xl font-bold text-amber-600">{aqi}</p>
          <p className="text-xs text-slate-500">Level: {aqiLevel}</p>
          <p className="text-xs text-slate-500 mt-1">
            Avoid burning crop residue. It increases air pollution and harms soil health.
          </p>
        </div>

        <div className="lg:col-span-2 rounded-xl border border-slate-200 bg-white p-4 text-sm space-y-2">
          <p className="text-sm font-semibold">Safety tips for upcoming weather</p>
          <ul className="text-xs list-disc pl-4 space-y-1">
            <li>
              If heavy rain is expected, reduce irrigation a day before to avoid waterlogging.
            </li>
            <li>
              During strong winds or storms, tie or support tall crops like maize and sugarcane.
            </li>
            <li>
              If very high temperature is forecast, prefer evening irrigation to reduce evaporation.
            </li>
            <li>
              Store fertilizers and seeds in a dry place, away from direct moisture and heat.
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}
