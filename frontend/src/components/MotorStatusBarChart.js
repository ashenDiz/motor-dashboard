import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DashboardLayout from './DashboardLayout';
import MotorAlertsTicker from './MotorAlertsTicker';
import MotorTimeSeriesChart from './MotorTimeSeriesChart';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

// Reusable summary card
const StatCard = ({ title, value, icon, color }) => (
  <div style={{
    backgroundColor: color,
    color: '#fff',
    padding: '20px',
    borderRadius: '12px',
    textAlign: 'center',
    flex: 1,
    margin: '10px'
  }}>
    <div style={{ fontSize: '24px' }}>{icon}</div>
    <h4 style={{ margin: '10px 0' }}>{title}</h4>
    <div style={{ fontSize: '20px', fontWeight: 'bold' }}>{value}</div>
  </div>
);

export default function MotorStatusBarChart() {
  const [statusCounts, setStatusCounts] = useState([]);
  const [summary, setSummary] = useState({
    total: 0,
    high: 0,
    moderate: 0,
    low: 0,
    normal: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/motor-failures/getAll');
        const motorData = response.data;

        // Count occurrences
        const counts = motorData.reduce((acc, curr) => {
          const status = curr.category;
          acc[status] = (acc[status] || 0) + 1;
          return acc;
        }, {});

        // Prepare data for chart
        const chartData = Object.keys(counts).map(status => ({
          status,
          count: counts[status]
        }));

        setStatusCounts(chartData);

        // Set summary counts
        setSummary({
          total: motorData.length,
          high: counts['high'] || 0,
          moderate: counts['moderate'] || 0,
          low: counts['low'] || 0,
          normal: counts['normal'] || 0,
        });
      } catch (error) {
        console.error('Error fetching motor data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <DashboardLayout>
      {/* Alerts ticker floating on top, layout below adjusted */}
      <div style={{ position: 'relative' }}>
        <MotorAlertsTicker />
        <br/>
        <br/>
        <div style={{ paddingTop: '40px' }}>
          {/* Summary Cards */}
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: '20px' }}>
            <StatCard title="Total Motors" value={summary.total} icon="🔧" color="#3f51b5" />
            <StatCard title="High Risk" value={summary.high} icon="🚨" color="#e53935" />
            <StatCard title="Moderate Risk" value={summary.moderate} icon="🛠️" color="#fb8c00" />
            <StatCard title="Low Risk" value={summary.low} icon="⚠️" color="#fbc02d" />
            <StatCard title="Normal" value={summary.normal} icon="✅" color="#43a047" />
          </div>
          <br/>
          <br/>
          {/* Bar Chart */}
          <div>
            <h3 style={{ textAlign: 'center', marginBottom: '20px' }}>Motor Status Occurrences</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={statusCounts} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="status" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#8884d8" radius={[10, 10, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>

          </div>
          {/* Time Series Chart */}
          <div style={{
            backgroundColor: '#fff',
            marginTop: '30px',
            padding: '20px',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{ textAlign: 'center', marginBottom: '20px' }}>
              Motor Parameter Trends Over Time
            </h3>
            <MotorTimeSeriesChart />
          </div>

        </div>
      </div>
    </DashboardLayout>
  );
}
