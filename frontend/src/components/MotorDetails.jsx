import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import DashboardLayout from './DashboardLayout';
import '../Styles/MotorDetails.css'; // Create this CSS file for custom styling

const MotorDetails = () => {
  const { id } = useParams();
  const [motor, setMotor] = useState(null);

  useEffect(() => {
    const fetchMotor = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/motor-failures/${id}`);
        setMotor(res.data);
      } catch (err) {
        console.error('Failed to fetch motor details:', err);
      }
    };

    fetchMotor();
  }, [id]);

  const renderIssueExplanation = (motor) => {
    if (!motor) return '';

    const issues = [];

    const { voltage, current, temperature, vibration } = motor;

    if (voltage < 380 || voltage > 420) issues.push(`⚡ Voltage (${voltage} V) out of normal range`);
    if (current < 10 || current > 20) issues.push(`🔌 Current (${current} A) out of normal range`);
    if (temperature < 30 || temperature > 60) issues.push(`🌡️ Temperature (${temperature}°C) out of normal range`);
    if (vibration < 0 || vibration > 5) issues.push(`📈 Vibration (${vibration} mm/s) out of normal range`);

    return issues.length > 0 ? (
      <ul>
        {issues.map((issue, idx) => (
          <li key={idx}>{issue}</li>
        ))}
      </ul>
    ) : (
      <p>✅ All parameters are within the normal range.</p>
    );
  };

  const renderSolutions = (category) => {
    switch (category?.toLowerCase()) {
      case 'low':
        return (
          <ul>
            <li>🔧 Check calibration of sensors.</li>
            <li>🛠️ Perform light maintenance.</li>
          </ul>
        );
      case 'moderate':
        return (
          <ul>
            <li>🧰 Schedule detailed inspection.</li>
            <li>🧼 Clean air filters and ensure lubrication.</li>
            <li>📉 Monitor the motor closely for worsening signs.</li>
          </ul>
        );
      case 'high':
        return (
          <ul>
            <li>🚨 Stop the motor immediately.</li>
            <li>👨‍🔧 Perform full diagnostics and repair or replace damaged parts.</li>
            <li>🔁 Re-test before restarting operation.</li>
          </ul>
        );
      default:
        return <p>✅ No immediate action required.</p>;
    }
  };

  if (!motor) return <DashboardLayout><p>Loading motor details...</p></DashboardLayout>;

  return (
    <DashboardLayout>
      <div className="motor-details-container">
        <h2>Motor #{motor.motorNumber} Details</h2>
        <p><strong>Status:</strong> <span className={`status ${motor.category.toLowerCase()}`}>{motor.category}</span></p>
        <p><strong>Date:</strong> {new Date(motor.createdAt).toLocaleString()}</p>

        <h3>📊 Readings</h3>
        <ul>
          <li>Voltage: {motor.voltage} V</li>
          <li>Current: {motor.current} A</li>
          <li>Temperature: {motor.temperature} °C</li>
          <li>Vibration: {motor.vibration} mm/s</li>
        </ul>

        <h3>⚠️ Summary of Issues</h3>
        {renderIssueExplanation(motor)}

        <h3>✅ Recommended Solutions (Based on Risk Category)</h3>
        {renderSolutions(motor.category)}
      </div>
    </DashboardLayout>
  );
};

export default MotorDetails;
