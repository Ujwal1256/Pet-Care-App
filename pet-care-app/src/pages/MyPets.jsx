import React, { useState } from "react";
import AddPetModal from "../components/AddPetModal";
import ConfirmModal from "../components/ConfirmModal"; // ✅ Import ConfirmModal
import { useDispatch, useSelector } from "react-redux";
import { addPet, updatePet, deletePet } from "../features/myPets/petSlice";
import { showError, showSuccess } from "../utils/toastUtils";

const MyPets = () => {
  const dispatch = useDispatch();
  const { pets } = useSelector((state) => state.pets);
  const uid = useSelector((state) => state.auth.user?.uid);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedPetId, setSelectedPetId] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false); // ✅ For confirm modal
  const [deleteId, setDeleteId] = useState(null); // ✅ Store petId for deletion

  const [petData, setPetData] = useState({
    name: "",
    type: "",
    breed: "",
    age: "",
    gender: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPetData((prev) => ({ ...prev, [name]: value }));
  };

  const openEditModal = (pet) => {
    setPetData(pet);
    setSelectedPetId(pet.petId);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleDelete = async () => {
    try {
      await dispatch(deletePet({ uid, petId: deleteId }));
      showSuccess("Pet deleted successfully");
    } catch (err) {
      showError("Failed to delete pet");
    } finally {
      setConfirmOpen(false);
      setDeleteId(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await dispatch(updatePet({ uid, updatedPet: { ...petData, petId: selectedPetId } }));
        showSuccess("Pet updated successfully");
      } else {
        await dispatch(addPet({ petData, uid }));
        showSuccess("Pet added successfully");
      }
    } catch {
      showError("Failed to save pet");
    } finally {
      setPetData({ name: "", type: "", breed: "", age: "", gender: "" });
      setIsModalOpen(false);
      setIsEditing(false);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Pets</h1>
        <button
          onClick={() => {
            setIsModalOpen(true);
            setIsEditing(false);
            setPetData({ name: "", type: "", breed: "", age: "", gender: "" });
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Pet
        </button>
      </div>

      {pets && pets.length > 0 ? (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {pets.map((pet) => (
            <div
              key={pet.petId}
              className="bg-teal-100 shadow-md rounded-lg p-4 border border-gray-100 hover:shadow-lg transition"
            >
              <h2 className="text-xl font-semibold text-blue-700">{pet.name}</h2>
              <p className="text-gray-600"><span className="font-medium">Type:</span> {pet.type}</p>
              <p className="text-gray-600"><span className="font-medium">Breed:</span> {pet.breed}</p>
              <p className="text-gray-600"><span className="font-medium">Age:</span> {pet.age}</p>
              <p className="text-gray-600"><span className="font-medium">Gender:</span> {pet.gender}</p>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  onClick={() => openEditModal(pet)}
                  className="text-sm px-3 py-1 bg-yellow-400 rounded hover:bg-yellow-500"
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    setDeleteId(pet.petId);
                    setConfirmOpen(true);
                  }}
                  className="text-sm px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-gray-500 italic">No pets added yet.</div>
      )}

      {/* Add / Edit Modal */}
      <AddPetModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onChange={handleChange}
        onSubmit={handleSubmit}
        petData={petData}
        isEditing={isEditing}
      />

      {/* ✅ Confirm Delete Modal */}
      <ConfirmModal
        isOpen={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleDelete}
        message="Are you sure you want to delete this pet?"
      />
    </div>
  );
};

export default MyPets;
