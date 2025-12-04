import React from 'react';
import {
  LayoutDashboard,
  AlertTriangle,
  Users,
  Package,
  Bell,
  UserRoundSearch,
  X,
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation();

  const navigation = [
    { id: 'dashboard', name: 'Dashboard', icon: <LayoutDashboard size={18} />, path: '/' },
    { id: 'missingPersons', name: 'Missing Persons', icon: <UserRoundSearch size={18} />, path: '/missing-persons' },
    { id: 'disasters', name: 'Disasters', icon: <AlertTriangle size={18} />, path: '/disasters' },
    { id: 'resources', name: 'Resources', icon: <Package size={18} />, path: '/resources' },
    { id: 'volunteers', name: 'Volunteers', icon: <Users size={18} />, path: '/volunteers' },
    { id: 'alerts', name: 'Alerts', icon: <Bell size={18} />, path: '/alerts' },
  ];

  return (
    <>
      {/* Backdrop (only visible on mobile when open) */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/40 z-30 lg:hidden transition-opacity duration-300 ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      ></div>

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 h-full w-[250px] bg-[#101828] text-white z-40 transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}
      >
        {/* Header */}
        <div className="border-b border-[#99a1af] relative">
          <h1 className="font-semibold p-4 pb-0 text-xl">Disaster Management</h1>
          <p className="text-sm p-2 pl-4 text-[#99a1af] pb-6">Admin Portal</p>

          {/* Close button (mobile only) */}
          {/* <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-white lg:hidden"
          >
            <X size={20} />
          </button> */}
        </div>

        {/* Navigation */}
        <nav className="flex flex-col mt-4 gap-2.5 text-white">
          {navigation.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.id}
                to={item.path}
                onClick={onClose} // close sidebar on mobile after navigation
                className={`flex items-center gap-3 px-4 py-3 mx-2 rounded-lg transition-colors 
                ${
                  isActive
                    ? 'bg-[#155dfc] text-white'
                    : 'text-white hover:bg-[#1D2939] hover:text-white'
                }`}
              >
                {item.icon}
                <span className="text-sm font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
