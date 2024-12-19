import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserDataContext } from '../context/UserContext';
import axios from 'axios';

function UserLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const { user, setUser } = useContext(UserDataContext);

  const submitHandler = async (e) => {
    e.preventDefault();

    const userData = {
      email: email,
      password: password
    }

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, userData);

    if(response.status == 200) {
      const data = response.data
      setUser(data.user);
      localStorage.setItem('token', data.token)
      navigate('/home');
    }

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
            placeholder='email@example.com'
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
          new here?
          <Link
            to='/signup'
            className='text-blue-600'> Create new user account
          </Link>
        </p>
      </div>

      <div>
        <Link
          to='/captain-login'
          className='bg-[#71e0a9] flex items-center justify-center font-semibold text-black mb-5 mt-4 px-4 py-2 w-full rounded-md'
        >
          Sign in as Captain </Link>
      </div>

    </div>
  )
}

export default UserLogin