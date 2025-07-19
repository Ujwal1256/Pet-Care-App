import React, { useContext, useState } from 'react';
import AppointmentModal from '../components/AppointmentModal';
import {UserContext} from '../ContextAPI/UserContext'
export default function Appointments() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {user} = useContext(UserContext)
  console.log("User",user)
  const handleAddAppointment = (data) => {
    console.log('Appointment Data:', data); 
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Appointments</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          + Add Appointment
        </button>
      </div>

      {/* AppointmentModal */}
      <AppointmentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddAppointment}
      />

      {/* Upcoming appointment list will go here */}
      <div className="text-gray-500">No appointments yet.</div>
    </div>
  );
}
