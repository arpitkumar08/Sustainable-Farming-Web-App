import React, { useState } from 'react'

export default function SoilHealthPage() {
  const [location, setLocation] = useState('Not detected')
  const [soilType, setSoilType] = useState(null)
  const [ph, setPh] = useState(null)
  const [organic, setOrganic] = useState(null)

  const handleDetect = () => {
    setLocation('Muzaffarpur, Bihar')
    setSoilType('Alluvial soil')
    setPh('6.8 (slightly acidic)')
    setOrganic('Medium (good for cereals and pulses)')
  }

  return (
    <section className="flex-1 p-4 md:p-6 space-y-4 overflow-y-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 rounded-xl border border-slate-200 bg-white p-4 text-sm space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-500">Soil analytics</p>
              <h3 className="text-base font-semibold">Soil Health</h3>
            </div>
            <button
              onClick={handleDetect}
              className="px-3 py-1.5 rounded-lg bg-emerald-500 text-white text-xs"
            >
              Detect from my location
            </button>
          </div>

          <div className="space-y-2 text-sm">
            <p className="text-xs text-slate-500">
              Current location: <span className="font-medium text-slate-700">{location}</span>
            </p>
            {soilType ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                    <p className="text-xs text-slate-500">Soil type</p>
                    <p className="mt-1 text-sm font-semibold">{soilType}</p>
                  </div>
                  <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                    <p className="text-xs text-slate-500">Soil pH</p>
                    <p className="mt-1 text-sm font-semibold">{ph}</p>
                  </div>
                  <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                    <p className="text-xs text-slate-500">Organic matter</p>
                    <p className="mt-1 text-sm font-semibold">{organic}</p>
                  </div>
                </div>
                <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-xs space-y-1">
                  <p className="font-semibold text-slate-700">Simple advice</p>
                  <p>If pH is slightly acidic, wheat, gram, and many vegetables grow well.</p>
                  <p>
                    Add farmyard manure or compost every year to maintain organic matter and soil
                    structure.
                  </p>
                </div>
              </>
            ) : (
              <p className="text-xs text-slate-500">
                Click &quot;Detect from my location&quot; to see soil details for your area.
              </p>
            )}
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4 text-sm space-y-2">
          <p className="text-sm font-semibold mb-1">Live map</p>
          <div className="h-56 rounded-lg border border-slate-200 bg-slate-100 flex items-center justify-center text-xs text-slate-500">
            Map preview (fields and soil zones)
          </div>
          <p className="text-xs text-slate-500">
            Later, this map can connect to GPS or satellite data to show your fields with different
            colors based on soil health.
          </p>
        </div>
      </div>
    </section>
  )
}
