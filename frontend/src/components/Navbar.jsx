import React from "react";
import { Menu, X } from "lucide-react";

const Navbar = ({ sidebarOpen, setSidebarOpen }) => {
  return (
    <header className="bg-[#f9fafb] border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-40">
      {/* Left: Mobile Menu Toggle */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="text-gray-700 hover:text-black lg:hidden transition"
      >
        {sidebarOpen ? <X size={22} /> : <Menu size={22} />}
      </button>

      {/* Right: User Info */}
      <div className="flex items-center gap-4 ml-auto">
        <div className="text-right">
          <p className="text-sm font-medium text-gray-700">Admin User</p>
          <p className="text-xs text-gray-500">admin@disaster.gov</p>
        </div>

        {/* Avatar Circle */}
        <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
          A
        </div>
      </div>
    </header>
  );
};

export default Navbar;
