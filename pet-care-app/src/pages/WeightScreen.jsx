// Modified WeightScreen.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addWeight } from "../features/weight/weightSlice";
import WeightModal from "../components/WeightModal";
import WeightChart from "../components/WeightChart";
import { showError } from "../utils/toastUtils";

export default function WeightScreen() {
  const [modalOpen, setModalOpen] = useState(false);
  const weights = useSelector((state) => state.weight.weights);
  const { user } = useSelector((state) => state.auth);
  const uid = user?.uid;
  const pets = useSelector((state) => state.pets.pets);
  const dispatch = useDispatch();


  const handleShowForm = () => {
    if (!Array.isArray(pets) || pets.length === 0) {
      showError("Please add a pet first before scheduling an appointment.");
      return;
    }
    setModalOpen(true);
  };
  const handleAddWeight = (weightData) => {
    try {
      dispatch(
        addWeight({
          uid,
          petId: weightData.petId,
          weight: weightData.weight,
          date: weightData.date,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Weight Tracker</h1>

      <button
        className="bg-blue-600 text-white px-4 py-2 rounded mb-6"
        onClick={handleShowForm}
      >
        ➕ Add Weight
      </button>

      <div className="grid grid-cols-1 gap-6">
        {pets.map((pet) => (
          <div key={pet.petId} className="bg-white shadow-md rounded-xl p-4">
            <h2 className="text-lg font-semibold mb-2">
              {pet.name} ({pet.breed})
            </h2>
            <WeightChart data={weights[pet.petId] || []} />
          </div>
        ))}
      </div>

      <WeightModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleAddWeight}
      />
    </div>
  );
}
