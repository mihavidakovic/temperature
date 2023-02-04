import Head from 'next/head'
import { Inter } from '@next/font/google'
import Graph from 'components/Graph'
import { temperatures } from "./api/sample.json"
import { useEffect, useState } from 'react'


export default function Home() {
  const [data, setData] = useState<any>()
  const [filteredData, setFilteredData] = useState<any[]>()
  const [selectedHours, setSelectedHours] = useState<any>(12)

  const [filteredTemps, setFilteredTemps] = useState<any>()
  const [filteredDates, setFilteredDates] = useState<any>()

  const [average, setAverage] = useState<number>()


  const calculateAverage = (arr: any[]) => arr.reduce((p, c) => p + c, 0) / arr.length;

  useEffect(() => {
    let onlyTemperatures: any = []
    for (let index = 0; index < temperatures.length; index++) {
      onlyTemperatures.push(temperatures[index].temp);
    }

    setAverage(calculateAverage(onlyTemperatures))
    setData(temperatures)
    filterData(6)

  }, [data])


  function filterData(hours: any) {
    if (data) {
      if (hours === "all") {
        let takenData = data
        setFilteredData(takenData)
        let filTemps = []
        let filDates = []
        for (let index = 0; index < takenData.length; index++) {
          filTemps.push(takenData[index].temp)
          filDates.push(takenData[index].created_at)
        }
        setFilteredTemps(filTemps)
        setFilteredDates(filDates)
      } else {
        let takenData = data.slice(-(hours * 60))
        setFilteredData(takenData)
        let filTemps = []
        let filDates = []
        for (let index = 0; index < takenData.length; index++) {
          filTemps.push(takenData[index].temp)
          filDates.push(takenData[index].created_at)
        }
        setFilteredTemps(filTemps)
        setFilteredDates(filDates)
      }
    } 
  }

  return (
    <>
      <Head>
        <title>Temperature App</title>
        <meta name="description" content="Temp" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className='container mx-auto flex flex-col items-center justify-center'>
        <div className='w-full py-8 flex flex-row items-center justify-between'>
          <div className='flex flex-col'>
            <span className='text-white text-xl uppercase font-bold'>Temperature: {data && data.at(-1).temp.toFixed(1)} °C</span>
            <span className='text-white/60 text-xs'>Average temp: {average && average.toFixed(1)} °C</span>
          </div>
          <div className='flex flex-row items-center'>
            <label htmlFor='selectHours' className='mr-4 text-white text-sm'>Show:</label>
            <select onChange={(e) => filterData(e.target.value)}>
              <option value="6">6 hours</option>
              <option value="12">12 hours</option>
              <option value="24">24 hours</option>
              <option value="all">all hours</option>
            </select>
          </div>
        </div>
        <div className='w-full bg-white/5 p-6 rounded-3xl'>
          <Graph temps={filteredTemps} dates={filteredDates} />
        </div>
      </div>
    </>
  )
}
