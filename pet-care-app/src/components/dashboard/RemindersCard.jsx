import React from 'react';
import { useSelector } from 'react-redux';

export default function RemindersCard() {

  const {reminders} = useSelector((state) => state.reminders)

  if (!Array.isArray(reminders) || reminders.length === 0) {
    return (
      <div className="bg-yellow-100 p-5 shadow-sm rounded-2xl w-full max-w-md mx-auto">
        <h3 className="text-lg font-bold mb-2 text-yellow-700">Top Reminders</h3>
        <p className="text-sm text-yellow-600">No reminders found.</p>
      </div>
    );
  }

  // Get current time
  const now = new Date();

  // Parse reminder times into Date objects for today and filter future ones
  const upcomingReminders = reminders
    .map((reminder) => {
      const [hours, minutes] = reminder.time.split(':').map(Number);
      const reminderDate = new Date();
      reminderDate.setHours(hours, minutes, 0, 0);
      return { ...reminder, reminderDate };
    })
    .filter((reminder) => reminder.reminderDate > now)
    .sort((a, b) => a.reminderDate - b.reminderDate)
    .slice(0, 3);

  return (
    <div className="bg-yellow-100 p-5 shadow-sm rounded-2xl w-full max-w-md mx-auto">
      <h3 className="text-lg font-bold mb-2 text-yellow-700">Top Reminders</h3>
      {upcomingReminders.length > 0 ? (
        <ul className="text-sm space-y-1">
          {upcomingReminders.map((reminder) => (
            <li key={reminder.reminderId}>
              ⏰ <strong>{reminder.time}</strong> - {reminder.title}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-yellow-600">No upcoming reminders for today.</p>
      )}
    </div>
  );
}
