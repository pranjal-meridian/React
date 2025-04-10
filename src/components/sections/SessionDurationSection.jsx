import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SessionDurationChart from '../charts/SessionDurationChart';

function SessionDurationSection() {
  const [sessionData, setSessionData] = useState({
    overall_avg_session_duration: 0,
    percentage_change: 0,
    trend: "neutral",
  });

  useEffect(() => {
    axios.get('api/average-session-duration')
      .then(response => {
        if (response.data.success) {
          setSessionData({
            overall_avg_session_duration: response.data.overall_avg_session_duration.toFixed(2),
            percentage_change: response.data.percentage_change.toFixed(1),
            trend: response.data.trend
          });
        }
      })
      .catch(error => {
        console.error("Error fetching session duration data:", error);
      });
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-lg font-medium text-gray-800 mb-2">Average Session Duration</h2>
      <div className="mb-4">
        <span className="text-3xl font-bold">{sessionData.overall_avg_session_duration}sec</span>
        <div className="flex items-center mt-2">
          <span className={`text-sm ${sessionData.trend === "up" ? "text-green-500" : "text-red-500"}`}>
            {sessionData.trend === "up" ? "↑" : "↓"} {sessionData.percentage_change}%
          </span>
          <span className="text-gray-500 text-sm ml-2">vs last week</span>
        </div>
      </div>
      <SessionDurationChart />
    </div>
  );
}

export default SessionDurationSection;
