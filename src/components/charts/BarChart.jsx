import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

function BarChart() {
    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
        },
        scales: {
            x: {
                grid: {
                    display: false,  
                },
                ticks: {
                    color: "#737B8B",
                    font: {
                        size: 12,  
                    },
                },
            },
            y: {
                grid: {
                    display: true,  
                    color: '#E2E7E7',
                },
                border: {
                    dash: [2.5, 5],
                },
            },
        },
    };
           
    const data = {
        labels: [
            "01",
            "02",
            "03",
            "04",
            "05",
            "06",
            "07"
        ],
        datasets: [
            {
                label: 'Active Users',
                data: [23, 20, 45, 34, 50, 46, 37],
                backgroundColor: '#3982FA',
                barThickness: 10,
            }
        ],
    };

    return (
        <div className='h-64'>
            <Bar options={options} data={data} />
        </div>
    );
}

export default BarChart;