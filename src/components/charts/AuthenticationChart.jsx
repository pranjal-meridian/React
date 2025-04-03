import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip);

function AuthenticationChart() {
    const data = {
        labels: ['Success', 'Failure'],
        datasets: [
            {
                data: [150, 1],
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
                98%
            </div>
        </div>
    );
}

export default AuthenticationChart;