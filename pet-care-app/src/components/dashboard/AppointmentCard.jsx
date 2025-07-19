import React from 'react';

const AppointmentCard = () => {
  return (
    <div className="bg-[#ffeedd] border border-[#ffdab9] rounded-2xl p-5 shadow-sm w-full max-w-md mx-auto">
      <h3 className="text-lg font-semibold text-[#a35200] mb-3">Upcoming Appointments</h3>
      <ul className="text-sm text-[#924d00] space-y-2">
        <li className="flex items-center">
          <span className="text-lg mr-2">🩺</span>
          <span><strong>Vet Visit:</strong> Aug 21, 10:00 AM</span>
        </li>
        <li className="flex items-center">
          <span className="text-lg mr-2">🛁</span>
          <span><strong>Grooming:</strong> Sep 02, 3:30 PM</span>
        </li>
      </ul>
    </div>
  );
};

export default AppointmentCard;
