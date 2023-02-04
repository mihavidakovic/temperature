import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ScriptableContext,
} from 'chart.js';
import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';

export default function Graph({temps, dates}: any) {
  console.log(temps)
  console.log(dates)

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    backgroundColor: "red",
    elements: {
      line: {
        tension: 0.2
      }
    },
    legend: {
      display: false
    },
    scales: {
      x: {
        ticks: {
          display: false,
        }
      }
    }
  };




  const data = {
    labels: dates,
    datasets: [
      {
        label: 'C',
        data: temps,
        borderWidth: 1,
        borderColor: '#911215',
      }
    ],
  };


  return <Line options={options} data={data} />
}