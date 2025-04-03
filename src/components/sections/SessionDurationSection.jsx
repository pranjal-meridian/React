import React from 'react';
import SessionDurationChart from '../charts/SessionDurationChart';

function SessionDurationSection() {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-lg font-medium text-gray-800 mb-2">Average Session Duration</h2>
      <div className="mb-4">
        <span className="text-3xl font-bold">2.568m</span>
        <div className="flex items-center mt-2">
          <span className="text-red-500 text-sm">↓ 2.1%</span>
          <span className="text-gray-500 text-sm ml-2">vs last week</span>
        </div>
      </div>
      <SessionDurationChart />
    </div>
  );
}

export default SessionDurationSection;