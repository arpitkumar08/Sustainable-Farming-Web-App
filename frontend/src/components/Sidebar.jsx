import React from 'react'

export default function Sidebar({ navItems, active, setActive }) {
  return (
    <aside className="w-64 bg-white border-r border-slate-200 flex flex-col">
      <div className="px-5 py-4 border-b border-slate-200 flex items-center gap-3">
        <div className="h-10 w-10 rounded-xl bg-emerald-500 flex items-center justify-center text-2xl text-white">
          🌱
        </div>
        <div>
          <h1 className="text-base font-semibold">Sustainable Farm</h1>
          <p className="text-xs text-slate-500">Simple smart farming</p>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map(item => {
          const isActive = active === item.id
          return (
            <button
              key={item.id}
              onClick={() => setActive(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm text-left ${
                isActive
                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                  : 'text-slate-700 hover:bg-slate-100 border border-transparent'
              }`}
            >
              <span>{item.label}</span>
              {isActive && (
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-white text-emerald-700 border border-emerald-300">
                  Active
                </span>
              )}
            </button>
          )
        })}
      </nav>

      <div className="p-4 border-t border-slate-200 text-xs space-y-1">
        <p className="text-slate-500">Today&apos;s quick info</p>
        <div className="flex justify-between">
          <span>Water saving</span>
          <span className="font-semibold text-emerald-700">-18%</span>
        </div>
        <div className="flex justify-between">
          <span>Soil health</span>
          <span className="font-semibold text-emerald-700">Good</span>
        </div>
      </div>
    </aside>
  )
}
