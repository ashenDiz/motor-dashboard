import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MotorDashboard from './components/MotorDashboard';
import MotorTable from './components/MotorTable';
import MotorStatusBarChart from './components/MotorStatusBarChart';
import MotorDetails from './components/MotorDetails';

// frontend\src\App.js

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/motor-graph" replace />} />
        <Route path="/motor-input" element={<MotorDashboard />} />
        <Route path="/motor-table" element={<MotorTable />} />
        <Route path="/motor-graph" element={<MotorStatusBarChart />} />
        <Route path="/motor-details/:id" element={<MotorDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
