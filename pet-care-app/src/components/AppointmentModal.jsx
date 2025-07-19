import React, { useState } from 'react';

export default function AppointmentModal({ isOpen, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    petName: '',
    vetName: '',
    reason: '',
    date: '',
    time: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onSubmit(formData);
    onClose();
    setFormData({ petName: '', vetName: '', reason: '', date: '', time: '' });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/40">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
        <h3 className="text-xl font-semibold mb-4">Add Appointment</h3>
        <div className="space-y-3">
          <input
            name="petName"
            placeholder="Pet Name"
            value={formData.petName}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
          <input
            name="vetName"
            placeholder="Veterinarian Name"
            value={formData.vetName}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
          <input
            name="reason"
            placeholder="Reason"
            value={formData.reason}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
        </div>

        <div className="mt-4 flex justify-end space-x-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-200 rounded">
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
