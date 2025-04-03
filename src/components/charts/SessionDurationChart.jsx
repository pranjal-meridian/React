import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

function SessionDurationChart() {
    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: false,
            },
        },
        scales: {
            y: {
                min: 50,
                grid: {
                    display: true,
                    color: '#E2E7E7',
                },
                border: {
                    dash: [3, 5]
                },
                ticks: {
                    color: "#737B8B",
                    font: {
                        size: 12,
                    },
                },
            },
            x: {
                grid: {
                    display: false,
                },
                border: {
                    display: false,
                },
                ticks: {
                    color: "#737B8B",
                    font: {
                        size: 12,
                    },
                },
            },
        },
    };

    const labels = ['01', '02', '03', '04', '05', '06'];

    const data = {
        labels,
        datasets: [
            {
                data: [70, 50, 100, 90, 60, 150],
                borderColor: '#3982FA',
                backgroundColor: 'rgba(57, 130, 250, 0.1)',
                pointRadius: 0,
                tension: 0.4,
                borderWidth: 2,
            },
        ],
    };

    return (
        <div className="w-full h-48">
            <Line options={options} data={data} />
        </div>
    );
}

export default SessionDurationChart;