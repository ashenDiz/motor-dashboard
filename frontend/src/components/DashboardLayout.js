import { Link } from 'react-router-dom';
import '../Styles/DashboardLayout.css'; // Custom CSS for sidebar

// frontend/src/components/DashboardLayout.js

const DashboardLayout = ({ children }) => {
  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <Link to="/motor-graph" style={{ textDecoration: 'none', color: 'inherit' }}>
          <h3>Dashboard</h3>
        </Link>
        <ul>
          <li><Link to="/motor-graph">Motor Dashboard</Link></li>
          <li><Link to="/motor-input">Motor Data Input</Link></li>
          <li><Link to="/motor-table">Motor Table</Link></li>
          
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
