import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import {useDispatch, useSelector} from 'react-redux'
import { fetchPets } from '../features/myPets/petSlice';
import { fetchAppointments } from '../features/appointment/appointmentSlice';
import { fetchReminders } from '../features/reminders/reminderSlice';
import { fetchMedications } from '../features/medication/medicationSlice';
import { fetchWeights } from '../features/weight/weightSlice';

const DashboardLayout = ({ children }) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const dispatch = useDispatch()
  const userData = localStorage.getItem("user");
  const user = JSON.parse(userData);
  const uid = user?.uid;
  
   useEffect(() => {
     dispatch(fetchPets(uid));
     dispatch(fetchAppointments(uid));
     dispatch(fetchReminders(uid));
     dispatch(fetchMedications(uid))
     dispatch(fetchWeights(uid));
   }, [dispatch]);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar isMobileOpen={isMobileOpen} onClose={() => setIsMobileOpen(false)} />

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Navbar */}
        <Navbar onMenuClick={() => setIsMobileOpen((prev) => !prev)} />

        {/* Main content scrollable */}
        <main className="flex-1 overflow-y-auto pt-16 px-4 pb-4 bg-gray-100">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
