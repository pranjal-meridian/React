import React, { useEffect, useState } from 'react';
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
import axios from 'axios';

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
    const [chartData, setChartData] = useState({
        labels: ['01', '02', '03', '04', '05', '06', '07'], // Static labels for last 7 days
        datasets: [
            {
                data: [0, 0, 0, 0, 0, 0, 0], // Default data points (will update after fetching)
                borderColor: '#3982FA',
                backgroundColor: 'rgba(57, 130, 250, 0.1)',
                pointRadius: 0,
                tension: 0.4,
                borderWidth: 2,
            },
        ],
    });

    // Function to fetch data
    const fetchData = () => {
        axios.get('api/average-session-duration')
            .then(response => {
                if (response.data.success) {
                    const last7DaysData = response.data.last_7_days; // Extract data for last 7 days
                    
                    const dataPoints = last7DaysData.map(item => item.average_session_duration); // Get session durations
                    setChartData(prevData => ({
                        ...prevData,
                        datasets: [
                            {
                                ...prevData.datasets[0],
                                data: dataPoints, // Update the chart with new data
                            },
                        ],
                    }));
                }
            })
            .catch(error => {
                console.error("Error fetching session duration data:", error);
            });
    };

    // Fetch data on component mount
    useEffect(() => {
        fetchData(); // Fetch data initially
    }, []); // Empty dependency array ensures it only runs on component mount

    const options = {
        responsive: true,
        plugins: {
            legend: { display: false },
            title: { display: false },
        },
        scales: {
            y: {
                min: 0,
                grid: { display: true, color: '#E2E7E7' },
                border: { dash: [3, 5] },
                ticks: { color: "#737B8B", font: { size: 12 } },
            },
            x: {
                grid: { display: false },
                border: { display: false },
                ticks: { color: "#737B8B", font: { size: 12 } },
            },
        },
    };

    return (
        <div className="w-full h-48">
            <Line options={options} data={chartData} />
        </div>
    );
}

export default SessionDurationChart;
