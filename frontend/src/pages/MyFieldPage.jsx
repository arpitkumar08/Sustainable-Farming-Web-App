import React, { useState, useMemo } from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, CartesianGrid, Legend } from 'recharts'

// NOTE: Replace image paths with your actual asset imports or URLs
// import wheatImg from '../assets/wheat.jpg'
// import riceImg from '../assets/rice.jpg'

const CROP_DATA = {
  wheat: {
    key: 'wheat',
    name: 'Wheat',
    seedsPerAcreKg: 45,
    waterLitresPerAcre: 120000,
    durationDays: 120,
    idealPH: '6.0 - 7.5',
    temperature: '10 - 25°C',
    yieldQuintalPerAcre: 20,
    avgSeedCostPerKg: 30, // INR
    avgWaterCostPerLitre: 0.0005, // INR per litre approximation
    image: 'https://wpcdn.web.wsu.edu/news/uploads/sites/2797/2019/02/wheat-1188x792-1024x683.jpg',
    description:
      'Wheat is a rabi crop requiring moderate water and well-drained loamy soils. Best sown in cool season with adequate sunlight.'
  },
  rice: {
    key: 'rice',
    name: 'Rice (Paddy)',
    seedsPerAcreKg: 30,
    waterLitresPerAcre: 250000,
    durationDays: 135,
    idealPH: '5.5 - 6.5',
    temperature: '20 - 35°C',
    yieldQuintalPerAcre: 30,
    avgSeedCostPerKg: 40,
    avgWaterCostPerLitre: 0.0004,
    image: 'https://www.usarice.com/images/default-source/think-rice/site-design/split-banner/growing.jpg?sfvrsn=6d3d38d_2',
    description:
      'Rice needs flooded fields or continuous irrigation for best yields. Prefers warm and humid conditions.'
  },
  maize: {
    key: 'maize',
    name: 'Maize',
    seedsPerAcreKg: 18,
    waterLitresPerAcre: 90000,
    durationDays: 110,
    idealPH: '5.8 - 7.0',
    temperature: '18 - 27°C',
    yieldQuintalPerAcre: 25,
    avgSeedCostPerKg: 35,
    avgWaterCostPerLitre: 0.00045,
    image: 'https://agrosiaa.com/uploads/userdata/crop_images/maize/maize_cover_image.png',
    description:
      'Maize is a versatile crop; needs well-drained fertile soil and regular moisture during growth.'
  },
  mustard: {
    key: 'mustard',
    name: 'Mustard',
    seedsPerAcreKg: 2.5,
    waterLitresPerAcre: 60000,
    durationDays: 100,
    idealPH: '6.0 - 7.5',
    temperature: '10 - 25°C',
    yieldQuintalPerAcre: 8,
    avgSeedCostPerKg: 120,
    avgWaterCostPerLitre: 0.0005,
    image: 'https://cdn.dr.hauschka.com/images/system/plant_library/brassica-nigra-l.jpg',
    description:
      'Mustard is an oilseed crop with low seed requirement per acre. Performs well in cool climates.'
  },
  vegetables: {
    key: 'vegetables',
    name: 'Mixed Vegetables',
    seedsPerAcreKg: 3,
    waterLitresPerAcre: 80000,
    durationDays: 90,
    idealPH: '6.0 - 7.0',
    temperature: '15 - 30°C',
    yieldQuintalPerAcre: 40,
    avgSeedCostPerKg: 50,
    avgWaterCostPerLitre: 0.0006,
    image: 'https://floweraura-blog-img.s3.ap-south-1.amazonaws.com/plants-blogs/tomato.jpg',
    description:
      'Mixed vegetables vary by variety; generally need fertile soil, regular watering and pest management.'
  }
}

// Simple fertilizer suggestion baseline (per acre) — adjust to your data/source
const FERTILIZER_BASE = {
  wheat: { N: 80, P: 40, K: 20 },
  rice: { N: 100, P: 50, K: 40 },
  maize: { N: 150, P: 60, K: 40 },
  mustard: { N: 40, P: 40, K: 20 },
  vegetables: { N: 120, P: 80, K: 60 }
}

export default function FieldPage() {
  const [area, setArea] = useState('')
  const [cropKey, setCropKey] = useState('wheat')
  const [result, setResult] = useState(null)
  const [soilPH, setSoilPH] = useState('')
  const [showReport, setShowReport] = useState(false)

  const crop = useMemo(() => CROP_DATA[cropKey], [cropKey])

  const handleCalculate = () => {
    const a = parseFloat(area)
    if (!a || a <= 0) {
      setResult(null)
      return
    }

    // Basic calculations
    const seedsKg = a * crop.seedsPerAcreKg
    const waterLitres = a * crop.waterLitresPerAcre
    const durationDays = crop.durationDays

    // Fertilizer scaled by area
    const baseFert = FERTILIZER_BASE[cropKey]
    const fertilizer = {
      N: (baseFert.N * a).toFixed(1),
      P: (baseFert.P * a).toFixed(1),
      K: (baseFert.K * a).toFixed(1)
    }

    // Cost estimates
    const seedCost = seedsKg * crop.avgSeedCostPerKg
    const waterCost = waterLitres * crop.avgWaterCostPerLitre
    // rough fertilizer price assumptions (INR per kg)
    const priceN = 20
    const priceP = 25
    const priceK = 18
    const fertilizerCost = (baseFert.N * priceN + baseFert.P * priceP + baseFert.K * priceK) * a

    // Expected yield and income estimate
    const expectedYieldQuintals = crop.yieldQuintalPerAcre * a
    const expectedPricePerQuintal = 2000 // default market price — you can fetch from API
    const expectedIncome = expectedYieldQuintals * expectedPricePerQuintal

    setResult({
      area: a,
      seedsKg,
      waterLitres,
      durationDays,
      fertilizer,
      seedCost,
      waterCost,
      fertilizerCost,
      expectedYieldQuintals,
      expectedPricePerQuintal,
      expectedIncome
    })

    setShowReport(true)
  }

  const chartData = useMemo(() => {
    if (!result) return []
    return [
      { name: 'Seeds (kg)', value: Number(result.seedsKg.toFixed(1)) },
      { name: 'Water (kL)', value: Number((result.waterLitres / 1000).toFixed(1)) },
      { name: 'Duration (days)', value: result.durationDays },
      { name: 'Yield (qtl)', value: Number(result.expectedYieldQuintals.toFixed(1)) }
    ]
  }, [result])

  const downloadReport = () => {
    if (!result) return
    const data = {
      crop: crop.name,
      area: result.area,
      seedsKg: result.seedsKg,
      waterLitres: result.waterLitres,
      durationDays: result.durationDays,
      fertilizer: result.fertilizer,
      costs: {
        seedCost: result.seedCost,
        waterCost: result.waterCost,
        fertilizerCost: result.fertilizerCost
      },
      expectedYieldQuintals: result.expectedYieldQuintals,
      expectedIncome: result.expectedIncome
    }

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${crop.key}_report_${Date.now()}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Field Planner & Dashboard</h1>
        <p className="text-sm text-slate-500">Sustainable Farming Insights</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Input Card */}
        <div className="col-span-1 rounded-xl border p-4 bg-white shadow-sm">
          <p className="text-xs text-slate-500">Step 1</p>
          <h2 className="font-semibold text-lg">Enter field & crop details</h2>

          <div className="mt-4 space-y-4 text-sm">
            <div>
              <label className="block text-xs text-slate-600">Field area (in acres)</label>
              <input
                type="number"
                min="0"
                step="0.1"
                value={area}
                onChange={e => setArea(e.target.value)}
                className="mt-1 w-full border rounded-lg px-3 py-2 outline-none"
                placeholder="e.g. 2.5"
              />
            </div>

            <div>
              <label className="block text-xs text-slate-600">Crop</label>
              <select
                value={cropKey}
                onChange={e => setCropKey(e.target.value)}
                className="mt-1 w-full border rounded-lg px-3 py-2 outline-none bg-white"
              >
                {Object.keys(CROP_DATA).map(k => (
                  <option key={k} value={k}>{CROP_DATA[k].name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs text-slate-600">Soil pH (optional)</label>
              <input
                type="text"
                value={soilPH}
                onChange={e => setSoilPH(e.target.value)}
                className="mt-1 w-full border rounded-lg px-3 py-2 outline-none"
                placeholder="e.g. 6.5"
              />
            </div>

            <div className="flex gap-2">
              <button onClick={handleCalculate} className="flex-1 px-4 py-2 bg-emerald-500 text-white rounded-lg">Calculate</button>
              <button onClick={downloadReport} className="px-4 py-2 bg-slate-100 rounded-lg text-sm">Download JSON</button>
            </div>

            <div className="text-xs text-slate-500">Tip: For better estimates connect live market & soil APIs in the backend.</div>
          </div>
        </div>

        {/* Crop Info Card */}
        <div className="col-span-1 lg:col-span-2 rounded-xl border p-4 bg-white shadow-sm">
          <div className="flex gap-4">
            <div className="w-36 h-24 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
              {/* Replace img src with real path or import */}
              <img src={crop.image} alt={crop.name} className="object-cover w-full h-full" />
            </div>

            <div className="flex-1">
              <h3 className="text-lg font-semibold">{crop.name}</h3>
              <p className="text-sm text-slate-600 mt-1">{crop.description}</p>

              <div className="grid grid-cols-2 gap-2 mt-3 text-sm">
                <div>
                  <p className="text-xs text-slate-500">Ideal pH</p>
                  <p className="font-medium">{crop.idealPH}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">Temperature</p>
                  <p className="font-medium">{crop.temperature}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">Seed per acre</p>
                  <p className="font-medium">{crop.seedsPerAcreKg} kg</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">Water per acre</p>
                  <p className="font-medium">{Number(crop.waterLitresPerAcre).toLocaleString()} L</p>
                </div>
              </div>
            </div>
          </div>

          {/* Soil health indicator */}
          <div className="mt-4 border-t pt-3">
            <h4 className="text-sm font-semibold">Soil Health Indicator</h4>
            <div className="mt-2 text-sm text-slate-600">
              <p>Recommended pH for {crop.name}: <span className="font-medium">{crop.idealPH}</span></p>
              {soilPH ? (
                <p className="mt-1">Your soil pH: <span className="font-medium">{soilPH}</span> — {Number(soilPH) >= 5.5 && Number(soilPH) <= 7.5 ? <span className="text-emerald-600">Suitable</span> : <span className="text-amber-600">May need amendment</span>}</p>
              ) : (
                <p className="mt-1 text-xs text-slate-400">Enter soil pH to get tailored advice</p>
              )}

              <div className="mt-3 text-sm">
                <p className="font-semibold">Soil tips</p>
                <ul className="list-disc ml-5 mt-1 text-slate-600">
                  <li>Do a simple pH test; liming adjusts acidity.</li>
                  <li>Use organic matter to improve structure.</li>
                  <li>Avoid excess chemical fertilizer; test before applying.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Result Cards + Charts */}
        <div className="col-span-1 lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="rounded-xl border p-4 bg-white">
            <p className="text-xs text-slate-500">Seeds needed</p>
            <p className="text-2xl font-semibold mt-2">{result ? result.seedsKg.toFixed(1) : '—'} kg</p>
            <p className="text-xs text-slate-500 mt-1">For {result ? result.area : '—'} acres</p>
          </div>

          <div className="rounded-xl border p-4 bg-white">
            <p className="text-xs text-slate-500">Water required</p>
            <p className="text-2xl font-semibold mt-2">{result ? result.waterLitres.toLocaleString() : '—'} L</p>
            <p className="text-xs text-slate-500 mt-1">Approx. for full crop duration</p>
          </div>

          <div className="rounded-xl border p-4 bg-white">
            <p className="text-xs text-slate-500">Crop duration</p>
            <p className="text-2xl font-semibold mt-2">{result ? result.durationDays : '—'} days</p>
            <p className="text-xs text-slate-500 mt-1">Sowing → Harvest</p>
          </div>

          {/* Fertilizer card */}
          <div className="rounded-xl border p-4 bg-white col-span-1 md:col-span-2">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-xs text-slate-500">Fertilizer requirement</p>
                <p className="text-lg font-semibold mt-1">{result ? `${result.fertilizer.N} N / ${result.fertilizer.P} P / ${result.fertilizer.K} K (kg)` : '—'}</p>
              </div>
              <div className="text-sm text-slate-500">Per area: scaled to {result ? `${result.area} acres` : '—'}</div>
            </div>

            <div className="mt-3 text-sm text-slate-600">
              <p className="font-medium">How to apply</p>
              <ul className="list-disc ml-5 mt-1">
                <li>Apply P & K at sowing; split N across growth stages.</li>
                <li>Use organic compost to reduce chemical input by 20–30%.</li>
              </ul>
            </div>
          </div>

          {/* Cost Estimation */}
          <div className="rounded-xl border p-4 bg-white">
            <p className="text-xs text-slate-500">Estimated Costs</p>
            <div className="mt-2">
              <p className="text-sm">Seed cost: <span className="font-medium">₹{result ? Math.round(result.seedCost) : '—'}</span></p>
              <p className="text-sm">Water cost: <span className="font-medium">₹{result ? Math.round(result.waterCost) : '—'}</span></p>
              <p className="text-sm">Fertilizer cost: <span className="font-medium">₹{result ? Math.round(result.fertilizerCost) : '—'}</span></p>
              <p className="text-base font-semibold mt-2">Total est.: <span>₹{result ? Math.round(result.seedCost + result.waterCost + result.fertilizerCost) : '—'}</span></p>
            </div>
          </div>

          {/* Charts */}
          <div className="rounded-xl border p-4 bg-white md:col-span-3">
            <h4 className="font-semibold mb-3">Overview charts</h4>
            {result ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div style={{ width: '100%', height: 220 }}>
                  <ResponsiveContainer>
                    <BarChart data={chartData}>
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="value" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div style={{ width: '100%', height: 220 }}>
                  <ResponsiveContainer>
                    <LineChart data={[{name: 'Est', seeds: result.seedsKg, water: result.waterLitres/1000, yield: result.expectedYieldQuintals}]}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="seeds" stroke="#8884d8"/>
                      <Line type="monotone" dataKey="water" stroke="#82ca9d"/>
                      <Line type="monotone" dataKey="yield" stroke="#ff7300"/>
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            ) : (
              <p className="text-sm text-slate-400">Calculate to see charts & estimates.</p>
            )}
          </div>

        </div>
      </div>

      {/* Small footer */}
      <div className="mt-6 text-xs text-slate-500">Note: All values are estimates. Connect to live soil testing and market APIs in the backend for precise recommendations.</div>
    </div>
  )
}
