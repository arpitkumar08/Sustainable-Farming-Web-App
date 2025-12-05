import React, { useState } from 'react'

const CROP_CATEGORIES = {
  Rabi: [
    {
      name: 'Wheat',
      sowing: 'Nov – Dec',
      growing: 'Dec – Mar',
      harvest: 'Mar – Apr',
      notes: 'Grows well in cool, dry climate with irrigation.',
    },
    {
      name: 'Mustard',
      sowing: 'Oct – Nov',
      growing: 'Nov – Feb',
      harvest: 'Feb – Mar',
      notes: 'Prefers well-drained soil, low water requirement.',
    },
    {
      name: 'Gram (Chana)',
      sowing: 'Oct – Nov',
      growing: 'Nov – Feb',
      harvest: 'Feb – Mar',
      notes: 'Improves soil nitrogen, good for rotation.',
    },
  ],
  Kharif: [
    {
      name: 'Rice (paddy)',
      sowing: 'Jun – Jul',
      growing: 'Jul – Sep',
      harvest: 'Sep – Oct',
      notes: 'Needs standing water and good rainfall/irrigation.',
    },
    {
      name: 'Maize',
      sowing: 'Jun – Jul',
      growing: 'Jul – Sep',
      harvest: 'Sep – Oct',
      notes: 'Needs warm climate, can manage with moderate water.',
    },
    {
      name: 'Cotton',
      sowing: 'Apr – May',
      growing: 'May – Sep',
      harvest: 'Oct – Nov',
      notes: 'Long duration, prefers black soils.',
    },
  ],
  Zaid: [
    {
      name: 'Cucumber',
      sowing: 'Feb – Mar',
      growing: 'Mar – Apr',
      harvest: 'Apr – May',
      notes: 'Short duration, requires good moisture.',
    },
    {
      name: 'Watermelon',
      sowing: 'Jan – Mar',
      growing: 'Feb – Apr',
      harvest: 'Apr – May',
      notes: 'Needs warm climate, sandy loam soil.',
    },
    {
      name: 'Moong (Green gram)',
      sowing: 'Mar – Apr',
      growing: 'Apr – May',
      harvest: 'May – Jun',
      notes: 'Good for soil fertility, low water crop.',
    },
  ],
}

export default function CropPlannerPage() {
  const [category, setCategory] = useState('Rabi')

  const crops = CROP_CATEGORIES[category]

  return (
    <section className="flex-1 p-4 md:p-6 space-y-4 overflow-y-auto">
      <div className="rounded-xl border border-slate-200 bg-white p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3 text-sm">
        <div>
          <p className="text-xs text-slate-500">Select season</p>
          <h3 className="text-base font-semibold">Crop Planner</h3>
          <p className="text-xs text-slate-500 mt-1">
            Choose Rabi / Kharif / Zaid to see suitable crops and their time.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs">
          {['Rabi', 'Kharif', 'Zaid'].map(cat => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={
                'px-3 py-1.5 rounded-lg border ' +
                (category === cat
                  ? 'bg-emerald-500 text-white border-emerald-600'
                  : 'bg-slate-50 text-slate-700 border-slate-300')
              }
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
        {crops.map(crop => (
          <div
            key={crop.name}
            className="rounded-xl border border-slate-200 bg-white p-3 flex flex-col gap-1"
          >
            <p className="text-sm font-semibold">{crop.name}</p>
            <p className="text-[11px] text-slate-500">
              Sowing: <span className="font-medium text-slate-700">{crop.sowing}</span>
            </p>
            <p className="text-[11px] text-slate-500">
              Growing: <span className="font-medium text-slate-700">{crop.growing}</span>
            </p>
            <p className="text-[11px] text-slate-500">
              Harvest: <span className="font-medium text-slate-700">{crop.harvest}</span>
            </p>
            <p className="text-[11px] text-slate-600 mt-1">{crop.notes}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
