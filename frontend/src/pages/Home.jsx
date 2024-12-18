import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
    return (
        <div className='bg-no-repeat bg-cover bg-center bg-[url(/trafficLight.png)] h-screen w-full pt-9 flex justify-between flex-col'>
            <img className='w-20 ml-8' src="/logo.png" alt="logo" />
            <div className='bg-white pb-7 py-4 px-4 rounded-tl-md rounded-tr-md'>
                <h2 className='text-2xl font-bold'> Get Started With Uber </h2>
                <Link to='/login' className='flex items-center justify-center w-full bg-black text-white py-3 rounded-md mt-4 '> Continue </Link>
            </div>
        </div>
    )
}

export default Home