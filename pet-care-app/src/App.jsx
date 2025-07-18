import React, { useEffect, useState } from "react";
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
import { useDispatch } from "react-redux";
import MyPets from "./pages/MyPets";
import Appointments from "./pages/Appointments";
import Medications from "./pages/Medications";
import Reminders from "./pages/Reminders";
import Settings from "./pages/Settings";
import DashboardLayout from "./components/DashboardLayout";
import PetProfile from "./pages/PetProfile";
import "./App.css";
import UserProfile from "./pages/UserProfile";

const App = () => {
  const dispatch = useDispatch();
  const [storedUser, setStoredUser] = useState(null);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setStoredUser(JSON.parse(user));
      dispatch(loginUser.fulfilled(JSON.parse(user)));
    }
  }, [dispatch]);

  return (
    <Router>
      <ToastContainer />
      <Routes>
        <Route
          path="/"
          element={storedUser ? <Navigate to="/dashboard" /> : <LandingPage />}
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
          path="/settings"
          element={
            <DashboardLayout>
              <Settings />
            </DashboardLayout>
          }
        />
          <Route
          path="/user-profile"
          element={
            <DashboardLayout>
              <UserProfile />
            </DashboardLayout>
          }
        />
        <Route
          path="/pet/:id"
          element={
            <DashboardLayout>
              <PetProfile />
            </DashboardLayout>
          }
        />
      </Routes>

    </Router>
  );
};

export default App;
