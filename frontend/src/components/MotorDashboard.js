import React, { useState } from 'react';
import axios from 'axios';
import '../Styles/MotorDashboard.css';
import DashboardLayout from './DashboardLayout';

// frontend\src\components\MotorDashboard.js

const MotorDashboard = () => {
  const [formData, setFormData] = useState({
    motorNumber:'',
    voltage: '',
    current: '',
    temperature: '',
    vibration: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/motor-failures/create', formData);
      alert('Motor data submitted successfully!');
      setFormData({ motorNumber:'',voltage: '', current: '', temperature: '', vibration: '' });
    } catch (error) {
      alert('Error submitting data');
      console.error(error);
    }
  };

  return (
    <DashboardLayout>
      <div className='motor-dashboard'>
        <h2>Motor Data Input</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="motorNumber"
            placeholder="Motor Number"
            value={formData.motorNumber}
            onChange={handleChange}
            required
          />
          <br />
          <input
            type="number"
            name="voltage"
            placeholder="Voltage (V)"
            value={formData.voltage}
            onChange={handleChange}
            required
          />
          <br />
          <input
            type="number"
            name="current"
            placeholder="Current (A)"
            value={formData.current}
            onChange={handleChange}
            required
          />
          <br />
          <input
            type="number"
            name="temperature"
            placeholder="Temperature (°C)"
            value={formData.temperature}
            onChange={handleChange}
            required
          />
          <br />
          <input
            type="number"
            name="vibration"
            placeholder="Vibration (mm/s)"
            value={formData.vibration}
            onChange={handleChange}
            required
          />
          <br />
          <button type="submit">Submit</button>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default MotorDashboard;
