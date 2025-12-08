import React from 'react'

export default function HeaderBar({ activeItem }) {
  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 md:px-6">
      <div className="flex flex-col gap-1">
        <p className="text-[11px] text-slate-500">Sustainable Farming Assistant</p>
        <h2 className="text-base md:text-lg font-semibold">{activeItem.label}</h2>
      </div>
      <div className="flex items-center gap-3 text-xs">
        <div className="hidden md:flex items-center bg-slate-100 px-3 py-1.5 rounded-full">
          <span className="text-slate-500 mr-2 text-xs">Search</span>
          <input
            className="bg-transparent outline-none text-xs w-32"
            placeholder="Fields, crops..."
          />
        </div>
        <button className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center text-lg">
          🔔
        </button>
        <div className="flex items-center gap-2 px-2 py-1 rounded-full bg-slate-100">
          <div className="h-7 w-7 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs font-semibold">
            A
          </div>
          <div className="hidden sm:flex flex-col items-start">
            <span className="font-medium text-sm">Amrit</span>
            <span className="text-[10px] text-slate-500">My farm</span>
          </div>
        </div>
      </div>
    </header>
  )
}
