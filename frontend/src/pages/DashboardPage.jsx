import React, { useState, useEffect, useRef } from 'react';

export default function DashboardPage() {
  const [methods, setMethods] = useState([]);
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [hoveredMethodId, setHoveredMethodId] = useState(null);

  const [schemes, setSchemes] = useState([]);
  const [activeSchemeIndex, setActiveSchemeIndex] = useState(0);
  const [selectedScheme, setSelectedScheme] = useState(null);

  const [events, setEvents] = useState([]);
  const [eventPage, setEventPage] = useState(0);
  const eventListRef = useRef(null);
  const eventItemRef = useRef(null);
  const [eventPageCount, setEventPageCount] = useState(1);

  const maxUsageValue = selectedMethod
    ? Math.max(...(selectedMethod.usageTrend || []).map((d) => d.value), 1)
    : 1;

  const activeScheme = schemes.length ? schemes[activeSchemeIndex] : null;

  const adoptionOverview = ['2010', '2015', '2020', '2025'].map((year) => {
    if (!methods.length) return { label: year, value: 0 };

    let total = 0;
    methods.forEach((m) => {
      const trend = m.usageTrend || [];
      const point = trend.find((p) => p.label === year);
      total += point ? point.value : 0;
    });

    const avg = total / methods.length;
    return { label: year, value: avg };
  });

  const maxOverview = Math.max(...adoptionOverview.map((d) => d.value), 1);
  const firstYear = adoptionOverview[0];
  const lastYear = adoptionOverview[adoptionOverview.length - 1];
  const adoptionChange = lastYear.value - firstYear.value;

  let topMethodName = '';
  let topMethodValue = 0;
  if (methods.length) {
    methods.forEach((m) => {
      const trend = m.usageTrend || [];
      if (!trend.length) return;
      const lastPoint = trend[trend.length - 1];
      if (lastPoint && lastPoint.value > topMethodValue) {
        topMethodValue = lastPoint.value;
        topMethodName = m.name;
      }
    });
  }

  const chartPoints = adoptionOverview.map((point, idx) => {
    const count = adoptionOverview.length;
    const xStart = 10;
    const xEnd = 90;
    const x =
      count > 1
        ? xStart + (idx / (count - 1)) * (xEnd - xStart)
        : (xStart + xEnd) / 2;

    const scaled = maxOverview ? point.value / maxOverview : 0;
    const bottomY = 42;
    const topY = 24;
    const y = bottomY - scaled * (bottomY - topY);

    return { x, y, label: point.label, value: point.value };
  });

  let linePath = '';
  if (chartPoints.length) {
    linePath = chartPoints.reduce((acc, p, idx) => {
      if (idx === 0) return `M ${p.x} ${p.y}`;
      return acc + ` L ${p.x} ${p.y}`;
    }, '');
  }

  let areaPath = '';
  if (chartPoints.length) {
    const first = chartPoints[0];
    const last = chartPoints[chartPoints.length - 1];
    const bottomY = 42;
    areaPath =
      `M ${first.x} ${bottomY} ` +
      chartPoints.map((p) => `L ${p.x} ${p.y}`).join(' ') +
      ` L ${last.x} ${bottomY} Z`;
  }

  useEffect(() => {
    fetch('http://localhost:5000/api/methods')
      .then((res) => res.json())
      .then((data) => {
        setMethods(data);
      })
      .catch((err) => {
        console.error('Error fetching methods:', err);
      });
  }, []);

  useEffect(() => {
    fetch('http://localhost:5000/api/schemes')
      .then((res) => res.json())
      .then((data) => {
        setSchemes(data);
        setActiveSchemeIndex(0);
      })
      .catch((err) => {
        console.error('Error fetching schemes:', err);
      });
  }, []);

  useEffect(() => {
    if (!schemes.length) return;
    const id = setInterval(() => {
      setActiveSchemeIndex((prev) => (prev + 1) % schemes.length);
    }, 4500);
    return () => clearInterval(id);
  }, [schemes]);

  useEffect(() => {
    fetch('http://localhost:5000/api/events')
      .then((res) => res.json())
      .then((data) => {
        const normalized = Array.isArray(data)
          ? data
          : data?.events || [];
        setEvents(normalized);
      })
      .catch(() => {
        const fallback = [
          { id: 'e1', title: 'Soil Health Camp - Block A', date: '2025-12-10', location: 'KVK Center' },
          { id: 'e2', title: 'Micro-Irrigation Demo', date: '2025-12-12', location: 'Gram Panchayat Field' },
          { id: 'e3', title: 'Organic Compost Workshop', date: '2025-12-18', location: 'Community Hall' },
          { id: 'e4', title: 'Crop Insurance Awareness', date: '2025-12-22', location: 'Market Yard' }
        ];
        setEvents(fallback);
      });
  }, []);

  useEffect(() => {
    const pages = Math.max(1, Math.ceil((events.length || 0) / 2));
    setEventPageCount(pages);
    setEventPage(0);
  }, [events]);

  useEffect(() => {
    if (!events.length) return;
    const id = setInterval(() => {
      setEventPage((p) => {
        const next = (p + 1) % eventPageCount;
        return next;
      });
    }, 4000);
    return () => clearInterval(id);
  }, [events, eventPageCount]);

  useEffect(() => {
    if (!eventItemRef.current || !eventListRef.current) return;
    const itemHeight = eventItemRef.current.getBoundingClientRect().height;
    const visibleHeight = itemHeight * 2;
    eventListRef.current.style.height = `${visibleHeight}px`;
  }, [events]);

  const goPrevScheme = () => {
    if (!schemes.length) return;
    setActiveSchemeIndex((prev) => (prev === 0 ? schemes.length - 1 : prev - 1));
  };

  const goNextScheme = () => {
    if (!schemes.length) return;
    setActiveSchemeIndex((prev) => (prev + 1) % schemes.length);
  };

  return (
    <section className="flex-1 p-4 md:p-6 space-y-5 overflow-y-auto bg-gradient-to-b from-emerald-50 via-slate-50 to-white">
      <div className="flex flex-col md:flex-row md:items-center gap-3">
        <div className="flex-1 max-w-2xl">
          <p className="text-[11px] uppercase tracking-wide text-emerald-600 flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Live sustainable farming guide
          </p>
          <h2 className="text-xl md:text-2xl font-semibold text-slate-900 mt-1">
            Make your field healthier, season by season
          </h2>
          <p className="text-xs md:text-sm text-slate-600 mt-1">
            Explore simple methods, see how adoption is growing, and find government support that
            helps you start without extra burden.
          </p>
        </div>

        <div className="flex-1 flex justify-end">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-xl w-full">
            <div className="rounded-2xl bg-white/80 backdrop-blur border border-emerald-100 px-4 py-2 shadow-sm flex flex-col justify-center">
              <p className="text-[11px] text-emerald-700">Methods to explore</p>
              <p className="text-lg font-semibold text-emerald-900">
                {methods.length || '—'}
                <span className="text-[11px] font-normal text-emerald-700 ml-1">
                  core approaches
                </span>
              </p>
            </div>
            <div className="rounded-2xl bg-white/80 backdrop-blur border border-sky-100 px-4 py-2 shadow-sm flex flex-col justify-center">
              <p className="text-[11px] text-sky-700">Schemes connected</p>
              <p className="text-lg font-semibold text-sky-900">
                {schemes.length || '—'}
                <span className="text-[11px] font-normal text-sky-700 ml-1">
                  active schemes
                </span>
              </p>
            </div>
            <div className="rounded-2xl bg-amber-50/95 border border-amber-100 px-4 py-2 shadow-sm flex flex-col justify-center">
              <p className="text-[11px] text-amber-700">2025 spotlight</p>
              {topMethodName ? (
                <p className="text-sm font-semibold text-amber-900">
                  {topMethodName}
                  <span className="text-[11px] font-normal text-amber-700 ml-1">
                    ~{Math.round(topMethodValue)}% adoption
                  </span>
                </p>
              ) : (
                <p className="text-sm text-amber-900">
                  Data will appear once methods load
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-2xl bg-white/90 border border-slate-200 p-4 md:p-5 space-y-4 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
          <div>
            <h3 className="text-sm md:text-base font-semibold text-slate-900">
              Explore key sustainable methods
            </h3>
            <p className="text-xs text-slate-500 mt-1 max-w-xl">
              Tap a method to open a simple explanation, see how its adoption is growing, and get
              starting ideas with one short video.
            </p>
          </div>
          <div className="rounded-xl bg-emerald-50/70 border border-emerald-100 px-3 py-2 text-[11px] text-emerald-800 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
            <span>
              You can combine methods over time, such as organic practices with agroforestry.
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[2fr,1.6fr] gap-4 md:gap-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 gap-3 md:gap-4">
            {!methods.length && (
              <>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 h-28 animate-pulse" />
                <div className="rounded-2xl border border-slate-200 bg-slate-50 h-28 animate-pulse" />
              </>
            )}
            {methods.map((method) => (
              <button
                key={method.id}
                onClick={() => setSelectedMethod(method)}
                onMouseEnter={() => setHoveredMethodId(method.id)}
                onMouseLeave={() => setHoveredMethodId(null)}
                className="group relative text-left rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 via-white to-emerald-50/40 hover:from-emerald-50 hover:via-white hover:to-emerald-100/50 transition-all duration-300 flex flex-col justify-between p-3 md:p-4 shadow-xs hover:shadow-md hover:-translate-y-0.5"
              >
                <div className="absolute inset-x-0 top-0 h-1 rounded-t-2xl bg-gradient-to-r from-emerald-400/0 via-emerald-400/60 to-sky-400/0 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <p className="text-sm font-semibold text-slate-900 flex items-center gap-1.5">
                      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-50 text-[11px] text-emerald-700 border border-emerald-100">
                        {(method.name || 'M')[0]}
                      </span>
                      {method.name}
                    </p>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100">
                      {method.badge}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-snug">
                    {method.shortLabel}
                  </p>
                </div>
                <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500">
                  <span className="flex items-center gap-1">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 group-hover:bg-emerald-500 transition-colors" />
                    {hoveredMethodId === method.id
                      ? 'Tap to see steps, trend & video'
                      : 'Learn how to use it'}
                  </span>
                  <span className="text-slate-400 group-hover:text-emerald-700 transition-colors">
                    Open →
                  </span>
                </div>
              </button>
            ))}
          </div>

          <div className='flex justify-between'>
            <div className="rounded-2xl bg-slate-50 border border-slate-200 p-4 flex gap-3 w-1/3">
              <div className="flex-1">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-xs font-semibold text-slate-900">
                      Average adoption over years
                    </p>
                    <p className="text-[11px] text-slate-600 mt-0.5 max-w-xs">
                      Based on your methods data. Shows how interest in sustainable
                      approaches is trending from {firstYear.label} to {lastYear.label}.
                    </p>
                  </div>
                  <div className="text-right text-[11px]">
                    <p className="text-emerald-700 font-semibold">
                      {Math.round(lastYear.value)}% in {lastYear.label}
                    </p>
                    <p className="text-slate-500">
                      {adoptionChange >= 0 ? '+' : ''}
                      {Math.round(adoptionChange)} pts vs {firstYear.label}
                    </p>
                    {topMethodName && (
                      <p className="mt-1 text-slate-500">
                        Top method:{' '}
                        <span className="font-semibold">{topMethodName}</span>
                      </p>
                    )}
                  </div>
                </div>

                <div className="relative h-40 flex items-center justify-center mt-1">
                  <div className="w-full max-w-lg mx-auto">
                    <svg
                      viewBox="0 0 100 50"
                      className="w-full h-full overflow-visible"
                      preserveAspectRatio="xMidYMid meet"
                    >
                      <defs>
                        <linearGradient id="adoptionArea" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#22c55e" stopOpacity="0.35" />
                          <stop offset="100%" stopColor="#22c55e" stopOpacity="0" />
                        </linearGradient>
                      </defs>

                      <line
                        x1="10"
                        y1="42"
                        x2="90"
                        y2="42"
                        stroke="#e2e8f0"
                        strokeWidth="0.6"
                      />
                      <line
                        x1="10"
                        y1="28"
                        x2="90"
                        y2="28"
                        stroke="#e2e8f0"
                        strokeWidth="0.4"
                        strokeDasharray="2 3"
                      />

                      {areaPath && (
                        <path
                          d={areaPath}
                          fill="url(#adoptionArea)"
                          stroke="none"
                          opacity="0.9"
                        />
                      )}

                      {linePath && (
                        <path
                          d={linePath}
                          fill="none"
                          stroke="#22c55e"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          style={{ strokeDasharray: 100, strokeDashoffset: 100 }}
                        >
                          <animate
                            attributeName="stroke-dashoffset"
                            from="100"
                            to="0"
                            dur="1.3s"
                            fill="freeze"
                          />
                        </path>
                      )}

                      {chartPoints.map((p, idx) => (
                        <g key={p.label}>
                          <circle
                            cx={p.x}
                            cy={p.y}
                            r="1.9"
                            fill="#22c55e"
                            stroke="#ecfdf5"
                            strokeWidth="0.8"
                          />
                          <text
                            x={p.x}
                            y="46"
                            textAnchor="middle"
                            fontSize="4"
                            fill="#64748b"
                          >
                            {p.label}
                          </text>
                          {idx === chartPoints.length - 1 && (
                            <text
                              x={p.x}
                              y={p.y - 4}
                              textAnchor="middle"
                              fontSize="4"
                              fill="#16a34a"
                              fontWeight="bold"
                            >
                              {Math.round(p.value)}%
                            </text>
                          )}
                        </g>
                      ))}
                    </svg>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[10px] text-slate-600 mt-1">
                  <span className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1">
                      <span className="h-2 w-2 rounded-full bg-emerald-500" />
                      Adoption (avg across methods)
                    </span>
                  </span>
                  <span>
                    A rising green line means more farmers are shifting to soil, water
                    and climate-friendly practices.
                  </span>
                </div>
              </div>
            </div>
            <div className="w-64 ml-3">
              <div className="rounded-2xl bg-white border border-slate-200 p-3 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="text-xs font-semibold text-slate-900">Upcoming events</p>
                    <p className="text-[11px] text-slate-500">Local workshops & drives</p>
                  </div>
                  <div className="text-[11px] text-slate-500">
                    <span className="font-semibold">{events.length}</span>
                  </div>
                </div>

                <div
                  ref={eventListRef}
                  className="relative overflow-hidden"
                >
                  <div
                    style={{
                      transform: `translateY(-${eventPage * 100}%)`,
                      transition: 'transform 0.6s ease',
                      display: 'flex',
                      flexDirection: 'column'
                    }}
                  >
                    {Array.from({ length: eventPageCount }).flatMap((_, pageIndex) => {
                      const start = pageIndex * 2;
                      const pair = events.slice(start, start + 2);
                      if (pair.length === 0) return [];
                      return [
                        <div key={`page-${pageIndex}`} className="space-y-2 py-1">
                          {pair.map((ev, idx) => (
                            <div
                              ref={pageIndex === 0 && idx === 0 ? eventItemRef : null}
                              key={ev.id || `${ev.title}-${start + idx}`}
                              className="rounded-lg border border-slate-100 p-2 bg-slate-50"
                            >
                              <div className="flex items-start justify-between gap-2">
                                <div className="flex-1">
                                  <p className="text-sm font-semibold text-slate-900 leading-tight">
                                    {ev.title}
                                  </p>
                                  <p className="text-[11px] text-slate-600 mt-0.5">
                                    {ev.location}
                                  </p>
                                </div>
                                <div className="text-[11px] text-slate-500 text-right">
                                  <div>{ev.date}</div>
                                  <div className="mt-1 text-[10px]">{ev.time || ''}</div>
                                </div>
                              </div>
                            </div>
                          ))}
                          {pair.length === 1 && (
                            <div className="rounded-lg border border-slate-100 p-2 bg-slate-50 invisible">
                              spacer
                            </div>
                          )}
                        </div>
                      ];
                    })}
                  </div>
                </div>

                <div className="flex items-center justify-between text-[10px] text-slate-500 mt-2">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setEventPage((p) => (p - 1 + eventPageCount) % eventPageCount)}
                      className="h-7 w-7 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-100 text-sm"
                    >
                      ‹
                    </button>
                    <button
                      onClick={() => setEventPage((p) => (p + 1) % eventPageCount)}
                      className="h-7 w-7 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-100 text-sm"
                    >
                      ›
                    </button>
                  </div>
                  <div>
                    <span className="text-[11px] font-semibold text-slate-800">
                      {eventPage + 1}
                    </span>
                    <span className="mx-1">/</span>
                    <span>{eventPageCount}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


      <div className="rounded-2xl bg-white/90 border border-slate-200 p-4 md:p-5 space-y-4 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
          <div>
            <h3 className="text-sm md:text-base font-semibold text-slate-900">
              Subsidy & Pradhan Mantri schemes for farmers
            </h3>
            <p className="text-xs text-slate-500 mt-1 max-w-2xl">
              These schemes can support you when you move towards water-saving, soil-health and
              risk-protected farming. Scroll through and tap any card for simple eligibility info.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center text-[11px] text-slate-500">
              {schemes.length ? (
                <>
                  <span className="font-semibold text-slate-800">
                    {activeSchemeIndex + 1}
                  </span>
                  <span className="mx-1">/</span>
                  <span>{schemes.length}</span>
                </>
              ) : (
                <span>Loading…</span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={goPrevScheme}
                className="h-8 w-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-100 text-sm transition-colors"
              >
                ‹
              </button>
              <button
                onClick={goNextScheme}
                className="h-8 w-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-100 text-sm transition-colors"
              >
                ›
              </button>
            </div>
          </div>
        </div>

        {!schemes.length ? (
          <div className="mt-2 grid grid-cols-1 lg:grid-cols-[2fr,1fr] gap-4 animate-pulse">
            <div className="rounded-2xl bg-slate-100 h-40" />
            <div className="space-y-3">
              <div className="rounded-xl bg-slate-100 h-16" />
              <div className="rounded-xl bg-slate-100 h-16" />
            </div>
          </div>
        ) : (
          <>
            <div className="flex flex-col lg:flex-row gap-4 items-stretch">
              <button
                onClick={() => activeScheme && setSelectedScheme(activeScheme)}
                className="group flex-1 flex flex-col lg:flex-row gap-3 text-left rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 via-white to-emerald-50/40 hover:from-emerald-50 hover:via-white hover:to-emerald-100/60 transition-all duration-300 overflow-hidden shadow-xs hover:shadow-md hover:-translate-y-0.5"
              >
                <div className="w-full lg:w-1/3 h-40 lg:h-auto bg-slate-200 flex items-center justify-center overflow-hidden relative">
                  {activeScheme.imageUrl ? (
                    <>
                      <img
                        src={activeScheme.imageUrl}
                        alt={activeScheme.name}
                        className="h-full w-full object-cover transform group-hover:scale-[1.03] transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-emerald-900/10 group-hover:bg-emerald-900/0 transition-colors" />
                    </>
                  ) : (
                    <div className="h-full w-full bg-slate-300 flex items-center justify-center text-xs text-slate-600">
                      Image placeholder
                    </div>
                  )}
                </div>
                <div className="flex-1 p-3 md:p-4 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-sm md:text-base font-semibold text-slate-900">
                        {activeScheme.name}
                      </p>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100">
                        PM Yojana
                      </span>
                    </div>
                    <p className="text-[11px] text-emerald-700 mt-1">
                      “{activeScheme.tagline}”
                    </p>
                    <p className="text-[11px] text-slate-600 mt-2">
                      {activeScheme.shortNote}
                    </p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {activeScheme.focusAreas &&
                        activeScheme.focusAreas.map((area) => (
                          <span
                            key={area}
                            className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200"
                          >
                            {area}
                          </span>
                        ))}
                    </div>
                  </div>
                  <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500">
                    <span className="flex items-center gap-1">
                      <span className="h-2 w-2 rounded-full bg-emerald-400 group-hover:bg-emerald-500 transition-colors" />
                      Click to see full details and how to apply
                    </span>
                    <span className="text-slate-400 group-hover:text-emerald-700 transition-colors">
                      View details →
                    </span>
                  </div>
                </div>
              </button>

              <div className="w-full lg:w-56 flex flex-col justify-between gap-3 text-xs">
                <div className="rounded-xl bg-emerald-50 border border-emerald-100 p-3 shadow-xs">
                  <p className="text-[11px] text-emerald-700">
                    How this helps sustainability
                  </p>
                  <p className="text-xs text-emerald-900 mt-1">
                    Many schemes support micro-irrigation, soil testing, crop insurance and direct
                    income support so you can experiment with eco-friendly practices more safely.
                  </p>
                </div>
                <div className="rounded-xl bg-slate-50 border border-slate-200 p-3 shadow-xs">
                  <p className="text-[11px] text-slate-700">Note</p>
                  <p className="text-xs text-slate-700 mt-1">
                    Exact guidelines, eligibility and subsidy amounts change over time and differ
                    by state. Always check the latest official information before applying.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center gap-1 mt-1">
              {schemes.map((scheme, index) => (
                <button
                  key={scheme.id || scheme._id || index}
                  onClick={() => setActiveSchemeIndex(index)}
                  className={`h-1.5 rounded-full transition-all ${index === activeSchemeIndex
                    ? 'w-6 bg-emerald-500'
                    : 'w-2 bg-slate-300 hover:bg-slate-400'
                    }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="rounded-2xl bg-white border border-slate-200 p-4 space-y-2 shadow-sm">
          <p className="text-xs text-slate-500">Getting started</p>
          <p className="text-sm font-semibold text-slate-900">
            Not sure which method fits your farm?
          </p>
          <p className="text-xs text-slate-600">
            Start small on one part of your land. For example, try organic compost on one plot,
            plant a few boundary trees, or keep soil covered after harvest.
          </p>
        </div>
        <div className="rounded-2xl bg-emerald-50 border border-emerald-100 p-4 space-y-2 shadow-sm">
          <p className="text-xs text-emerald-700">Tip</p>
          <p className="text-sm font-semibold text-emerald-900">
            Observe your field before making big changes
          </p>
          <p className="text-xs text-emerald-800">
            Notice where water stands, where plants grow better, and which pests come. Good
            observation makes every sustainable method more effective and less risky.
          </p>
        </div>
        <div className="rounded-2xl bg-sky-50 border border-sky-100 p-4 space-y-2 shadow-sm">
          <p className="text-xs text-sky-700">Goal</p>
          <p className="text-sm font-semibold text-sky-900">
            Encourage more people to try sustainable farming
          </p>
          <p className="text-xs text-sky-800">
            Share this dashboard with neighbours or farmer groups, watch one method video together,
            and discuss which practice is easiest to start this season.
          </p>
        </div>
      </div>

      {selectedMethod && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 px-3">
          <div className="w-full max-w-4xl rounded-2xl bg-white shadow-2xl border border-slate-200 overflow-hidden animate-[fadeIn_0.18s_ease-out]">
            <div className="flex items-center justify-between px-4 md:px-6 py-3 border-b border-slate-200 bg-slate-50">
              <div>
                <p className="text-[11px] text-slate-500">Sustainable method</p>
                <h3 className="text-base md:text-lg font-semibold text-slate-900">
                  {selectedMethod.name}
                </h3>
              </div>
              <button
                onClick={() => setSelectedMethod(null)}
                className="text-xs px-3 py-1.5 rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200"
              >
                Close
              </button>
            </div>

            <div className="p-4 md:p-6 space-y-4 max-h-[75vh] overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2 space-y-2">
                  <p className="text-sm font-semibold text-slate-900">
                    What is {selectedMethod.name.toLowerCase()}?
                  </p>
                  <p className="text-xs md:text-sm text-slate-700">
                    {selectedMethod.description}
                  </p>
                  <p className="text-xs text-slate-600 mt-1">
                    {selectedMethod.highlight}
                  </p>
                  <div className="mt-2">
                    <p className="text-xs font-semibold text-slate-900">
                      Why this method supports sustainable farming
                    </p>
                    <ul className="mt-1 text-xs text-slate-700 list-disc pl-4 space-y-1">
                      {(selectedMethod.benefits || []).map((b) => (
                        <li key={b}>{b}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="rounded-xl bg-slate-50 border border-slate-200 p-3 flex flex-col">
                  <p className="text-xs font-semibold text-slate-900 mb-1">
                    Adoption trend (example)
                  </p>
                  <p className="text-[11px] text-slate-600 mb-2">
                    How many farmers or acres are using this method over time.
                  </p>
                  <div className="flex-1 flex items-end gap-2 h-32">
                    {(selectedMethod.usageTrend || []).map((point) => {
                      const height = maxUsageValue
                        ? (point.value / maxUsageValue) * 100
                        : 0;
                      return (
                        <div
                          key={point.label}
                          className="flex flex-col items-center justify-end gap-1 flex-1"
                        >
                          <div className="w-full max-w-[24px] rounded-t-lg bg-emerald-100 flex items-end justify-center overflow-hidden">
                            <div
                              className="w-full bg-gradient-to-t from-emerald-500 to-emerald-300 transition-all duration-500"
                              style={{ height: `${height}%` }}
                            />
                          </div>
                          <span className="text-[10px] text-slate-500">
                            {point.label}
                          </span>
                          <span className="text-[10px] text-emerald-700 font-medium">
                            {point.value}%
                          </span>
                        </div>
                      );
                    })}
                  </div>
                  <p className="mt-2 text-[10px] text-slate-500">
                    This is a sample trend to show how adoption can grow when farmers see benefits
                    in yield, soil health and cost savings.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
                <div className="md:col-span-2 rounded-xl bg-slate-50 border border-slate-200 p-3 md:p-4">
                  <p className="text-xs font-semibold text-slate-900 mb-1">
                    Practical ways you can start using this method
                  </p>
                  <ul className="mt-1 text-xs text-slate-700 list-disc pl-4 space-y-1">
                    {(selectedMethod.practices || []).map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                  <p className="text-[11px] text-slate-600 mt-2">
                    You do not have to change everything at once. Start on one field or one season,
                    observe the results, and then slowly scale up.
                  </p>
                </div>

                <div className="rounded-xl bg-white border border-slate-200 p-3 md:p-4 flex flex-col gap-2">
                  <p className="text-xs font-semibold text-slate-900">
                    Watch a short video about {selectedMethod.name.toLowerCase()}
                  </p>
                  <p className="text-[11px] text-slate-600">
                    Open this video to see real-life examples and simple explanations.
                  </p>
                  {selectedMethod.videoUrl && (
                    <a
                      href={selectedMethod.videoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-1 inline-flex items-center justify-center text-xs px-3 py-2 rounded-full bg-red-500 text-white font-medium hover:bg-red-600"
                    >
                      ▶ Open YouTube video
                    </a>
                  )}
                  <p className="text-[10px] text-slate-500">
                    Try watching it with other farmers and discuss what can work in your area this
                    year.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedScheme && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 px-3">
          <div className="w-full max-w-4xl rounded-2xl bg-white shadow-2xl border border-slate-200 overflow-hidden animate-[fadeIn_0.18s_ease-out]">
            <div className="flex items-center justify-between px-4 md:px-6 py-3 border-b border-slate-200 bg-slate-50">
              <div>
                <p className="text-[11px] text-slate-500">
                  Government subsidy / PM Yojana
                </p>
                <h3 className="text-base md:text-lg font-semibold text-slate-900">
                  {selectedScheme.name}
                </h3>
              </div>
              <button
                onClick={() => setSelectedScheme(null)}
                className="text-xs px-3 py-1.5 rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200"
              >
                Close
              </button>
            </div>

            <div className="p-4 md:p-6 space-y-4 max-h-[75vh] overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2 space-y-2">
                  <p className="text-sm font-semibold text-slate-900">
                    About this scheme
                  </p>
                  <p className="text-xs md:text-sm text-slate-700">
                    {selectedScheme.tagline}
                  </p>
                  <p className="text-xs text-slate-600 mt-1">
                    {selectedScheme.howItHelps}
                  </p>
                  <div className="mt-2">
                    <p className="text-xs font-semibold text-slate-900">
                      Key focus areas
                    </p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {(selectedScheme.focusAreas || []).map((area) => (
                        <span
                          key={area}
                          className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200"
                        >
                          {area}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="rounded-xl bg-slate-50 border border-slate-200 p-3 flex flex-col gap-2">
                  <p className="text-xs font-semibold text-slate-900">
                    Visual / logo space
                  </p>
                  <div className="h-24 rounded-lg bg-slate-200 flex items-center justify-center text-[11px] text-slate-600">
                    {selectedScheme.imageUrl ? 'Scheme image/logo' : 'Image placeholder'}
                  </div>
                  <p className="text-[10px] text-slate-500">
                    You can place official logos or banners here when integrating with real data.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
                <div className="md:col-span-2 rounded-xl bg-slate-50 border border-slate-200 p-3 md:p-4 space-y-2">
                  <p className="text-xs font-semibold text-slate-900">
                    Who can apply? (Eligibility)
                  </p>
                  <p className="text-xs text-slate-700">
                    {selectedScheme.eligibility}
                  </p>
                  <p className="text-xs font-semibold text-slate-900 mt-2">
                    What kind of support is given?
                  </p>
                  <p className="text-xs text-slate-700">
                    {selectedScheme.support}
                  </p>
                  <p className="text-[11px] text-slate-600 mt-2">
                    For exact rules, documents needed and application process, always refer to the
                    latest official guidelines from government portals or local agriculture offices.
                  </p>
                </div>

                <div className="rounded-xl bg-white border border-slate-200 p-3 md:p-4 flex flex-col gap-2">
                  <p className="text-xs font-semibold text-slate-900">
                    Learn more about this scheme
                  </p>
                  <p className="text-[11px] text-slate-600">
                    Open the official website or information page in a new tab.
                  </p>
                  <a
                    href={selectedScheme.learnMoreUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-1 inline-flex items-center justify-center text-xs px-3 py-2 rounded-full bg-emerald-500 text-white font-medium hover:bg-emerald-600"
                  >
                    🌐 Open official link
                  </a>
                  <p className="text-[10px] text-slate-500">
                    You can also visit your nearest Krishi Vigyan Kendra (KVK) or agriculture
                    department office for help in filling forms and understanding benefits.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
