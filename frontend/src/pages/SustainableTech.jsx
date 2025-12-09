import React from 'react'

const TECHNIQUES = [
  {
    key: 'organic',
    title: 'Organic Farming',
    image: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=5f5f1a1a2a3b4c5d6e7f8g9h',
    short: 'Growing crops without synthetic chemicals, using natural inputs like compost and biofertilizers.',
    steps: [
      'Prepare land and improve soil with well-rotted compost or farmyard manure.',
      'Choose certified organic seeds or untreated local varieties.',
      'Use crop rotations and green manures to maintain fertility.',
      'Manage pests with cultural methods, biological controls and traps.',
      'Monitor soil health and use organic amendments as needed.'
    ],
    tools: ['Compost turner or pitchfork', 'Seed drill (optional)', 'Hand tools', 'Biopesticide sprayer'],
    benefits: ['Safer food, improved soil organic matter, better long-term yields, premium price in some markets'],
    future: 'Organic farming demand is rising globally as consumers prefer chemical-free produce. Adopting organic increases resilience and soil capital over time.'
  },
  {
    key: 'crop-rotation',
    title: 'Crop Rotation',
    image: 'https://images.unsplash.com/photo-1504198266286-1659872e6590?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=abc123def456',
    short: 'Alternating crops season-to-season to break pest cycles and balance soil nutrients.',
    steps: [
      'Divide your land into plots or plan rotations across seasons.',
      'Alternate cereals with legumes to naturally improve nitrogen.',
      'Avoid growing the same family of crops consecutively on the same plot.',
      'Record rotations and monitor pest/disease incidence.'
    ],
    tools: ['Field map/notes', 'Seed storage for multiple crops', 'Basic planting tools'],
    benefits: ['Reduces pests and diseases, improves nutrient cycling, reduces fertilizer need'],
    future: 'Crop rotation remains a low-cost, highly effective practice. When combined with precision tools it can be optimized further for yield and soil health.'
  },
  {
    key: 'drip',
    title: 'Drip & Micro-Irrigation',
    image: 'https://images.unsplash.com/photo-1518183214770-9cffbec72538?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=def456ghi789',
    short: 'Delivers water directly to the plant root zone through pipes and emitters — huge water savings.',
    steps: [
      'Survey the field and design layout for drip laterals and main line.',
      'Install filters and pressure regulators to protect emitters.',
      'Lay drip tubing and place emitters near each plant or row.',
      'Use timer or controller for scheduled irrigation; adjust seasonally.'
    ],
    tools: ['Drip tubing & emitters', 'Filters & pressure regulators', 'PVC pipes & fittings', 'Irrigation controller/timers'],
    benefits: ['Saves 30–70% water, increases water-use efficiency, improves yields and reduces weed growth'],
    future: 'With smart controllers and moisture sensors, drip irrigation will be central to water-smart farming and can be subsidized in many regions.'
  },
  {
    key: 'mulching',
    title: 'Mulching',
    image: 'https://images.unsplash.com/photo-1501004318641-mulch?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=mulch123',
    short: 'Covering soil with organic or inorganic material to retain moisture, control weeds and enrich soil.',
    steps: [
      'Prepare mulch material: straw, wood chips, leaves, or plastic where appropriate.',
      'Spread a 5–10 cm layer around plants, avoiding burying stems.',
      'Refresh organic mulch after decomposition cycles.',
      'Combine with drip irrigation for best results.'
    ],
    tools: ['Mulch material (straw, leaves)', 'Rake or spreader', 'Shredder for woody material'],
    benefits: ['Reduces evaporation, controls weeds, adds organic matter when decomposed'],
    future: 'Mulching is a low-cost practice that delivers immediate benefits — scaling mulch production locally can create additional farm revenue.'
  },
  {
    key: 'vermicompost',
    title: 'Vermicomposting',
    image: 'https://images.unsplash.com/photo-1542367597-9e0a120d5d0a?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=vermi123',
    short: 'Using earthworms to convert organic waste into nutrient-rich compost.',
    steps: [
      'Collect kitchen and farm residues (avoid meat/dairy).',
      'Create shaded vermi-beds with proper bedding (cocopeat/cow dung).',
      'Introduce earthworms (Eisenia fetida) and maintain moisture.',
      'Harvest vermicompost after 60–90 days and use as top-dressing or potting mix.'
    ],
    tools: ['Vermi-beds/boxes', 'Shovel & sieve', 'Moisture meter (optional)'],
    benefits: ['Produces high-quality organic fertilizer, improves soil biology and structure'],
    future: 'Small-scale vermicompost units are highly adoptable; it reduces waste and lowers fertilizer costs.'
  },
  {
    key: 'solar',
    title: 'Solar-Powered Farming Techniques',
    image: 'https://images.unsplash.com/photo-1509395176047-4a66953fd231?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=solar123',
    short: 'Use solar energy for pumps, dryers and powering sensors — reduces fuel cost and emissions.',
    steps: [
      'Assess energy needs: pumps, lights, sensors.',
      'Select appropriate solar pump and battery capacity if needed.',
      'Install panels in unshaded location and connect to pump/controllers.',
      'Combine with drip/micro-irrigation for maximum benefit.'
    ],
    tools: ['Solar panels & mounting', 'Solar water pump', 'Battery/storage (optional)', 'Inverter & controllers'],
    benefits: ['Lowers fuel and electricity cost; reliable off-grid power; improves sustainability'],
    future: 'Solar on farms reduces operating costs and can turn farms into mini power hubs in the future.'
  },
  {
    key: 'rainwater',
    title: 'Rainwater Harvesting',
    image: 'https://images.unsplash.com/photo-1504198453319-5ce911bafcde?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=rain123',
    short: 'Capture and store rainwater for irrigation and recharge groundwater.',
    steps: [
      'Identify catchment areas (roofs, fields) and estimate runoff.',
      'Construct collection structures: tanks, ponds or percolation pits.',
      'Add filters/screens and first-flush systems to improve water quality.',
      'Use stored water during dry spells or to recharge groundwater.'
    ],
    tools: ['Storage tanks or ponds', 'PVC gutters & downpipes', 'Screens & first-flush devices'],
    benefits: ['Increases water availability, reduces dependence on groundwater, improves resilience to droughts'],
    future: 'Integrated watershed planning and small farm ponds will be key to climate-resilient agriculture.'
  },
  {
    key: 'biofert',
    title: 'Biofertilizers',
    image: 'https://images.unsplash.com/photo-1533750349088-cd871a92f312?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=biofert123',
    short: 'Use of living organisms (rhizobia, azotobacter) to enhance soil nutrient availability.',
    steps: [
      'Choose biofertilizer based on crop (e.g., rhizobium for legumes).',
      'Follow label instructions for seed treatment or soil application.',
      'Store inoculants in cool place; avoid direct sunlight.',
      'Combine with organic matter for best results.'
    ],
    tools: ['Biofertilizer packets', 'Measuring spoons', 'Sprayer for application'],
    benefits: ['Reduces chemical fertilizer needs, improves soil biology, low cost'],
    future: 'Biofertilizers will be central to low-input systems and can be combined with seed coatings and technology.'
  },
  {
    key: 'waste-to-fertilizer',
    title: 'Waste-to-Fertilizer Systems',
    image: 'https://images.unsplash.com/photo-1555685812-4b943f1b8aeb?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=waste123',
    short: 'Convert farm and organic waste into compost, biogas or nutrient-rich products.',
    steps: [
      'Segregate organic waste and remove contaminants.',
      'Set up compost pits, windrows or biogas digesters.',
      'Manage moisture and aeration; turn windrows as needed.',
      'Harvest compost/biogas and use on-farm or sell for income.'
    ],
    tools: ['Compost pit liners, biogas digester (where applicable)', 'Shovel & turning tools', 'Moisture meter'],
    benefits: ['Reduces waste, produces on-farm fertilizer & energy, lowers input costs'],
    future: 'Small-scale biogas and community composting can create circular economies in rural areas.'
  }
]

export default function SustainableTechniquesPage() {
  return (
    <div className="p-6 max-w-6xl mx-auto">
      <header className="mb-6">
        <h1 className="text-3xl font-bold">Sustainable Farming Techniques</h1>
        <p className="text-slate-600 mt-2">Practical, step-by-step guides with tools and benefits — designed for farmers and extension workers.</p>
      </header>

      <section className="mb-8 bg-white rounded-xl border p-6 shadow-sm">
        <h2 className="text-xl font-semibold mb-2">Introduction</h2>
        <p className="text-slate-600">Sustainable farming focuses on long-term productivity, soil health, water conservation and reducing chemical inputs. Below you'll find practical techniques that can be adopted on small and large farms. Each technique includes steps, tools you need, benefits and the future outlook.</p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {TECHNIQUES.map(t => (
          <article key={t.key} className="bg-white rounded-xl border overflow-hidden shadow-sm">
            <div className="md:flex">
              <div className="md:w-48 h-36 bg-gray-100 overflow-hidden">
                <img src={t.image} alt={t.title} className="w-full h-full object-cover" />
              </div>

              <div className="p-4 flex-1">
                <h3 className="text-lg font-semibold">{t.title}</h3>
                <p className="text-sm text-slate-600 mt-1">{t.short}</p>

                <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                  <div>
                    <p className="text-xs text-slate-500">Tools</p>
                    <ul className="list-disc ml-4 mt-1 text-slate-600">
                      {t.tools.map((tool, i) => <li key={i}>{tool}</li>)}
                    </ul>
                  </div>

                  <div>
                    <p className="text-xs text-slate-500">Key benefits</p>
                    <ul className="list-disc ml-4 mt-1 text-slate-600">
                      {t.benefits.map((b, i) => <li key={i}>{b}</li>)}
                    </ul>
                  </div>

                  <div>
                    <p className="text-xs text-slate-500">Future & scale</p>
                    <p className="text-slate-600 mt-1 text-xs">{t.future}</p>
                  </div>
                </div>

                <div className="mt-3">
                  <p className="text-xs text-slate-500">How to use (steps)</p>
                  <ol className="list-decimal ml-5 mt-1 text-slate-600 text-sm">
                    {t.steps.map((s, idx) => <li key={idx} className="mb-1">{s}</li>)}
                  </ol>
                </div>

                <div className="mt-3 flex gap-2">
                  <button className="px-3 py-1 rounded bg-emerald-500 text-white text-sm">Learn more</button>
                  <button className="px-3 py-1 rounded border text-sm">Add to Plan</button>
                </div>
              </div>
            </div>
          </article>
        ))}
      </section>

      <footer className="mt-8 text-sm text-slate-500">
        <p>Tip: Use the "Add to Plan" button to collect techniques you want to apply on your field planner page. For best results combine techniques — e.g., drip irrigation + mulching + biofertilizers.</p>
      </footer>
    </div>
  )
}
