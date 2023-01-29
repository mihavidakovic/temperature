import Head from 'next/head'
import { Inter } from '@next/font/google'
import Graph from 'components/Graph'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>Temperature App</title>
        <meta name="description" content="Temp" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className='container mx-auto flex flex-col items-center justify-center'>
        <div className='py-6'>
          <span className='text-white text-xl uppercase font-bold'>Temperature</span>
        </div>
        <div className='w-full'>
          <Graph />
        </div>
      </div>
    </>
  )
}
