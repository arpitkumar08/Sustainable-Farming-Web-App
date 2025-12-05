import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Layout from "./layout/Layout";

// Auth pages
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";

// Main pages
import DashboardPage from "./pages/DashboardPage";
import MyFieldPage from "./pages/MyFieldPage";
import CropPlannerPage from "./pages/CropPlannerPage";
import SoilHealthPage from "./pages/SoilHealthPage";
import WeatherAlertsPage from "./pages/WeatherAlertsPage";
import CommunityPage from "./pages/CommunityPage";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected Layout Routes */}
        <Route element={<Layout />}>
          <Route path="/" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
          <Route path="/my-field" element={<ProtectedRoute><MyFieldPage /></ProtectedRoute>} />
          <Route path="/crop-planner" element={<ProtectedRoute><CropPlannerPage /></ProtectedRoute>} />
          <Route path="/soil-health" element={<ProtectedRoute><SoilHealthPage /></ProtectedRoute>} />
          <Route path="/weather-alerts" element={<ProtectedRoute><WeatherAlertsPage /></ProtectedRoute>} />
          <Route path="/community" element={<ProtectedRoute><CommunityPage /></ProtectedRoute>} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
