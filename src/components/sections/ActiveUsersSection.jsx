import React from 'react';
import BarChart from '../charts/BarChart';

function ActiveUsersSection() {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-lg font-medium text-gray-800 mb-2">Active Users</h2>
      <div className="mb-4">
        <span className="text-3xl font-bold">15k</span>
        <div className="flex items-center mt-2">
          <span className="text-green-500 text-sm">↑ 2.1%</span>
          <span className="text-gray-500 text-sm ml-2">vs last week</span>
        </div>
      </div>
      <BarChart />
    </div>
  );
}

export default ActiveUsersSection;