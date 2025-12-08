import React, { useState } from 'react'

export default function SoilHealthPage() {
  const [location, setLocation] = useState('Not detected')
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleDetect = () => {
    setLoading(true)
    setError(null)

    // STEP 1: Get user location
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude
        const lon = pos.coords.longitude

        setLocation(`${lat.toFixed(3)}, ${lon.toFixed(3)}`)

        try {
          // STEP 2: Call your backend weather API
          const res = await fetch(`http://localhost:5000/api/weather?lat=${lat}&lon=${lon}`)
          const data = await res.json()

          console.log(data);
          

          setWeather(data)
        } catch (err) {
          console.error(err)
          setError("Failed to fetch weather data")
        }

        setLoading(false)
      },
      (err) => {
        setError("Location access denied")
        setLoading(false)
      }
    )
  }

  return (
    <section className="flex-1 p-4 md:p-6 space-y-4 overflow-y-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

        {/* LEFT CARD */}
        <div className="lg:col-span-2 rounded-xl border border-slate-200 bg-white p-4 text-sm space-y-3">

          {/* HEADER */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-500">Weather analytics</p>
              <h3 className="text-base font-semibold">Local Weather Report</h3>
            </div>
            <button
              onClick={handleDetect}
              className="px-3 py-1.5 rounded-lg bg-emerald-500 text-white text-xs"
            >
              {loading ? "Detecting..." : "Detect from my location"}
            </button>
          </div>

          {/* LOCATION */}
          <div className="space-y-2 text-sm">
            <p className="text-xs text-slate-500">
              Current location: <span className="font-medium text-slate-700">{location}</span>
            </p>

            {error && (
              <p className="text-xs text-red-500">{error}</p>
            )}

            {/* WEATHER DETAILS */}
            {weather && !loading ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  
                  {/* Temperature */}
                  <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                    <p className="text-xs text-slate-500">Temperature</p>
                    <p className="mt-1 text-sm font-semibold">{weather.temperature}°C</p>
                  </div>

                  {/* Humidity */}
                  <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                    <p className="text-xs text-slate-500">Humidity</p>
                    <p className="mt-1 text-sm font-semibold">{weather.humidity}%</p>
                  </div>

                  {/* Rainfall */}
                  <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                    <p className="text-xs text-slate-500">Rainfall</p>
                    <p className="mt-1 text-sm font-semibold">{weather.precipitation} mm</p>
                  </div>
                </div>

                {/* Max / Min Temperature */}
                <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-xs text-slate-500">Max Temp Today</p>
                    <p className="mt-1 text-sm font-semibold">{weather.maxTemp}°C</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Min Temp Today</p>
                    <p className="mt-1 text-sm font-semibold">{weather.minTemp}°C</p>
                  </div>
                </div>

                {/* Simple Advice */}
                <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-xs space-y-1">
                  <p className="font-semibold text-slate-700">Weather Advice</p>
                  <p>Stay hydrated and protect crops from extreme temperatures.</p>
                  <p>If rainfall is 0 mm, consider scheduled irrigation.</p>
                </div>
              </>
            ) : (
              !loading && (
                <p className="text-xs text-slate-500">
                  Click "Detect from my location" to get local weather data.
                </p>
              )
            )}
          </div>
        </div>

        {/* RIGHT CARD */}
        <div className="rounded-xl border border-slate-200 bg-white p-4 text-sm space-y-2">
          <p className="text-sm font-semibold mb-1">Live map</p>

          <div className="h-56 rounded-lg border border-slate-200 bg-slate-100 flex items-center justify-center text-xs text-slate-500">
            Map preview (weather visualization)
          </div>

          <p className="text-xs text-slate-500">
            Later, you can integrate real-time weather maps and radar layers here.
          </p>
        </div>

      </div>
    </section>
  )
}
