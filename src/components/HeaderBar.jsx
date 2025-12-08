// src/components/HeaderBar.jsx
import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '../context/ThemeContext';

export default function HeaderBar({ activeItem, onLogout }) {
  const { theme, toggleTheme } = useTheme();
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);

  const tips = [
    'Use mulching to keep soil moist and reduce weeds.',
    'Rotate crops to improve soil health and break pest cycles.',
    'Collect rainwater to reduce dependency on groundwater.',
    'Add compost regularly to boost soil organic matter.',
    'Grow border trees or hedges to reduce wind and soil erosion.',
  ];

  const [tipIndex, setTipIndex] = useState(0);

  useEffect(() => {
    function handleClickOutside(e) {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (!tips.length) return;
    const id = setInterval(() => {
      setTipIndex((prev) => (prev + 1) % tips.length);
    }, 8000); // change tip every 8 seconds
    return () => clearInterval(id);
  }, [tips.length]);

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    } else {
      window.localStorage.clear();
      window.location.href = '/login';
    }
  };

  return (
    <header className="h-16 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-4 md:px-6 bg-gradient-to-r from-emerald-50 via-slate-50 to-sky-50 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900 backdrop-blur">
      {/* Left: title + page info */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/10 border border-emerald-200 dark:border-emerald-700 dark:bg-emerald-900/30 text-[13px]">
            🌱
          </span>
          <p className="text-[11px] font-medium tracking-wide text-emerald-700 dark:text-emerald-300 uppercase">
            Sustainable Farming Assistant
          </p>
        </div>

        <div className="flex items-center gap-2 mt-0.5">
          <h2 className="text-base md:text-lg font-semibold text-slate-900 dark:text-slate-50">
            {activeItem.label}
          </h2>
          
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-3 text-xs">
        {/* Daily tip chip (no fake data, just helpful tips) */}
        <div className="hidden md:flex items-center gap-2 px-5 py-1.5 rounded-full bg-slate-200/80 dark:bg-slate-800/90 border border-slate-300/70 dark:border-slate-700/70 shadow-sm max-w-s">
          <span className="text-[14px]">💡</span>
          <div className="flex flex-col leading-tight">
            <span className="text-[11px] text-slate-600 dark:text-slate-300">
              Daily tip
            </span>
            <span className="text-[11px] font-semibold text-slate-800 dark:text-slate-100 truncate">
              {tips[tipIndex]}
            </span>
          </div>
        </div>

        {/* Theme toggle pill */}
        <button
          onClick={toggleTheme}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-200/80 dark:bg-slate-800/90 border border-slate-300 dark:border-slate-700 text-[11px] shadow-sm transition-colors"
        >
          <div className="relative w-9 h-4 rounded-full bg-slate-300 dark:bg-slate-700 flex items-center px-[2px]">
            <div
              className={`h-3 w-3 rounded-full bg-white dark:bg-slate-200 shadow-sm transform transition-transform ${
                theme === 'dark' ? 'translate-x-4' : 'translate-x-0'
              }`}
            />
          </div>
          {theme === 'light' ? (
            <>
              <span className="text-amber-500 text-sm">☀️</span>
              <span className="text-slate-700">Light</span>
            </>
          ) : (
            <>
              <span className="text-sky-400 text-sm">🌙</span>
              <span className="text-slate-100">Dark</span>
            </>
          )}
        </button>

        {/* Profile + dropdown */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setProfileOpen((prev) => !prev)}
            className="flex items-center gap-2 px-2.5 py-1.5 rounded-full bg-slate-200/80 dark:bg-slate-800 border border-slate-300/70 dark:border-slate-700/80 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          >
            <div className="h-7 w-7 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs font-semibold">
              A
            </div>
            <div className="hidden sm:flex flex-col items-start">
              <span className="font-medium text-sm text-slate-900 dark:text-slate-50">
                Amrit
              </span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400">
                My farm
              </span>
            </div>
            <span className="hidden sm:inline text-[10px] text-slate-500 dark:text-slate-400">
              ▾
            </span>
          </button>

          {profileOpen && (
            <div className="absolute right-0 mt-2 w-44 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-lg py-2 z-30">
              <div className="px-3 pb-2 border-b border-slate-100 dark:border-slate-800 mb-1">
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Signed in as
                </p>
                <p className="text-xs font-semibold text-slate-900 dark:text-slate-50">
                  Amrit
                </p>
              </div>

              <button
                className="w-full text-left px-3 py-1.5 text-xs text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-2"
              >
                <span>👤</span>
                <span>Profile (coming soon)</span>
              </button>

              <button
                onClick={handleLogout}
                className="w-full text-left px-3 py-1.5 text-xs text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 flex items-center gap-2 mt-1"
              >
                <span>🚪</span>
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
