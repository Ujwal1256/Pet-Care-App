import React, { useState } from "react";
import MedicationModal from "../components/MedicationModal";
import { useDispatch, useSelector } from "react-redux";
import {
  addMedication,
  updateMedication,
  deleteMedication,
} from "../features/medication/medicationSlice";
import { showError, showSuccess } from "../utils/toastUtils";
import ConfirmModal from "../components/ConfirmModal";

export default function Medications() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMed, setEditingMed] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState(null);

  const { user } = useSelector((state) => state.auth);
  const { medications } = useSelector((state) => state.medication);
  const { pets } = useSelector((state) => state.pets);

  const uid = user?.uid;
  const dispatch = useDispatch();

  const handleShowForm = () => {
    if (!Array.isArray(pets) || pets.length === 0) {
      showError("Please add a pet first before scheduling an appointment.");
      return;
    }
    setEditingMed(null);
    setIsModalOpen(true);
  };

  const handleSubmit = (data) => {
    try {
      if (editingMed) {
        dispatch(
          updateMedication({
            uid,
            updatedMedication: { ...editingMed, ...data },
          })
        );
        showSuccess("Medication updated ✅");
      } else {
        dispatch(addMedication({ medicationData: data, uid }));
        showSuccess("Medication added ✅");
      }
      setIsModalOpen(false);
      setEditingMed(null);
    } catch (error) {
      showError(error.message || "Failed to save medication");
    }
  };

  const handleDelete = (medicationId) => {
    setPendingDeleteId(medicationId);
    setConfirmOpen(true);
  };

  const confirmDelete = () => {
    if (!pendingDeleteId) return;
    dispatch(deleteMedication({ uid, medicationId: pendingDeleteId }))
      .then(() => showSuccess("Medication deleted ✅"))
      .catch(() => showError("Failed to delete medication"))
      .finally(() => {
        setConfirmOpen(false);
        setPendingDeleteId(null);
      });
  };

  const handleEdit = (med) => {
    setEditingMed(med);
    setIsModalOpen(true);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Medications</h1>
        <button
          onClick={handleShowForm}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          + Add Medication
        </button>
      </div>

      <p className="text-gray-600 mb-4">Manage your pet's medications here.</p>

      {medications?.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2">
          {medications.map((med) => (
            <div
              key={med.medicationId}
              className="relative bg-white border border-gray-200 rounded-xl shadow-sm p-4 hover:shadow-md transition"
            >
              {/* Frequency Badge */}
              <div className="absolute top-2 right-2 bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
                {med.frequency} 💊
              </div>

              {/* Medication Name */}
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg">💉</span>
                <h2 className="text-lg font-bold text-gray-800">
                  {med.medication}
                </h2>
              </div>

              {/* Pet Name */}
              <p className="text-sm text-gray-600 mb-1">
                <span className="font-medium">🐶 Pet:</span> {med.petName}
              </p>

              {/* Dosage */}
              <p className="text-sm text-gray-600 mb-1">
                <span className="font-medium">💊 Dosage:</span> {med.dosage}
              </p>

              {/* Start and End Date in one line */}
              <p className="text-sm text-gray-600 flex items-center gap-1 mb-2">
                📅{" "}
                <span>
                  {med.startDate} - {med.endDate}
                </span>
              </p>

              {/* Action Icons */}
              <div className="flex justify-end gap-3 mt-2 text-sm">
                <button
                  onClick={() => handleEdit(med)}
                  className="text-blue-600 hover:text-blue-800"
                  title="Edit"
                >
                  ✏️
                </button>
                <button
                  onClick={() => handleDelete(med.medicationId)}
                  className="text-red-500 hover:text-red-700"
                  title="Delete"
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center mt-8 text-lg">
          No medications added yet.
        </p>
      )}

      <MedicationModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingMed(null);
        }}
        onSubmit={handleSubmit}
        initialData={editingMed}
      />

      <ConfirmModal
        isOpen={confirmOpen}
        message="Are you sure you want to delete this medication?"
        onClose={() => {
          setConfirmOpen(false);
          setPendingDeleteId(null);
        }}
        onConfirm={confirmDelete}
      />
    </div>
  );
}
