import Head from 'next/head'
import { Inter } from '@next/font/google'
import Graph from 'components/Graph'
import { temperatures } from "./api/sample.json"
import { useEffect, useState } from 'react'


export default function Home() {
  const [temps, setTemps]: any = useState<any[]>([])
  const [dates, setDates] = useState<any[]>([])
  const [average, setAverage] = useState<number>()


  const calculateAverage = (arr: any[]) => arr.reduce( ( p, c ) => p + c, 0 ) / arr.length;

  useEffect(() => {
    let te: any = []
    let da: any = []
    for (let index = 0; index < temperatures.length; index++) {
      te.push(temperatures[index].temp);
      da.push(temperatures[index].created_at);
    }

    setTemps(te)
    setDates(da)
    setAverage(calculateAverage(te))

  }, [])



  return (
    <>
      <Head>
        <title>Temperature App</title>
        <meta name="description" content="Temp" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className='container mx-auto flex flex-col items-center justify-center'>
        <div className='py-8 flex flex-col items-center justify-center'>
          <span className='text-white text-xl uppercase font-bold'>Temperature: {temps && temps.at(-1) && temps.at(-1).toFixed(1)} °C</span>
          <span className='text-white/60 text-xs'>Average temp: {average && average.toFixed(1)} °C</span>
        </div>
        <div className='w-full bg-white/5 p-6 rounded-3xl'>
          {dates && temps && <Graph temps={temps.slice(-50)} dates={dates.slice(-50)} />}
        </div>
      </div>
    </>
  )
}
