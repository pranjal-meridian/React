import React from 'react';
import ActiveUsersSection from './sections/ActiveUsersSection';
import UserIssuesSection from './sections/UserIssuesSection';
import MetricsSection from './sections/MetricsSection';
import AuthenticationSection from './sections/AuthenticationSection';
import SuspiciousActivitySection from './sections/SuspiciousActivitySection';
import SessionDurationSection from './sections/SessionDurationSection';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate();
  return (
    <div className="container mx-auto px-4 py-8">
      <div className='flex justify-between items-center mb-6'>
        <h1 className="text-4xl font-bold text-slate-700 mb-8">Dashboard</h1>
        <button className="text-2xl font-bold text-white bg-blue-600 px-5 py-3 rounded mb-8 shadow-2xl hover:bg-blue-700 transition" onClick={() => navigate('/logs')}>Logs</button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* First Row */}
        <ActiveUsersSection />
        <UserIssuesSection />
        <MetricsSection />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        {/* Second Row */}
        <AuthenticationSection />
        <SuspiciousActivitySection />
        <SessionDurationSection />
      </div>
    </div>
  );
}

export default Dashboard;