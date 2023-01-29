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
import { useEffect, useState } from 'react';
  import { Line } from 'react-chartjs-2';
  import {temperatures} from "../src/pages/api/sample.json"

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
        plugins: {
          legend: {
            position: 'top' as const,
          },
          title: {
            display: true,
            text: 'Chart.js Line Chart',
          },
        },
      };
      
    

console.log(dates)

    useEffect(() => {
        let te:any = []
        let da:any = []
        for (let index = 0; index < temperatures.length; index++) {
            te.push(temperatures[index].temp);
            da.push(temperatures[index].created_at);
        }
        te.slice(-100)
        setTemps(te)
        setDates(da)
        
    }, [])
    const data = {
        labels: dates,
        datasets: [
          {
            label: 'Dataset 1',
            data: temps,
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          }
        ],
      };


    return <Line options={options} data={data} />
  }