import React, {useEffect, useState} from 'react';
import BlockedUser from '../BlockedUser';
import instance from "../../helpers/instance.js";

function SuspiciousActivitySection() {
  const suspiciousUsers = [
    { username: 'User153', time: '3:00 PM' },
    { username: 'User53', time: '3:50 PM' },
    { username: 'User13', time: '4:00 PM' },
    { username: 'User3', time: '4:30 PM' }
  ];

  const [sus, setSus] = useState()

  const fetchSuspiciousUsers = async () => {
    try {
      const response = await instance.get('/api/get-top-rejected-users');
      setSus(response.data);
  }
    catch (error) {
      console.error("Error fetching suspicious users:", error);
    }
  };

  useEffect(() => {
    fetchSuspiciousUsers();
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-lg font-medium text-gray-800 mb-2">Suspicious Activity</h2>

      <div className="divide-y divide-gray-200">
        {sus?.map((user, index) => (
          <BlockedUser
            key={index}
            username={user.email}
            time={`${user.count} times`}
          />
        ))}
      </div>
    </div>
  );
}

export default SuspiciousActivitySection;
