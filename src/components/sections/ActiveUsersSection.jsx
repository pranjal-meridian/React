import React, { useState, useEffect } from "react";
import BarChart from "../charts/BarChart";

function ActiveUsersSection() {
  const [activeUsers, setActiveUsers] = useState(0);
  const [percentageChange, setPercentageChange] = useState(0);
  const [changeArrow, setChangeArrow] = useState("up");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("api/active-users");
        const data = await response.json();
        
        setActiveUsers(data.total_active_users);
        setPercentageChange(data.percentage_change);
        setChangeArrow(data.change_arrow);
      } catch (error) {
        console.error("Error fetching active users data:", error);
      }
    };

    fetchData(); // Fetch immediately
    const interval = setInterval(fetchData, 30000); // Fetch every 30 sec

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-lg font-medium text-gray-800 mb-2">Active Users</h2>
      <div className="mb-4">
        <span className="text-3xl font-bold">{activeUsers}</span>
        <div className="flex items-center mt-2">
          <span className={`text-sm ${percentageChange >= 0 ? "text-green-500" : "text-red-500"}`}>
            {changeArrow==="up"?"↑":"↓"} {Math.abs(percentageChange)}%
          </span>
          <span className="text-gray-500 text-sm ml-2">vs last week</span>
        </div>
      </div>
      <BarChart />
    </div>
  );
}

export default ActiveUsersSection;
