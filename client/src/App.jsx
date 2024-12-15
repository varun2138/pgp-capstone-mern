import { React, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Home from "./pages/Home";

import MainPage from "./pages/MainPage";
import CreateJob from "./pages/CreateJob";
import ProtectedRoute from "./utils/ProtectedRoute";
import EditJob from "./pages/EditJob";

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token && location.pathname !== "/") {
      navigate("/");
    } else if (token && location.pathname === "/") {
      navigate("/home");
    }
  }, [navigate, location]);
  return (
    <div>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/home" element={<Home />} />
        <Route
          path="/create"
          element={
            <ProtectedRoute>
              <CreateJob isEditing={false} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit/:id"
          element={
            <ProtectedRoute>
              <EditJob isEditing={true} />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
