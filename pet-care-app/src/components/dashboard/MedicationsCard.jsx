import React from 'react';

export default function MedicationsCard() {
  return (
    <div className="bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 p-5 rounded-2xl shadow-md w-full max-w-md mx-auto sm:p-6 md:p-8">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">Medications</h3>
      <ul className="space-y-3">
        <li className="text-sm text-gray-700 flex items-center">
          <span className="text-xl">🐕</span>
          <span className="ml-2 font-medium text-gray-900">Charlie</span> — 
          <span className="ml-1 text-gray-800">Antibiotics</span> — 
          <span className="ml-1 text-gray-600">Daily</span>
        </li>
        <li className="text-sm text-gray-700 flex items-center">
          <span className="text-xl">🐈</span>
          <span className="ml-2 font-medium text-gray-900">Whiskers</span> — 
          <span className="ml-1 text-gray-800">Eye Drops</span> — 
          <span className="ml-1 text-gray-600">2x a day</span>
        </li>
      </ul>
    </div>
  );
}
