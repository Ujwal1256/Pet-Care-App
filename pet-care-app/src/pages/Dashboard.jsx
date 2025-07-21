import React, { useEffect } from "react";
import AppointmentCard from "../components/dashboard/AppointmentCard";
import MedicationsCard from "../components/dashboard/MedicationsCard";
import RemindersCard from "../components/dashboard/RemindersCard";

export default function Dashboard() {
  const userData = localStorage.getItem("user");
  const user = JSON.parse(userData);

  return (
    <div className="p-4 sm:p-6">
      <h2 className="text-2xl font-bold mb-6">
        Welcome back, {user?.name || "User"} 🐾
      </h2>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-1  lg:grid-cols-2  xl:grid-cols-2 gap-6">
        <AppointmentCard />
        <MedicationsCard />
        <RemindersCard  />
        <div className="hidden xl:block" />
      </div>
    </div>
  )
}
