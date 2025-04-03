import React from 'react';
import IssuesChart from '../charts/IssuesChart';

function UserIssuesSection() {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-lg font-medium text-gray-800 mb-6">User Issues</h2>
      
      <div className="flex justify-center">
        <IssuesChart />
      </div>
      
      <div className="mt-4">
        <p className="text-gray-600 text-sm">Total number of errors: <span className="font-semibold">19</span></p>
        
        <div className="mt-4 space-y-2">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-gray-200 mr-2"></div>
            <span className="text-sm text-gray-600">Login Issue</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-blue-200 mr-2"></div>
            <span className="text-sm text-gray-600">Incorrect Challenge Performed</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-blue-300 mr-2"></div>
            <span className="text-sm text-gray-600">System Error</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-blue-400 mr-2"></div>
            <span className="text-sm text-gray-600">Invalid Attempts</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserIssuesSection;