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
import { temperatures } from "../src/pages/api/sample.json"

export default function Graph() {
  const [temps, setTemps]: any = useState([])
  const [dates, setDates] = useState()

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

  };



  console.log(dates)

  useEffect(() => {
    let te: any = []
    let da: any = []
    for (let index = 0; index < temperatures.length; index++) {
      te.push(temperatures[index].temp);
      da.push(temperatures[index].created_at);
    }

    setTemps(te.slice(-100))
    setDates(da.slice(-100))

  }, [])
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