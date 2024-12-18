import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';

function CaptainLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [captainData, setCaptainData] = useState({});

  const submitHandler = (e) => {
    e.preventDefault();

    setCaptainData({
      email: email,
      password: password
    })

    setEmail('');
    setPassword('');
  }


  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
      <div>
        <img className='w-20 mb-10' src="/logo.png" alt="logo" />
        <form onSubmit={submitHandler}>
          <label htmlFor='email'> <h2 className='text-lg font-medium mb-2'> What's Your Email </h2> </label>
          <input
            className='bg-[#eeeeee] mb-7 px-4 py-2 w-full border rounded-md text-lg'
            required
            value={email}
            onChange={(e) => { setEmail(e.target.value) }}
            type="email"
            id='email'
            placeholder='captain@example.com'
          />

          <label htmlFor='pass'> <h2 className='text-lg font-medium mb-2'> What's Your Password </h2> </label>
          <input
            className='bg-[#eeeeee] mb-7 px-4 py-2 w-full border rounded-md'
            required
            value={password}
            onChange={(e) => { setPassword(e.target.value) }}
            type="password"
            id='pass'
            placeholder='password'
          />

          <button
            className='bg-[#111] font-semibold text-white mt-4 px-4 py-2 w-full rounded-md'
          >
            Login
          </button>

        </form>

        <p className='text-center'>
          Join a fleet?
          <Link
            to='/captain-signup'
            className='text-blue-600'> Registetr as captain
          </Link>
        </p>
      </div>

      <div>
        <Link
          to='/login'
          className='bg-[#f9aa6e] flex items-center justify-center font-semibold text-black mb-5 mt-4 px-4 py-2 w-full rounded-md'
        >
          Sign in as user </Link>
      </div>

    </div>
  )
}

export default CaptainLogin