import React from 'react';
import MetricCard from '../MetricCard';

function MetricsSection() {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="grid grid-cols-2 gap-4">
        {/* Left Column */}
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-gray-600 mb-1">Total Users</h3>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold">2054</span>
              <div className="flex items-center text-red-500">
                <span>4.3%</span>
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-gray-600 mb-1">New Users</h3>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold">254</span>
              <div className="flex items-center text-green-500">
                <span>4.3%</span>
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7"></path>
                </svg>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-gray-600 mb-1">Average Time Taken</h3>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold">5.4s</span>
              <div className="flex items-center text-green-500">
                <span>4.3%</span>
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right Column */}
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-gray-600 mb-1">User Session Duration</h3>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold">7min</span>
              <div className="flex items-center text-red-500">
                <span>4.3%</span>
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-gray-600 mb-1">Account Lockouts</h3>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold">24</span>
              <div className="flex items-center text-green-500">
                <span>2.3%</span>
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7"></path>
                </svg>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-gray-600 mb-1">Active Users</h3>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold">5</span>
              <div className="flex items-center text-green-500">
                <span>1.3%</span>
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MetricsSection;