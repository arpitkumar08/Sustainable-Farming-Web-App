import React, { useState } from 'react'

const CROP_DATA = {
  wheat: {
    name: 'Wheat',
    seedsPerAcreKg: 45,
    waterLitresPerAcre: 120000,
    durationDays: 120,
  },
  rice: {
    name: 'Rice (paddy)',
    seedsPerAcreKg: 30,
    waterLitresPerAcre: 250000,
    durationDays: 135,
  },
  maize: {
    name: 'Maize',
    seedsPerAcreKg: 18,
    waterLitresPerAcre: 90000,
    durationDays: 110,
  },
  mustard: {
    name: 'Mustard',
    seedsPerAcreKg: 2.5,
    waterLitresPerAcre: 60000,
    durationDays: 100,
  },
  vegetables: {
    name: 'Mixed vegetables',
    seedsPerAcreKg: 3,
    waterLitresPerAcre: 80000,
    durationDays: 90,
  },
}

export default function MyFieldPage() {
  const [area, setArea] = useState('')
  const [cropKey, setCropKey] = useState('wheat')
  const [result, setResult] = useState(null)

  const handleCalculate = () => {
    const a = parseFloat(area)
    if (!a || a <= 0) {
      setResult(null)
      return
    }
    const crop = CROP_DATA[cropKey]
    const seedsKg = a * crop.seedsPerAcreKg
    const waterLitres = a * crop.waterLitresPerAcre
    setResult({
      cropName: crop.name,
      area: a,
      seedsKg,
      waterLitres,
      durationDays: crop.durationDays,
    })
  }

  return (
    <section className="flex-1 p-4 md:p-6 space-y-4 overflow-y-auto">
      <div className="rounded-xl border border-slate-200 bg-white p-4 space-y-4">
        <div>
          <p className="text-xs text-slate-500">Step 1</p>
          <h3 className="text-base font-semibold">Enter your field and crop details</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="flex flex-col gap-1">
            <label className="text-xs text-slate-600">Field area (in acres)</label>
            <input
              type="number"
              min="0"
              value={area}
              onChange={e => setArea(e.target.value)}
              className="border border-slate-300 rounded-lg px-3 py-2 text-sm outline-none"
              placeholder="e.g. 2.5"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs text-slate-600">Crop you want to grow</label>
            <select
              value={cropKey}
              onChange={e => setCropKey(e.target.value)}
              className="border border-slate-300 rounded-lg px-3 py-2 text-sm outline-none bg-white"
            >
              <option value="wheat">Wheat</option>
              <option value="rice">Rice (paddy)</option>
              <option value="maize">Maize</option>
              <option value="mustard">Mustard</option>
              <option value="vegetables">Mixed vegetables</option>
            </select>
          </div>
          <div className="flex items-end">
            <button
              onClick={handleCalculate}
              className="w-full md:w-auto px-4 py-2 rounded-lg bg-emerald-500 text-white text-sm"
            >
              Calculate requirements
            </button>
          </div>
        </div>
      </div>

      {result && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="rounded-xl border border-slate-200 bg-white p-4 text-sm">
            <p className="text-xs text-slate-500 mb-1">Seeds needed</p>
            <p className="text-lg font-semibold">
              {result.seedsKg.toFixed(1)} kg
            </p>
            <p className="text-xs text-slate-500 mt-1">
              For {result.area} acres of {result.cropName}
            </p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4 text-sm">
            <p className="text-xs text-slate-500 mb-1">Water required</p>
            <p className="text-lg font-semibold">
              {result.waterLitres.toLocaleString('en-IN')} L
            </p>
            <p className="text-xs text-slate-500 mt-1">
              Approximate for full crop duration
            </p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4 text-sm">
            <p className="text-xs text-slate-500 mb-1">Crop duration</p>
            <p className="text-lg font-semibold">
              {result.durationDays} days
            </p>
            <p className="text-xs text-slate-500 mt-1">
              From sowing to harvesting (approx)
            </p>
          </div>
        </div>
      )}
    </section>
  )
}
