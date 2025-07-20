import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const AppointmentCard = () => {
  const { appointments = [] } = useSelector((state) => state.appointments || {});

  // Sort by upcoming date & time
  const sortedAppointments = [...appointments].sort((a, b) => {
    const dateA = new Date(`${a.date} ${a.time}`);
    const dateB = new Date(`${b.date} ${b.time}`);
    return dateA - dateB;
  });

  const topAppointments = sortedAppointments.slice(0, 3);

  return (
    <div className="bg-[#ffeedd] border border-[#ffdab9] rounded-2xl p-5 shadow-sm w-full max-w-md mx-auto">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-semibold text-[#a35200]">Upcoming Appointments</h3>
        {appointments.length > 3 && (
          <Link to="/appointments" className="text-sm text-blue-600 hover:underline">
            View More &gt;&gt;
          </Link>
        )}
      </div>

      {topAppointments.length > 0 ? (
        <ul className="text-sm text-[#924d00] space-y-2">
          {topAppointments.map((appt, idx) => (
            <li key={idx} className="flex items-center">
              <span className="text-lg mr-2">🩺</span>
              <span>
                <strong>{appt.reason} for {appt.petName}:</strong> {appt.date}, {appt.time}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-gray-500">No upcoming appointments</p>
      )}
    </div>
  );
};

export default AppointmentCard;
