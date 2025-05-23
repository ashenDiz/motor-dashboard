import { Link } from 'react-router-dom';
import '../Styles/DashboardLayout.css'; // Custom CSS for sidebar

// frontend\src\components\DashboardLayout.js

const DashboardLayout = ({ children }) => {
  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <h3>Dashboard</h3>
        <ul>
            <li><Link to="/motor-dashboard">Motor Data</Link></li>
            <li><Link to="/motor-table">Motor Table</Link></li>
            <li><Link to="/motor-graph">Motor Graphs</Link></li>
            {/* Future links */}
            {/* <li><Link to="/predictions">Predictions</Link></li> */}
            {/* <li><Link to="/history">History</Link></li> */}
            </ul>
      </aside>
      <main className="main-content">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
