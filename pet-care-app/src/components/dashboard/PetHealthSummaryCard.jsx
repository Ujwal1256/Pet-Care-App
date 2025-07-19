import React from 'react';

export default function PetHealthSummaryCard() {
  return (
    <div className="bg-green-100 p-5 shadow-sm w-full max-w-md rounded-2xl mx-auto]">
      <h3 className="text-lg font-bold mb-2 text-green-700">Pet Health Summary</h3>
      <ul className="space-y-1 text-sm">
        <li>🐶 Charlie - Vaccinated ✅</li>
        <li>🐱 Luna - Due for deworming ⚠️</li>
        <li>🐾 Max - Annual check-up in 2 weeks 📅</li>
      </ul>
    </div>
  );
}
