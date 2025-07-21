import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const MedicationsCard = () => {
  const { medications = [] } = useSelector((state) => state.medication || {});

  // Show only top 3 medications
  const topMedications = medications.slice(0, 3);

  return (
    <div className="bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 p-5 rounded-2xl shadow-md w-full max-w-md mx-auto sm:p-6 md:p-8">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Medications</h3>
        {medications.length > 3 && (
          <Link to="/medications" className="text-sm text-blue-600 hover:underline">
            View More &gt;&gt;
          </Link>
        )}
      </div>

      {topMedications.length > 0 ? (
        <ul className="space-y-3">
          {topMedications.map((med, index) => (
            <li key={index} className="text-sm text-gray-700 flex items-center">
              <span className="text-xl">💊</span>
              <span className="ml-2 font-medium text-gray-900">{med.petName}</span> — 
              <span className="ml-1 text-gray-800">{med.medication}</span> — 
              <span className="ml-1 text-gray-600">{med.frequency}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-gray-500">No current medications</p>
      )}
    </div>
  );
};

export default MedicationsCard;
