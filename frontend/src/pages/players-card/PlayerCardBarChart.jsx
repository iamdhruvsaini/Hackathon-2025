import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    BarElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
    BarElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale
);

const PlayerStatsBarChart = ({ player }) => {
    // Chart data
    const data = {
        labels: ['Shooting', 'Passing', 'Dribbling', 'Defending', 'Attacking', 'Skill', 'Movement', 'Goalkeeping'],
        datasets: [
            {
                label: 'Player Stats',
                data: [
                    player.shooting,
                    player.passing,
                    player.dribbling,
                    player.defending,
                    player.attacking,
                    player.skill,
                    player.movement,
                    player.goalkeeping
                ],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.6)', // Red
                    'rgba(54, 162, 235, 0.6)', // Blue
                    'rgba(255, 206, 86, 0.6)', // Yellow
                    'rgba(75, 192, 192, 0.6)', // Teal
                    'rgba(153, 102, 255, 0.6)', // Purple
                    'rgba(255, 159, 64, 0.6)', // Orange
                    'rgba(46, 204, 113, 0.6)', // Green
                    'rgba(231, 76, 60, 0.6)'  // Dark Red
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(46, 204, 113, 1)',
                    'rgba(231, 76, 60, 1)'
                ],
                borderWidth: 1,
            },
        ],
    };

    // Chart options
    const options = {
        indexAxis: 'x', // Makes the chart horizontal
        responsive: true,
        maintainAspectRatio: false, // Allows the chart to fit its container
        plugins: {
            legend: {
                display: false, // Hide legend to keep the focus on stats
            },
            title: {
                display: true,
                text: `${player.name}'s Stats`,
                font: {
                    size: 18,
                    weight: 'bold'
                },
                padding: {
                    top: 10,
                    bottom: 20
                }
            },
            tooltip: {
                enabled: true,
                callbacks: {
                    label: (context) => {
                        const label = context.dataset.label || '';
                        const value = context.raw || 0;
                        return `${label}: ${value}`;
                    },
                },
            },
        },
        scales: {
            x: {
                beginAtZero: true,
                max: 100, // Ensures the max value is 100 for better comparison
                grid: {
                    display: false, // Hide grid lines for cleaner look
                },
                ticks: {
                    font: {
                        size: 14,
                    },
                },
            },
            y: {
                grid: {
                    display: false, // Hide grid lines for cleaner look
                },
                ticks: {
                    font: {
                        size: 14,
                    },
                },
                // Adjust bar thickness and spacing
                barThickness: 30, // Set a fixed thickness for the bars
                categoryPercentage: 0.8, // Controls the width of the bars relative to the category
                barPercentage: 0.9, // Controls the spacing between bars
            },
        },
    };

    return (
        <div style={{ height: '300px', width: "500px" }}>
            <Bar data={data} options={options} />
        </div>
    );
};

export default PlayerStatsBarChart;