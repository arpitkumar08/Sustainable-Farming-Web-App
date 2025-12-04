import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Layout from "./layout/Layout";

// Auth pages
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";

// Main pages
import Dashboard from "./pages/Dashboard";


const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected Layout Routes */}
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          {/* <Route path="/missing-persons" element={<MissingPersons />} />
          <Route path="/disasters" element={<Disasters />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/volunteers" element={<Volunteers />} />
          <Route path="/alerts" element={<Alerts />} /> */}
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
