import React from 'react';
import { Link } from 'react-router-dom';

export default function QuickActions() {
  return (
    <div className="bg-indigo-100 p-4 rounded-xl shadow-md w-full md:w-[48%]">
      <h3 className="text-lg font-bold mb-2 text-indigo-700">Quick Links</h3>
      <ul className="space-y-1 text-sm">
        <li>
          <Link to="/appointments" className="text-indigo-600 hover:underline">📅 Manage Appointments</Link>
        </li>
        <li>
          <Link to="/mypets" className="text-indigo-600 hover:underline">🐕 View Pets</Link>
        </li>
        <li>
          <Link to="/reminders" className="text-indigo-600 hover:underline">⏰ Set Reminders</Link>
        </li>
      </ul>
    </div>
  );
}
