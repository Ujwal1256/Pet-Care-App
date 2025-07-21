import React, { useState, useEffect } from "react";

export default function AppointmentModal({ isOpen, onClose, onSubmit, initialData }) {
  const [formData, setFormData] = useState({
    petName: "",
    vetName: "",
    reason: "",
    date: "",
    time: "",
  });

  // Pre-fill the form when editing
  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({
        petName: "",
        vetName: "",
        reason: "",
        date: "",
        time: "",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/40">
      <div className="bg-white p-6 rounded-lg shadow-md w-[90%] max-w-md">
        <h3 className="text-xl font-bold mb-4 text-gray-800">
          {initialData ? "Edit Appointment" : "Add Appointment"}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="petName"
            value={formData.petName}
            onChange={handleChange}
            placeholder="Pet Name"
            required
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            name="vetName"
            value={formData.vetName}
            onChange={handleChange}
            placeholder="Veterinarian Name"
            required
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            placeholder="Reason for Visit"
            required
            className="w-full p-2 border rounded"
          />
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />

          <div className="flex justify-end space-x-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              {initialData ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
