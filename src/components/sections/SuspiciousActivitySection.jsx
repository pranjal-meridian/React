import React from 'react';
import BlockedUser from '../BlockedUser';

function SuspiciousActivitySection() {
  const suspiciousUsers = [
    { username: 'User153', time: '3:00 PM' },
    { username: 'User53', time: '3:50 PM' },
    { username: 'User13', time: '4:00 PM' },
    { username: 'User3', time: '4:30 PM' }
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-lg font-medium text-gray-800 mb-2">Suspicious Activity</h2>
      <p className="text-gray-500 text-sm mb-4">Adipiscing elit, sed do eiusmod tempor</p>
      
      <div className="divide-y divide-gray-200">
        {suspiciousUsers.map((user, index) => (
          <BlockedUser 
            key={index} 
            username={user.username} 
            time={user.time} 
          />
        ))}
      </div>
    </div>
  );
}

export default SuspiciousActivitySection;