import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { X } from "lucide-react";

const Sidebar = ({ isMobileOpen, onClose }) => {
  const location = useLocation();

  const links = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Appointments", path: "/appointments" },
    { name: "Medications", path: "/medications" },
    { name: "My Pets", path: "/mypets" },
    { name: "Reminders", path: "/reminders" },
    { name: "Weight Monitoring", path: "/weight" },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className=" bg-opacity-40 z-40 md:hidden fixed inset-0 flex items-center justify-center z-50 bg-black/40"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 bg-white md:w-64 w-64 h-full shadow-md transition-transform duration-300 ease-in-out bg-green-900
        ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:static`}
      >
        <div className="flex justify-between items-center p-4 border-b md:hidden">
          <h2 className="text-lg font-bold text-blue-600">PetCare</h2>
          <button onClick={onClose}>
            <X />
          </button>
        </div>
        <div className="hidden md:block p-4 text-xl font-bold border-b">
          PetCare
        </div>
        <nav className="p-4 space-y-2">
          {links.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={onClose}
              className={`block px-4 py-2 rounded-md text-sm font-medium ${
                location.pathname === link.path
                  ? "bg-blue-500 text-white"
                  : "text-gray-700 hover:bg-blue-100"
              }`}
            >
              {link.name}
            </Link>
          ))}

       
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
