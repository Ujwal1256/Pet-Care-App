import React, { useEffect, useState } from "react";
import ReminderModal from "../components/ReminderModal";
import {
  addReminder,
  fetchReminders,
} from "../features/reminders/reminderSlice";
import { useDispatch, useSelector } from "react-redux";
import { showError, showSuccess } from "../utils/toastUtils";

export default function Reminders() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { reminders, loading } = useSelector((state) => state.reminders);
  const uid = user?.uid;

  // Fetch reminders on component mount
  useEffect(() => {
    if (uid) {
      dispatch(fetchReminders(uid));
    }
  }, [uid, dispatch]);

  const handleSubmission = (formdata) => {
    try {
      dispatch(addReminder({ reminderData: formdata, uid }));
      showSuccess("Reminder Added ✅");
      setIsModalOpen(false);
    } catch (error) {
      showError(error.message);
      console.log(error);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Reminders</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          + Add Reminder
        </button>
      </div>
      <p className="text-gray-600 mb-6">Manage your reminders here.</p>

      {/* List of Reminders */}
      {loading ? (
        <p>Loading...</p>
      ) : reminders.length === 0 ? (
        <p className="text-gray-500">No reminders yet.</p>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {reminders.map((reminder) => (
            <div
              key={reminder.id}
              className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm hover:shadow-md transition"
            >
              <h2 className="text-base font-semibold text-gray-800 mb-1">
                {reminder.title}
              </h2>
              <p className="text-sm text-gray-600 truncate">
                {reminder.description}
              </p>
              <p className="text-xs text-blue-600 mt-2">⏰ {reminder.time}</p>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      <ReminderModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmission}
      />
    </div>
  );
}
