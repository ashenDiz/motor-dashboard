import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import '../Styles/MotorTable.css';
import DashboardLayout from './DashboardLayout';
import { useNavigate } from 'react-router-dom';

// Map status text to CSS classes for color labels
const getStatusClass = (status) => {
  switch (status?.toLowerCase()) {
    case 'normal': return 'status normal';
    case 'low': return 'status low';
    case 'moderate': return 'status moderate';
    case 'high': return 'status high';
    default: return 'status';
  }
};

export default function MotorTable() {
  const [motorData, setMotorData] = useState([]);
  const [filterText, setFilterText] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMotorData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/motor-failures/getAll');
        console.log('API data:', response.data);
        setMotorData(response.data);
      } catch (error) {
        console.error('Error fetching motor data:', error);
      }
    };

    fetchMotorData();
  }, []);

  const filteredData = motorData.filter((motor) =>
    Object.values(motor).some(val =>
      String(val).toLowerCase().includes(filterText.toLowerCase())
    )
  );

  const columns = [
    { name: 'Motor Number', selector: row => row.motorNumber, sortable: true },
    { name: 'Voltage (V)', selector: row => row.voltage, sortable: true },
    { name: 'Current (A)', selector: row => row.current, sortable: true },
    { name: 'Temperature (°C)', selector: row => row.temperature, sortable: true },
    { name: 'Vibration (mm/s)', selector: row => row.vibration, sortable: true },
    {
      name: 'Status',
      cell: row => (
        <span className={getStatusClass(row.category)}>
          {row.category}
        </span>
      ),
      sortable: true
    },
    {
      name: 'Date',
      selector: row => new Date(row.createdAt).toLocaleString(),
      sortable: true
    }
  ];

  const handleRowClick = (row) => {
    // You can use either row._id or row.motorNumber depending on backend
    navigate(`/motor-details/${row._id}`);
  };

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
          onRowClicked={handleRowClick}
          pointerOnHover
        />
      </div>
    </DashboardLayout>
  );
}
