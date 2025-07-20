import React from 'react';

export default function RemindersCard({ reminders }) {
  // Check if reminders is a valid array
  if (!Array.isArray(reminders) || reminders.length === 0) {
    return (
      <div className="bg-yellow-100 p-5 shadow-sm rounded-2xl w-full max-w-md mx-auto">
        <h3 className="text-lg font-bold mb-2 text-yellow-700">Top Reminders</h3>
        <p className="text-sm text-yellow-600">No reminders found.</p>
      </div>
    );
  }

  // Sort by time and take top 3
  const topReminders = [...reminders]
    .sort((a, b) => new Date(`1970/01/01 ${a.time}`) - new Date(`1970/01/01 ${b.time}`))
    .slice(0, 3);

  return (
    <div className="bg-yellow-100 p-5 shadow-sm rounded-2xl w-full max-w-md mx-auto">
      <h3 className="text-lg font-bold mb-2 text-yellow-700">Top Reminders</h3>
      <ul className="text-sm space-y-1">
        {topReminders.map((reminder) => (
          <li key={reminder.id}>
            ⏰ <strong>{reminder.time}</strong> - {reminder.title}
          </li>
        ))}
      </ul>
    </div>
  );
}
