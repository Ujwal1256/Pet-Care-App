import React, { useEffect, useState } from "react";
import AddPetModal from "../components/AddPetModal";
import { useDispatch, useSelector } from "react-redux";
import { addPet } from "../features/myPets/petSlice";
import { showError, showSuccess } from "../utils/toastUtils";

const MyPets = () => {
  const dispatch = useDispatch();
  const { pets } = useSelector((state) => state.pets);
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  const handleSubmit = (e) => {
    try {
      e.preventDefault();
      dispatch(addPet({ petData, uid }));
      showSuccess("Pet added Successfully");
    } catch (error) {
      showError("Faied to Add Pet");
    } finally {
      setPetData({ name: "", type: "", breed: "", age: "", gender: "" });
      setIsModalOpen(false);
    }
  };



  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Pets</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Pet
        </button>
      </div>

      {pets && pets.length > 0 ? (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {pets.map((pet) => (
            <div
              key={pet.id}
              className="bg-white bg-teal-100 shadow-md rounded-lg p-4 border border-gray-100 hover:shadow-lg transition"
            >
              <h2 className="text-xl font-semibold text-blue-700">
                {pet.name}
              </h2>
              <p className="text-gray-600">
                <span className="font-medium">Type:</span> {pet.type}
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Breed:</span> {pet.breed}
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Age:</span> {pet.age}
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Gender:</span> {pet.gender}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-gray-500 italic">No pets added yet.</div>
      )}

      <AddPetModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onChange={handleChange}
        onSubmit={handleSubmit}
        petData={petData}
      />
    </div>
  );
};

export default MyPets;
