import React, { useState } from "react";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";

const AuthForm = ({
  title,
  onSubmit,
  loading,
  error,
  isLogin = false,
  switchLabel,
  onSwitch,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [formError, setFormError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError("");

    if (!email || !password || (!isLogin && !name)) {
      setFormError("All fields are required.");
      return;
    }

    if (!email.includes("@")) {
      setFormError("Invalid email.");
      return;
    }

    const formData = { email, password };
    if (!isLogin) formData.name = name;

    onSubmit(formData);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 bg-cover bg-center relative"
      style={{
        backgroundImage:
          "url('https://plus.unsplash.com/premium_photo-1663127274687-100d876bea08?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
      }}
    >
      <div className="absolute inset-0 bg-black opacity-40 z-0" />

      <div className="relative z-10 bg-white bg-opacity-90 shadow-2xl rounded-2xl p-8 w-full max-w-md border border-blue-100">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-extrabold text-blue-700">{title}</h1>
          <p className="text-sm text-gray-600 mt-1">
            Welcome to PetCare Portal 🐾
          </p>
        </div>

        {(formError || error) && (
          <div className="text-red-500 text-sm mb-4 text-center">
            {formError || error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div className="relative">
              <FaUser className="absolute top-3 left-3 text-gray-400" />
              <input
                type="text"
                placeholder="Name"
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={name}
                required
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          )}

          <div className="relative">
            <FaEnvelope className="absolute top-3 left-3 text-gray-400" />
            <input
              type="email"
              placeholder="Email"
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="relative">
            <FaLock className="absolute top-3 left-3 text-gray-400" />
            <input
              type="password"
              placeholder="Password"
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition duration-200 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Please wait..." : title}
          </button>
        </form>

        <div className="text-sm mt-6 text-center text-gray-700">
          {switchLabel}{" "}
          <button
            onClick={onSwitch}
            className="text-blue-600 underline hover:text-blue-800 transition"
          >
            {isLogin ? "Sign up" : "Log in"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
