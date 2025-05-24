import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../Styles/MotorAlertsTicker.css';

const MotorAlertsTicker = () => {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/motor-failures/getAll');
        const recent = response.data
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 5) // last 5 alerts
          .map(motor => {
            const time = new Date(motor.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            const alert =
              motor.temperature > 80 ? `exceeded temperature threshold (${motor.temperature}°C)` :
              motor.vibration > 5 ? `vibration abnormal (${motor.vibration} mm/s)` :
              `status: ${motor.category}`;
            return `[${time}] Motor #${motor.motorNumber} ${alert}`;
          });
        setAlerts(recent);
      } catch (err) {
        console.error('Error fetching alerts:', err);
      }
    };

    fetchAlerts();
    const interval = setInterval(fetchAlerts, 10000); // refresh every 10s
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="ticker-container">
      <div className="ticker-text">
        {alerts.map((alert, index) => (
          <span key={index}>{alert} • </span>
        ))}
      </div>
    </div>

  );
};

export default MotorAlertsTicker;
