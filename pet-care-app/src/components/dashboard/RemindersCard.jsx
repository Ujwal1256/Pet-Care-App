import React from 'react';

export default function RemindersCard() {
  return (
    <div className="bg-yellow-100 p-5 shadow-sm rounded-2xl w-full max-w-md mx-auto">
      <h3 className="text-lg font-bold mb-2 text-yellow-700">Reminders</h3>
      <ul className="text-sm space-y-1">
        <li>💊 Give medicine to Charlie at 8 PM</li>
        <li>🧼 Bathe Luna tomorrow</li>
        <li>📌 Buy pet food this weekend</li>
      </ul>
    </div>
  );
}
