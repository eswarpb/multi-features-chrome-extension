import { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import './Productivitytab.css';

const ProductivityTracker = () => {
  const [timeData, setTimeData] = useState([]);
  const [dailyLimit, setDailyLimit] = useState(180); // Default daily limit in minutes
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    if (typeof chrome !== "undefined" && chrome.storage) {
      chrome.storage.local.get(["timeSpent", "dailyLimit"], (data) => {
        const storedData = data.timeSpent ? Object.entries(data.timeSpent).map(([site, time]) => ({ site, time })) : [];
        setTimeData(storedData);
        setDailyLimit(data.dailyLimit ?? 180);
        
        // Check if limit is exceeded
        const totalTime = storedData.reduce((acc, curr) => acc + curr.time, 0);
        if (totalTime >= dailyLimit) {
          setAlertMessage(`⚠️ Warning: You've reached your daily limit of ${dailyLimit} minutes!`);
        }
      });
    } else {
      // Mock Data for Localhost Testing
      setTimeData([
        { site: "google.com", time: 120 },
        { site: "facebook.com", time: 90 },
        { site: "youtube.com", time: 150 },
        { site: "github.com", time: 200 },
      ]);
    }
  }, [dailyLimit]);

  const resetTracking = () => {
    setTimeData([]);
    setAlertMessage("");
    if (typeof chrome !== "undefined" && chrome.storage) {
      chrome.storage.local.set({ timeSpent: {} });
    }
  };

  const updateDailyLimit = (e) => {
    const newLimit = parseInt(e.target.value, 10);
    setDailyLimit(newLimit);
    if (typeof chrome !== "undefined" && chrome.storage) {
      chrome.storage.local.set({ dailyLimit: newLimit });
    }
  };

  return (
    <div className="productivity-tracker-container">
      <h2 className="productivity-header">📊 Productivity Tracker</h2>

      {alertMessage && <p className="alert-message">{alertMessage}</p>}

      {/* Daily Limit Input */}
      <div className="daily-limit-container">
        <label>Set Daily Limit (minutes):</label>
        <input type="number" value={dailyLimit} onChange={updateDailyLimit} />
      </div>

      {/* Bar Chart */}
      {timeData.length > 0 ? (
        <div className="chart-container">
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={timeData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.2)" />
              <XAxis dataKey="site" stroke="#ffffff" />
              <YAxis stroke="#ffffff" />
              <Tooltip />
              <Bar dataKey="time" fill="#ffcc00" radius={[5, 5, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <p className="no-data-message">No data available</p>
      )}

      {/* Table Format */}
      <div className="table-container">
        <h3>🕒 Time Spent Per Site</h3>
        {timeData.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Website</th>
                <th>Time (mins)</th>
              </tr>
            </thead>
            <tbody>
              {timeData.map((entry, index) => (
                <tr key={index}>
                  <td>{entry.site}</td>
                  <td>{entry.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="no-data-message">No time data recorded yet.</p>
        )}
      </div>

      {/* Reset Button */}
      <button className="reset-button" onClick={resetTracking}>
        Reset Tracking
      </button>
    </div>
  );
};

export default ProductivityTracker;
