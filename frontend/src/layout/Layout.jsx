import React, { useEffect, useMemo, useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import HeaderBar from "../components/HeaderBar";



const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard", path: "/" },
  { id: "my-field", label: "My Field", path: "/my-field" },
  { id: "crop-planner", label: "Crop Planner", path: "/crop-planner" },
  { id: "soil-health", label: "Soil Health", path: "/soil-health" },
  { id: "weather-alerts", label: "Weather & Alerts", path: "/weather-alerts" },
  { id: "community", label: "Community Forum", path: "/community" },
];

export default function Layout() {
  const navigate = useNavigate();
  const location = useLocation();

  // responsive sidebar state (used by HeaderBar + Sidebar)
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // active nav id (dashboard, my-field, ...)
  const [active, setActive] = useState(() => {
    const match = NAV_ITEMS.find((n) => n.path === location.pathname);
    return match ? match.id : "dashboard";
  });

  // maps for quick lookup
  const pathToId = useMemo(() => {
    const map = {};
    NAV_ITEMS.forEach((n) => (map[n.path] = n.id));
    return map;
  }, []);

  const idToPath = useMemo(() => {
    const map = {};
    NAV_ITEMS.forEach((n) => (map[n.id] = n.path));
    return map;
  }, []);

  // when `active` changes (clicked sidebar or header quick link), navigate to its path
  useEffect(() => {
    const target = idToPath[active];
    if (target && target !== location.pathname) {
      navigate(target);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  // when route changes (back/forward or direct link), update active
  useEffect(() => {
    const id = pathToId[location.pathname];
    if (id && id !== active) {
      setActive(id);
    } else if (!id) {
      // fallback for unknown routes
      setActive("dashboard");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  // handler to give to Sidebar/HeaderBar so they can set active without directly navigating
  const handleSetActive = (id) => {
    setActive(id);
    // navigation is handled by the effect above
  };

  const activeItem = NAV_ITEMS.find((n) => n.id === active) || NAV_ITEMS[0];

  return (
    <div className="flex h-screen w-full overflow-hidden">
      {/* Sidebar (responsive). We pass both control props and nav props */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        navItems={NAV_ITEMS}
        active={active}
        setActive={handleSetActive}
      />

      {/* Main content area */}
      <div className="flex flex-1 flex-col bg-[#f9fafb] lg:ml-[250px]">
        {/* HeaderBar: give it activeItem and sidebar controls */}
        <HeaderBar
          activeItem={activeItem}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          setActive={handleSetActive} // optional — in case header has quick links
        />

        {/* Scrollable main area for routed pages */}
        <main className="flex-1 overflow-y-auto px-8 py-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
