import React, { useEffect, useState } from "react";
import ReminderModal from "../components/ReminderModal";
import {
  addReminder,
  fetchReminders,
  updateReminder,
  deleteReminder,
} from "../features/reminders/reminderSlice";
import { useDispatch, useSelector } from "react-redux";
import { showError, showSuccess } from "../utils/toastUtils";

export default function Reminders() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingReminder, setEditingReminder] = useState(null);
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { reminders, loading } = useSelector((state) => state.reminders);
  const uid = user?.uid;

  useEffect(() => {
    if (uid) dispatch(fetchReminders(uid));
  }, [uid, dispatch]);

  const handleSubmission = async (data) => {
    try {
      if (editingReminder) {
        await dispatch(updateReminder({ uid, updatedReminder: { ...data, reminderId: editingReminder.reminderId } }));
        showSuccess("Reminder updated ✅");
      } else {
        await dispatch(addReminder({ uid, reminderData: data }));
        showSuccess("Reminder added ✅");
      }
    } catch (err) {
      showError("Failed to save reminder");
    } finally {
      setEditingReminder(null);
      setIsModalOpen(false);
    }
  };

  const handleDelete = async (reminderId) => {
    try {
      await dispatch(deleteReminder({ uid, reminderId }));
      showSuccess("Reminder deleted ❌");
    } catch (err) {
      showError("Failed to delete reminder");
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Reminders</h1>
        <button
          onClick={() => {
            setEditingReminder(null);
            setIsModalOpen(true);
          }}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          + Add Reminder
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : reminders.length === 0 ? (
        <p className="text-gray-500">No reminders yet.</p>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {reminders.map((reminder) => (
            <div
              key={reminder.reminderId}
              className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm hover:shadow-md transition"
            >
              <h2 className="text-base font-semibold text-gray-800 mb-1">
                {reminder.title}
              </h2>
              <p className="text-sm text-gray-600 truncate">{reminder.description}</p>
              <p className="text-xs text-blue-600 mt-2">⏰ {reminder.time}</p>

              <div className="flex justify-end gap-2 mt-3">
                <button
                  className="text-xs px-2 py-1 bg-yellow-400 rounded hover:bg-yellow-500"
                  onClick={() => {
                    setEditingReminder(reminder);
                    setIsModalOpen(true);
                  }}
                >
                  Edit
                </button>
                <button
                  className="text-xs px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  onClick={() => handleDelete(reminder.reminderId)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <ReminderModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingReminder(null);
        }}
        onSubmit={handleSubmission}
        initialData={editingReminder}
      />
    </div>
  );
}
