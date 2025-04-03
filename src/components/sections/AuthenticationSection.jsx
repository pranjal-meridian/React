import React from 'react';
import AuthenticationChart from '../charts/AuthenticationChart';

function AuthenticationSection() {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-lg font-medium text-gray-800 mb-2">Authentication Rates</h2>
      <p className="text-gray-500 text-sm mb-4">Lorem ipsum dolor sit amet, consectetur</p>
      
      <div className="flex justify-center mb-6">
        <AuthenticationChart />
      </div>
      
      <div className="flex justify-around text-center">
        <div>
          <div className="inline-block w-4 h-4 rounded-full bg-pink-200 mb-2"></div>
          <div className="text-xl font-semibold">1</div>
          <div className="text-gray-500 text-sm">Unsuccessful</div>
        </div>
        <div>
          <div className="inline-block w-4 h-4 rounded-full bg-green-300 mb-2"></div>
          <div className="text-xl font-semibold">150</div>
          <div className="text-gray-500 text-sm">Successful</div>
        </div>
      </div>
    </div>
  );
}

export default AuthenticationSection;