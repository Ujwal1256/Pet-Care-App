import React from 'react';
import AppointmentCard from '../components/dashboard/AppointmentCard';
import MedicationsCard from '../components/dashboard/MedicationsCard';
import RemindersCard from '../components/dashboard/RemindersCard';
import PetHealthSummaryCard from '../components/dashboard/PetHealthSummaryCard';
import QuickActions from '../components/dashboard/QuickActions';
import {useSelector} from 'react-redux';

export default function Dashboard() {
  const user = useSelector((state) => state.auth.user);

  return (
    <div className="p-4 sm:p-6">
      <h2 className="text-2xl font-bold mb-6">Welcome back, {user?.email || "User"} 🐾</h2>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6">
        <AppointmentCard />
        <MedicationsCard />
        <RemindersCard />
        <PetHealthSummaryCard />
        <div className="hidden xl:block" /> 
      </div>

      {/* Quick Actions Section */}
      <div className="mt-4">
        <QuickActions />
      </div>
    </div>
  );
}
