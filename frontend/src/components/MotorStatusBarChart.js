import React from 'react';
import DashboardLayout from './DashboardLayout';
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

const data = [
  { status: 'Normal', count: 12 },
  { status: 'Low', count: 5 },
  { status: 'Moderate', count: 7 },
  { status: 'High', count: 3 },
];

export default function MotorStatusBarChart() {
  return (
    <DashboardLayout>
        <div style={{ width: '100%', height: 350 }}>
        <h3 style={{ textAlign: 'center', marginBottom: '20px' }}>Motor Status Occurrences</h3>
        <ResponsiveContainer>
            <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="status" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#8884d8" radius={[10, 10, 0, 0]} />
            </BarChart>
        </ResponsiveContainer>
        </div>
    </DashboardLayout>
  );
}
