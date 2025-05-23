import React, { useState } from 'react';
import DataTable from 'react-data-table-component';
import '../Styles/MotorTable.css';
import DashboardLayout from './DashboardLayout';

const motorData = [
  { id: '001', voltage: 220, current: 5.2, temperature: 45, vibration: 1.2, status: 'Normal' },
  { id: '002', voltage: 180, current: 4.5, temperature: 55, vibration: 2.5, status: 'Moderate' },
  { id: '003', voltage: 100, current: 2.0, temperature: 75, vibration: 3.8, status: 'High' },
  { id: '004', voltage: 160, current: 3.1, temperature: 30, vibration: 0.9, status: 'Low' },
];

const getStatusClass = (status) => {
  switch (status) {
    case 'Normal': return 'status normal';
    case 'Low': return 'status low';
    case 'Moderate': return 'status moderate';
    case 'High': return 'status high';
    default: return 'status';
  }
};

const columns = [
  { name: 'Motor ID', selector: row => row.id, sortable: true },
  { name: 'Voltage (V)', selector: row => row.voltage, sortable: true },
  { name: 'Current (A)', selector: row => row.current, sortable: true },
  { name: 'Temperature (°C)', selector: row => row.temperature, sortable: true },
  { name: 'Vibration (mm/s)', selector: row => row.vibration, sortable: true },
  {
    name: 'Status',
    cell: row => <span className={getStatusClass(row.status)}>{row.status}</span>,
    sortable: true
  },
];

export default function MotorTable() {
  const [filterText, setFilterText] = useState('');

  const filteredData = motorData.filter((motor) =>
    Object.values(motor).some(val =>
      String(val).toLowerCase().includes(filterText.toLowerCase())
    )
  );

  return (
    <DashboardLayout>
      <div className="table-container">
        <h2>Motor Status Table</h2>

        <input
          type="text"
          placeholder="Search..."
          className="search-input"
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
        />

        <DataTable
          columns={columns}
          data={filteredData}
          pagination
          highlightOnHover
          striped
          responsive
        />
      </div>
    </DashboardLayout>
  );
}
