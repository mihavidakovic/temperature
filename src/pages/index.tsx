import Head from 'next/head'
import Graph from 'components/Graph'
import { temperatures } from "./api/sample.json"
import { useEffect, useState } from 'react'
import { Select } from '@mantine/core';


export default function Home() {
  const [data, setData] = useState<any>(temperatures)
  const [filteredData, setFilteredData] = useState<any[]>()
  const [selectedHours, setSelectedHours] = useState<any>(2)

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

  }, [])

  useEffect(() => {
    filterData(selectedHours)
  }, [selectedHours])


  function filterData(hours: any) {
    if (data) {
      if (selectedHours === "all") {
        let takenData = data
        setFilteredData(takenData)
        let filTemps = []
        let filDates = []
        for (let index = 0; index < takenData.length; index++) {
          if (index & 1) {
            filTemps.push(takenData[index].temp)
            filDates.push(takenData[index].created_at)
          }
        }
        setFilteredTemps(filTemps)
        setFilteredDates(filDates)
      } else {
        let takenData = data.slice(-(selectedHours * 60))
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
            <Select
              placeholder="Pick one"
              onChange={setSelectedHours}
              value={selectedHours.toString()}
              data={[
                { value: '2', label: '2 hours' },
                { value: '6', label: '6 hours' },
                { value: '12', label: '12 hours' },
                { value: '24', label: '24 hours' },
                { value: 'all', label: 'all' },
              ]}
            />

          </div>
        </div>
        <div className='w-full bg-white/5 p-6 rounded-3xl'>
          <Graph temps={filteredTemps} dates={filteredDates} />
        </div>
      </div>
    </>
  )
}
