import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MotorDashboard from './components/MotorDashboard';
import MotorTable from './components/MotorTable';
import MotorStatusBarChart from './components/MotorStatusBarChart';

// frontend\src\App.js

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/motor-dashboard" replace />} />
        <Route path="/motor-dashboard" element={<MotorDashboard />} />
        <Route path="/motor-table" element={<MotorTable />} />
        <Route path="/motor-graph" element={<MotorStatusBarChart />} />
      </Routes>
    </Router>
  );
}

export default App;
