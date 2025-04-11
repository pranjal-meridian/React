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
                formatter: function(value) {
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
                display: false,
                grid: {
                    display: false,
                },
                max: 12,
            },
        },
    };

    const values = props.data && [
      props.data.filter(item => item.detail === 'Login Issue').length,
      props.data.filter(item => item.detail === 'Task Failed').length,
      0,
      props.data.filter(item => item.detail === 'Invalid Attempt').length
    ]

    const data = {
        labels: ['Login Issue', 'Incorrect Challenge Performed', 'System Error', 'Invalid Attempts'],
        datasets: [
            {
                data: values,
                backgroundColor: ['#EDF2FA', '#D0E0FB', '#AAC9FF', '#7DAEFF'],
                barThickness: 35,
                borderRadius: 4,
            }
        ],
    };

    return (
        <div className="w-full h-40">
            <Bar options={options} data={data} />
        </div>
    );
}

export default IssuesChart;
