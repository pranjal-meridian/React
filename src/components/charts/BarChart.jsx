import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function BarChart() {
  const [chartData, setChartData] = useState({
    labels: ["01", "02", "03", "04", "05", "06", "07"],
    datasets: [
      {
        label: "Active Users",
        data: [0, 0, 0, 0, 0, 0, 0], // Initially empty
        backgroundColor: "#3982FA",
        barThickness: 10,
      },
    ],
  });

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const response = await fetch("api/active-users");
        const data = await response.json();

        setChartData({
          labels: ["01", "02", "03", "04", "05", "06", "07"], // Keep labels static
          datasets: [
            {
              label: "Active Users",
              data: data.active_users_per_day, // Update with API data
              backgroundColor: "#3982FA",
              barThickness: 10,
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching chart data:", error);
      }
    };

    fetchChartData();
    const interval = setInterval(fetchChartData, 30000); // Auto-refresh every 30s

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

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
          color: "#E2E7E7",
        },
        border: {
          dash: [2.5, 5],
        },
      },
    },
  };

  return (
    <div className="h-64">
      <Bar options={options} data={chartData} />
    </div>
  );
}

export default BarChart;
