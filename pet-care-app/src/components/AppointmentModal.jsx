import React, { useState } from "react";
import { useSelector } from "react-redux";
import { showError } from "../utils/toastUtils";

export default function AppointmentModal({ isOpen, onClose, onSubmit }) {
  const pets = useSelector((state) => state.pets.pets);

  const today = new Date().toISOString().split("T")[0];

  const getMinTime = () => {
    if (formData.date === today) {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, "0");
      const minutes = now.getMinutes().toString().padStart(2, "0");
      return `${hours}:${minutes}`;
    }
    return "00:00";
  };

  const [formData, setFormData] = useState({
    petName: "",
    vetName: "",
    reason: "",
    date: "",
    time: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !formData.petName ||
      !formData.vetName ||
      !formData.reason ||
      !formData.date ||
      !formData.time
    ) {
      showError("Please fill in all fields.");
      return;
    }
    console.log("foramdaat",formData)
    onSubmit(formData);
    onClose();
    setFormData({
      petName: "",
      vetName: "",
      reason: "",
      date: "",
      time: "",
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/40">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
        <h3 className="text-xl font-semibold mb-4">Add Appointment</h3>

        <form onSubmit={handleSubmit} className="space-y-3">
          <select
            name="petName"
            value={formData.petName}
            onChange={handleChange}
            required
            className="w-full border rounded p-2"
          >
            <option value="">Select Pet</option>
            {pets.map((pet, index) => (
              <option key={index} value={pet.name}>
                {pet.name} ({pet.breed})
              </option>
            ))}
          </select>

          <input
            name="vetName"
            placeholder="Veterinarian Name"
            value={formData.vetName}
            onChange={handleChange}
            required
            className="w-full border rounded p-2"
          />

          <input
            name="reason"
            placeholder="Reason"
            value={formData.reason}
            onChange={handleChange}
            required
            className="w-full border rounded p-2"
          />

          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            min={new Date().toISOString().split("T")[0]}
            className="w-full border rounded p-2"
          />

          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            required
            min={getMinTime()}
            className="w-full border rounded p-2"
          />

          <div className="mt-4 flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
