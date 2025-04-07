import React, { useEffect, useState } from 'react';
import AuthenticationChart from '../charts/AuthenticationChart';

function AuthenticationSection() {
    const [authData, setAuthData] = useState({ success: 0, failure: 0 });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('api/auth-rates'); 
                const data = await response.json();
                setAuthData(data);
            } catch (error) {
                console.error('Error fetching authentication data:', error);
            }
        };

        fetchData();
        const interval = setInterval(fetchData, 5000); // Refresh every 5 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-medium text-gray-800 mb-2">Authentication Rates</h2>
            <p className="text-gray-500 text-sm mb-4">Real-time authentication success and failure rates</p>

            <div className="flex justify-center mb-6">
                <AuthenticationChart />
            </div>

            <div className="flex justify-around text-center">
                <div>
                    <div className="inline-block w-4 h-4 rounded-full bg-pink-200 mb-2"></div>
                    <div className="text-xl font-semibold">{authData.failure}</div>
                    <div className="text-gray-500 text-sm">Unsuccessful</div>
                </div>
                <div>
                    <div className="inline-block w-4 h-4 rounded-full bg-green-300 mb-2"></div>
                    <div className="text-xl font-semibold">{authData.success}</div>
                    <div className="text-gray-500 text-sm">Successful</div>
                </div>
            </div>
        </div>
    );
}

export default AuthenticationSection;
