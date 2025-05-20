import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip);

function AuthenticationChart() {
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

    const total = authData.success + authData.failure;
    const successRate = total > 0 ? ((authData.success / total) * 100).toFixed(2) : "0";

    const data = {
        labels: ['Success', 'Failure'],
        datasets: [
            {
                data: [authData.success, authData.failure],
                backgroundColor: ['#A6D997', '#FECBD6'],
                borderWidth: 0,
            },
        ],
    };

    const options = {
        plugins: {
            tooltip: { enabled: false },
        },
        elements: {
            arc: {
                borderWidth: 0,
            },
        },
        cutout: '75%',
    };

    return (
        <div className="relative w-40 h-40">
            <Doughnut data={data} options={options} />
            <div className="absolute inset-0 flex items-center justify-center text-green-500 text-2xl font-bold">
                {successRate}%
            </div>
        </div>
    );
}

export default AuthenticationChart;
