import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Auth pages
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";

// Layout
import Layout from "./layout/Layout";

// Protected
import ProtectedRoute from "./components/ProtectedRoute";

// Pages inside layout
import DashboardPage from "./pages/DashboardPage";
import MyFieldPage from "./pages/MyFieldPage";
import CropPlannerPage from "./pages/CropPlannerPage";
import SoilHealthPage from "./pages/SoilHealthPage";
import WeatherAlertsPage from "./pages/WeatherAlertsPage";
import CommunityPage from "./pages/CommunityPage";

// Public Home Page
import Home from "./pages/Home";

const App = () => {
  return (
    <Router>
      <Routes>

        {/* ---------- PUBLIC ROUTES ---------- */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* ---------- PROTECTED ROUTES ---------- */}
        <Route
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/my-field" element={<MyFieldPage />} />
          <Route path="/crop-planner" element={<CropPlannerPage />} />
          <Route path="/soil-health" element={<SoilHealthPage />} />
          <Route path="/weather-alerts" element={<WeatherAlertsPage />} />
          <Route path="/community" element={<CommunityPage />} />
        </Route>

      </Routes>
    </Router>
  );
};

export default App;
