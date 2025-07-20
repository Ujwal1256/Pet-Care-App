import React, { useEffect } from "react";
import AppointmentCard from "../components/dashboard/AppointmentCard";
import MedicationsCard from "../components/dashboard/MedicationsCard";
import RemindersCard from "../components/dashboard/RemindersCard";
import PetHealthSummaryCard from "../components/dashboard/PetHealthSummaryCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchPets } from "../features/myPets/petSlice";
import { fetchAppointments } from "../features/appointment/appointmentSlice";
import { fetchReminders } from "../features/reminders/reminderSlice";

export default function Dashboard() {
  const userData = localStorage.getItem("user");
  const user = JSON.parse(userData);
  const dispatch = useDispatch();
  const { reminders } = useSelector((state) => state.reminders);
  const uid = user?.uid;
  useEffect(() => {
    dispatch(fetchPets(uid));
    dispatch(fetchAppointments(uid));
    dispatch(fetchReminders(uid));
  }, []);
  return (
    <div className="p-4 sm:p-6">
      <h2 className="text-2xl font-bold mb-6">
        Welcome back, {user?.name || "User"} 🐾
      </h2>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6">
        <AppointmentCard />
        <MedicationsCard />
        <PetHealthSummaryCard />
        <RemindersCard reminders={reminders} />
        
        <div className="hidden xl:block" />
      </div>
    </div>
  )
}
