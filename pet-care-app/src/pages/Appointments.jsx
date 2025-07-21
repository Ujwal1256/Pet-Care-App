import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AppointmentModal from "../components/AppointmentModal";
import ConfirmModal from "../components/ConfirmModal"; 
import { showError, showSuccess } from "../utils/toastUtils";
import {
  addAppointment,
  deleteAppointment,
  updateAppointment,
} from "../features/appointment/appointmentSlice";

export default function Appointments() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState(null);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [appointmentToDelete, setAppointmentToDelete] = useState(null); 

  const dispatch = useDispatch();
  const { appointments } = useSelector((state) => state.appointments);
  const { pets } = useSelector((state) => state.pets);
  const { user } = useSelector((state) => state.auth);
  const uid = user?.uid;

  const handleSubmitAppointment = (data) => {
    try {
      if (editingAppointment) {
        dispatch(
          updateAppointment({
            uid,
            applyId: editingAppointment.applyId,
            updatedData: data,
          })
        );
        showSuccess("Appointment updated successfully");
      } else {
        dispatch(addAppointment({ appointmentData: data, uid }));
        showSuccess("Appointment added successfully");
      }
    } catch (error) {
      showError("Operation failed");
      console.log(error.message);
    } finally {
      setEditingAppointment(null);
      setIsModalOpen(false);
    }
  };

  const handleShowForm = () => {
    if (!Array.isArray(pets) || pets.length === 0) {
      showError("Please add a pet first before scheduling an appointment.");
      return;
    }
    setIsModalOpen(true);
  };

  const handleUpdate = (appointment) => {
    setEditingAppointment(appointment);
    setIsModalOpen(true);
  };

  const confirmDelete = (appointment) => {
    setAppointmentToDelete(appointment);
    setConfirmModalOpen(true);
  };

  const handleDelete = () => {
    if (!appointmentToDelete) return;

    try {
      dispatch(deleteAppointment({ uid, applyId: appointmentToDelete.applyId }));
      showError("Appointment Cancelled ❌");
    } catch (error) {
      showError(error.message);
    } finally {
      setConfirmModalOpen(false);
      setAppointmentToDelete(null);
    }
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

      {/* Appointment Modal */}
      <AppointmentModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingAppointment(null);
        }}
        onSubmit={handleSubmitAppointment}
        initialData={editingAppointment}
      />

      {/* Confirm Cancel Modal */}
      <ConfirmModal
        isOpen={confirmModalOpen}
        onClose={() => setConfirmModalOpen(false)}
        onConfirm={handleDelete}
        message={`Are you sure you want to cancel the appointment for ${appointmentToDelete?.petName}?`}
      />

      {/* Appointments List */}
      {appointments && appointments.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {appointments.map((appt) => (
            <div
              key={appt.applyId}
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
                  onClick={() => handleUpdate(appt)}
                >
                  Edit
                </button>
                <button
                  className="px-3 py-1 text-sm bg-red-500 hover:bg-red-600 text-white rounded"
                  onClick={() => confirmDelete(appt)}
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
