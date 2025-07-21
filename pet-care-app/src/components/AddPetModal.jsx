import React from 'react';

const AddPetModal = ({ isOpen, onClose, onChange, onSubmit, petData, isEditing }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/40">
      <div className="bg-white rounded-2xl shadow-2xl p-6 w-[90%] max-w-md animate-fadeIn">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          {isEditing ? "✏️ Edit Pet" : "🐾 Add a New Pet"}
        </h2>

        <form onSubmit={onSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">Pet Name</label>
            <input
              type="text"
              name="name"
              value={petData.name}
              onChange={onChange}
              placeholder="e.g., Bruno"
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">Type</label>
            <input
              type="text"
              name="type"
              value={petData.type}
              onChange={onChange}
              placeholder="e.g., Dog, Cat"
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">Breed</label>
            <input
              type="text"
              name="breed"
              value={petData.breed}
              onChange={onChange}
              placeholder="e.g., Labrador"
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-1">Age</label>
              <input
                type="number"
                name="age"
                min="0"
                value={petData.age}
                onChange={onChange}
                placeholder="e.g., 2"
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-1">Gender</label>
              <select
                name="gender"
                value={petData.gender}
                onChange={onChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
                required
              >
                <option value="">Select</option>
                <option value="Male">♂️ Male</option>
                <option value="Female">♀️ Female</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
            >
              {isEditing ? "Update Pet" : "Add Pet"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPetModal;
