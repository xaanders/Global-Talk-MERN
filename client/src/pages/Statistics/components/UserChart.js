import React from 'react'
import classes from './UserStatistics.module.css'

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

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Statistics of right answers',
        },
    },
};

function UserChart({currentAudioData, currentSprintData, games}) {
    
    const data = {
        labels: games,
        datasets: [
            {
                label: 'Sprint',
                data: currentSprintData,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
                label: 'AudioCall',
                data: currentAudioData,
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    };

    return (
    <div className={classes.chart}>
        <Line  options={options} data={data} />
    </div>
    )
}

export default UserChart