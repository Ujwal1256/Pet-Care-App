import React, { useEffect, useState, useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LandingPage from "./pages/LandingPage";
import { loginUser } from "./features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import MyPets from "./pages/MyPets";
import Appointments from "./pages/Appointments";
import Medications from "./pages/Medications";
import Reminders from "./pages/Reminders";
import DashboardLayout from "./components/DashboardLayout";
import "./App.css";
import WeightScreen from "./pages/WeightScreen";
import { fetchPets } from "./features/myPets/petSlice";
import { fetchAppointments } from "./features/appointment/appointmentSlice";
import { fetchReminders } from "./features/reminders/reminderSlice";
import { fetchMedications } from "./features/medication/medicationSlice";
import { fetchWeights } from "./features/weight/weightSlice";

const App = () => {
  const dispatch = useDispatch();
  const storedUser = useSelector((state) => state.auth.user);
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user && !storedUser) {
      const parsedUser = JSON.parse(user);

      dispatch({ type: "auth/loginUser/fulfilled", payload: parsedUser });

      const uid = parsedUser.uid;
      dispatch(fetchPets(uid));
      dispatch(fetchAppointments(uid));
      dispatch(fetchReminders(uid));
      dispatch(fetchMedications(uid));
      dispatch(fetchWeights(uid));
    }
  }, [dispatch, storedUser]);

  return (
    <Router>
      <ToastContainer />
      <Routes>
        <Route
          path="/"
          element={storedUser ? <Dashboard /> : <LandingPage />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/dashboard"
          element={
            <DashboardLayout>
              <Dashboard />
            </DashboardLayout>
          }
        />
        <Route
          path="/mypets"
          element={
            <DashboardLayout>
              <MyPets />
            </DashboardLayout>
          }
        />
        <Route
          path="/appointments"
          element={
            <DashboardLayout>
              <Appointments />
            </DashboardLayout>
          }
        />
        <Route
          path="/medications"
          element={
            <DashboardLayout>
              <Medications />
            </DashboardLayout>
          }
        />
        <Route
          path="/reminders"
          element={
            <DashboardLayout>
              <Reminders />
            </DashboardLayout>
          }
        />
        <Route
          path="/weight"
          element={
            <DashboardLayout>
              <WeightScreen />
            </DashboardLayout>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
