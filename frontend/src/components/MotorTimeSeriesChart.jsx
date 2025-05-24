import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';

const MotorTimeSeriesChart = () => {
  const [motorData, setMotorData] = useState([]);
  const [selectedMotor, setSelectedMotor] = useState('');
  const [selectedParameter, setSelectedParameter] = useState('temperature');
  const [filteredData, setFilteredData] = useState([]);

  const parameters = ['temperature', 'vibration', 'voltage', 'current'];

  // Fetch motor data on mount
  useEffect(() => {
    const fetchMotorData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/motor-failures/getAll');
        setMotorData(response.data);
      } catch (error) {
        console.error('Error fetching motor data:', error);
      }
    };

    fetchMotorData();
  }, []);

  // Filter and format data
  useEffect(() => {
    if (!selectedMotor) {
      setFilteredData([]);
      return;
    }

    const data = motorData
      .filter(entry => entry.motorNumber === selectedMotor)
      .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
      .map(entry => ({
        time: new Date(entry.createdAt).toLocaleString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          day: '2-digit',
          month: 'short',
        }),
        temperature: entry.temperature,
        vibration: entry.vibration,
        voltage: entry.voltage,
        current: entry.current,
      }));

    console.log('Filtered Data:', data); // For debugging

    setFilteredData(data);
  }, [selectedMotor, selectedParameter, motorData]);

  // Unique motor numbers
  const motorOptions = [...new Set(motorData.map(m => m.motorNumber))];

  return (
    <div style={{ marginTop: '30px' }}>
      <h3 style={{ textAlign: 'center' }}>
        📈 Motor {selectedMotor || '—'} - {selectedParameter.charAt(0).toUpperCase() + selectedParameter.slice(1)} Trend
      </h3>

      {/* Dropdowns */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '20px' }}>
        <select value={selectedMotor} onChange={e => setSelectedMotor(e.target.value)}>
          <option value="">Select Motor</option>
          {motorOptions.map((motor, idx) => (
            <option key={idx} value={motor}>Motor #{motor}</option>
          ))}
        </select>

        <select value={selectedParameter} onChange={e => setSelectedParameter(e.target.value)}>
          {parameters.map((param, idx) => (
            <option key={idx} value={param}>
              {param.charAt(0).toUpperCase() + param.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Chart */}
      <div style={{ width: '100%', height: 350 }}>
        {filteredData.length === 0 ? (
          <p style={{ textAlign: 'center', color: 'red' }}>No data found for the selected motor.</p>
        ) : (
          <ResponsiveContainer>
            <LineChart data={filteredData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey={selectedParameter}
                stroke="#8884d8"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default MotorTimeSeriesChart;
