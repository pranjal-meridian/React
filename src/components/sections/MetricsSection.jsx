import React, { useEffect, useState } from 'react';
import axios from 'axios';

function MetricsSection() {
  const [userStats, setUserStats] = useState({
    total_users: 0,
    total_users_change: '0%',
    total_users_trend: 'neutral',
    new_users_this_week: 0,
    new_users_change: '0%',
    new_users_trend: 'neutral',
  });

  const [activeStats, setActiveStats] = useState({
    total_active_users: 0,
    percentage_change: '0%',
    change_arrow: 'neutral',
  });

  const [sessionStats, setSessionStats] = useState({
    overall_avg_session_duration: '0min',
    percentage_change: 0,
    trend: 'neutral',
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [userRes, activeRes, sessionRes] = await Promise.all([
          axios.get('api/user-stats'),
          axios.get('api/active-users'),
          axios.get('api/average-session-duration'),
        ]);

        setUserStats(userRes.data);
        setActiveStats(activeRes.data);

        const sessionData = sessionRes.data;
        setSessionStats({
          overall_avg_session_duration: sessionData.overall_avg_session_duration,
          percentage_change: sessionData.percentage_change,
          trend: sessionData.trend,
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchStats();
    const interval = setInterval(fetchStats, 10000);
    return () => clearInterval(interval);
  }, []);

  const getColor = (trend) => {
    if (trend === 'up') return 'text-green-500';
    if (trend === 'down') return 'text-red-500';
    return 'text-gray-500';
  };

  const getArrow = (trend) => {
    if (trend === 'up') {
      return (
        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
        </svg>
      );
    } else if (trend === 'down') {
      return (
        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      );
    }
    return null;
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-4">
          {/* Total Users */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-gray-600 mb-1">Total Users</h3>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold">{userStats.total_users}</span>
              <div className={`flex items-center ${getColor(userStats.total_users_trend)}`}>
                <span>{Math.abs(parseFloat(userStats.total_users_change))}%</span>
                {getArrow(userStats.total_users_trend)}
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-gray-600 mb-1">New Users</h3>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold">{userStats.new_users_this_week}</span>
              <div className={`flex items-center ${getColor(userStats.new_users_trend)}`}>
                <span>{Math.abs(parseFloat(userStats.new_users_change))}%</span>
                {getArrow(userStats.new_users_trend)}
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-gray-600 mb-1">Average Time Taken</h3>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold">{sessionStats.overall_avg_session_duration}s</span>
              <div className={`flex items-center ${getColor(sessionStats.trend)}`}>
              <span>{sessionStats.percentage_change}%</span>
              {getArrow(sessionStats.trend)}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-gray-600 mb-1">User Session Duration</h3>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold">{sessionStats.overall_avg_session_duration}s</span>
              <div className={`flex items-center ${getColor(sessionStats.trend)}`}>
                <span>{sessionStats.percentage_change}%</span>
                {getArrow(sessionStats.trend)}
              </div>
            </div>
          </div>

          {/* Account Lockouts (hardcoded) */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-gray-600 mb-1">Account Lockouts</h3>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold">24</span>
              <div className="flex items-center text-green-500">
                <span>2.3%</span>
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Active Users */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-gray-600 mb-1">Active Users</h3>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold">{activeStats.total_active_users}</span>
              <div className={`flex items-center ${getColor(activeStats.change_arrow)}`}>
                <span>{activeStats.percentage_change}%</span>
                {getArrow(activeStats.change_arrow)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MetricsSection;
