import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AppointmentModal from "../components/AppointmentModal";
import { showError, showSuccess } from "../utils/toastUtils";
import { addAppointment } from "../features/appointment/appointmentSlice";

export default function Appointments() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const { appointments } = useSelector((state) => state.appointments);
  const { pets } = useSelector((state) => state.pets);
  const { user } = useSelector((state) => state.auth);
  const uid = user?.uid;

  const handleAddAppointment = (data) => {
    try {
      dispatch(addAppointment({ appointmentData: data, uid }));
      showSuccess("Appointment added Successfully",data);
    } catch (error) {
      showError("Failed to add appointment");
      console.log(error.message);
    }
  };

  const handleShowForm = () => {
    if (!Array.isArray(pets) || pets.length === 0) {
      showError("Please add a pet first before scheduling an appointment.");
      return;
    }
    setIsModalOpen(true);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Appointments</h2>
        <button
          onClick={handleShowForm}
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

    {appointments && appointments.length > 0 ? (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
    {appointments.map((appt, index) => (
      <div
        key={index}
        className="bg-white shadow-md rounded-lg p-4 border border-gray-200 hover:shadow-lg transition-shadow"
      >
        <h3 className="text-xl font-semibold text-blue-700 mb-2">
          {appt.petName}
        </h3>

        <p className="text-gray-600">
          <span className="font-medium">Date:</span> {appt.date}
        </p>
        <p className="text-gray-600">
          <span className="font-medium">Time:</span> {appt.time}
        </p>
        <p className="text-gray-600">
          <span className="font-medium">Reason:</span> {appt.reason}
        </p>
        <p className="text-gray-600">
          <span className="font-medium">Veterinarian:</span> {appt.vetName}
        </p>

        <div className="flex justify-end space-x-3 mt-4">
          <button
            className="px-3 py-1 text-sm bg-yellow-400 hover:bg-yellow-500 text-white rounded"
            onClick={() => console.log("Edit", appt)}
          >
            Edit
          </button>
          <button
            className="px-3 py-1 text-sm bg-red-500 hover:bg-red-600 text-white rounded"
            onClick={() => console.log("Cancel", appt)}
          >
            Cancel
          </button>
        </div>
      </div>
    ))}
  </div>
) : (
  <div className="text-gray-500 mt-6">No appointments yet.</div>
)}

    </div>
  );
}
