import React, { useState } from "react";
import { useSelector } from "react-redux";
import { showError } from "../utils/toastUtils";

export default function WeightModal({ isOpen, onClose, onSubmit }) {
  const pets = useSelector((state) => state.pets.pets);

  const [formData, setFormData] = useState({
    petName: "",
    petId: "",
    weight: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "petName") {
      // Find selected pet to get its ID
      const selectedPet = pets.find((pet) => pet.name === value);
      setFormData((prev) => ({
        ...prev,
        petName: value,
        petId: selectedPet?.petId || "",
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { petName, petId, weight } = formData;

    if (!petName || !weight || !petId) {
      showError("Please fill in all fields");
      return;
    }

    const dataToSend = {
      ...formData,
      weight: parseFloat(weight),
      date: new Date().toISOString().split("T")[0],
    };

    onSubmit(dataToSend);
    onClose();
    setFormData({ petName: "", petId: "", weight: "" });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
      <div className="bg-white rounded-xl p-6 shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-4 text-blue-600">
          Add Pet Weight
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Pet Dropdown */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Select Pet
            </label>
            <select
              name="petName"
              value={formData.petName}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">-- Select Pet --</option>
              {pets.map((pet) => (
                <option key={pet.petId} value={pet.name}>
                  {pet.name} ({pet.breed})
                </option>
              ))}
            </select>
          </div>

          {/* Weight Input */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Weight (kg)
            </label>
            <input
              type="number"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              min="0"
              step="0.1"
              required
              placeholder="Enter weight"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 font-medium"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
