import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { showError } from "../utils/toastUtils";

export default function MedicationModal({ isOpen, onClose, onSubmit,initialData }) {
  const pets = useSelector((state) => state.pets.pets);

  const [formData, setFormData] = useState({
    petName: "",
    medication: "",
    dosage: "",
    frequency: "",
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        petName: initialData.petName || "",
        medication: initialData.medication || "",
        dosage: initialData.dosage || "",
        frequency: initialData.frequency || "",
        startDate: initialData.startDate || "",
        endDate: initialData.endDate || "",
      });
    } else {
      setFormData({
        petName: "",
        medication: "",
        dosage: "",
        frequency: "",
        startDate: "",
        endDate: "",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

   const handleSubmit = (e) => {
    e.preventDefault();
    const { petName, medication, dosage, frequency, startDate, endDate } = formData;

    if (!petName || !medication || !dosage || !frequency || !startDate || !endDate) {
      showError("Please fill in all fields.");
      return;
    }

    const dataToSubmit = {
      ...formData,
      medicationId: initialData?.medicationId || Date.now().toString(),
    };

    onSubmit(dataToSubmit);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/40">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
        <h3 className="text-xl font-semibold mb-4">Add Medication</h3>

        <form onSubmit={handleSubmit} className="space-y-3">
          <select
            name="petName"
            value={formData.petName}
            onChange={handleChange}
            required
            className="w-full border rounded p-2"
          >
            <option value="">Select Pet</option>
            {pets.map((pet, idx) => (
              <option key={idx} value={pet.name}>
                {pet.name} ({pet.breed})
              </option>
            ))}
          </select>

          <input
            name="medication"
            placeholder="Medication Name"
            value={formData.medication}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />

          <input
            name="dosage"
            placeholder="Dosage (e.g., 1 pill)"
            value={formData.dosage}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />

          <input
            name="frequency"
            placeholder="Frequency (e.g., Twice a day)"
            value={formData.frequency}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />

          <div className="flex space-x-2">
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className="w-full border rounded p-2"
            />
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              className="w-full border rounded p-2"
            />
          </div>

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
              {initialData ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
