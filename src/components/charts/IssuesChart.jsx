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

function IssuesChart(props) {
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            datalabels: {
                display: true,
                color: '#828282',
                align: 'top',
                anchor: 'end',
                font: {
                    size: 14,
                    weight: 'bold',
                },
                formatter: function (value) {
                    return value;
                }
            },
        },
        scales: {
            x: {
                display: true,
                grid: {
                    display: false,
                },
            },
            y: {
                display: true,
                grid: {
                    display: false,
                },
                beginAtZero: true,
            },
        },
    };

    const failedLabels = ['failed_Up', 'failed_Left', 'failed_Right', 'failed_Front'];

    const values = props.data ? failedLabels.map(key => props.data[key] || 0) : [];

    const totalFailed = values.reduce((acc, val) => acc + val, 0);

    const data = {
        labels: ['Failed Up', 'Failed Left', 'Failed Right', 'Failed Front'],
        datasets: [
            {
                data: values,
                backgroundColor: ['#FFCDD2', '#D1C4E9', '#C5CAE9', '#BBDEFB'],
                barThickness: 30,
                borderRadius: 4,
            }
        ],
    };

    return (
        <div className="w-full h-64">
            <Bar options={options} data={data} />
            <p className="text-gray-600 text-sm mt-1">Total number of errors: <span className="font-semibold">{totalFailed}</span></p>
        </div>
    );
}

export default IssuesChart;
