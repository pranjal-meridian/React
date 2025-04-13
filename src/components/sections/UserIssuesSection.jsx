import React, { useEffect, useState } from 'react';
import IssuesChart from '../charts/IssuesChart';
import instance from "../../helpers/instance.js";

function UserIssuesSection() {
  const [data, setData] = useState(null);
  const fetchData = async () => {
    const response = await instance.get('/api/get-failed-tasks');
    setData(response.data);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-lg font-medium text-gray-800 mb-6">Tasks Failure</h2>

      <div className="flex justify-center">
        <IssuesChart data={data} />
      </div>

      <div className="mt-6 space-y-2 flex justify-between">
        <div className="flex items-center mt-3">
          <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: '#FFCDD2' }}></div>
          <span className="text-sm text-gray-600">Up</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: '#D1C4E9' }}></div>
          <span className="text-sm text-gray-600">Left</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: '#C5CAE9' }}></div>
          <span className="text-sm text-gray-600">Right</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: '#BBDEFB' }}></div>
          <span className="text-sm text-gray-600">Front</span>
        </div>
      </div>
    </div>
  );
}

export default UserIssuesSection;
