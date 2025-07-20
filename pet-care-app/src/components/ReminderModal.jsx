import React, { useState } from 'react';
import { showError } from '../utils/toastUtils';

export default function ReminderModal({ isOpen, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    title: '',
    time: '',
    repeat: 'none',
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title || !formData.time) {
      showError('Please fill in all fields.');
      return;
    }

    onSubmit(formData);
    onClose();
    setFormData({ title: '', time: '', repeat: 'none' });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/40">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
        <h3 className="text-xl font-semibold mb-4">Add Reminder</h3>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            name="title"
            placeholder="Reminder Title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full border rounded p-2"
          />

          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            required
            className="w-full border rounded p-2"
          />

          <select
            name="repeat"
            value={formData.repeat}
            onChange={handleChange}
            className="w-full border rounded p-2"
          >
            <option value="none">Does not repeat</option>
            <option value="daily">Repeats daily</option>
            <option value="weekly">Repeats weekly</option>
          </select>

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
