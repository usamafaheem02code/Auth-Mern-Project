// src/App.jsx
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Home from "./Pages/Home";
import ProtectedRoute from "./components/ProtectedRoute";
// import ProtectedRoute from "./components/ProtectedRoute.js";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* ✅ Protected Home route */}
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
