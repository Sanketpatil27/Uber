import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
import { UserDataContext } from '../context/UserContext'

function UserSignUp() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [userData, setUserData] = useState({});

  const navigate = useNavigate();
  const { user, setUser } = useContext(UserDataContext);

  const submitHandler = async (e) => {
    e.preventDefault();

    const newUser = {
      fullname: {
        firstname: firstName,
        lastname: lastName,
      },
      email: email,
      password: password
    }

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, newUser);

    if(response.status == 201) {
      const data = response.data
      setUser(data.user);
      localStorage.setItem('token', data.token)
      navigate('/home');
    }

    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
  }


  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
      <div>
        <img className='w-20 mb-10' src="/logo.png" alt="logo" />
        <form onSubmit={submitHandler}>

          <h3 className='text-base font-medium mb-1'>Whats Your Name</h3>
          <div className='flex overflow-hidden gap-2 mb-5'>
            <input
              className='bg-[#eeeeee] w-1/2 px-4 py-2 border rounded-md text-base'
              required
              value={firstName}
              onChange={(e) => { setFirstName(e.target.value) }}
              type="text"
              placeholder='John'
            />

            <input
              className='bg-[#eeeeee] w-1/2 px-4 py-2 border rounded-md text-base'
              value={lastName}
              onChange={(e) => { setLastName(e.target.value) }}
              type="text"
              placeholder='Doe'
            />
          </div>

          <label htmlFor='email'> <h2 className='text-base font-medium mb-1'> What's Your Email </h2> </label>
          <input
            className='bg-[#eeeeee] mb-5 px-4 py-2 w-full border rounded-md text-base'
            required
            value={email}
            onChange={(e) => { setEmail(e.target.value) }}
            type="email"
            id='email'
            placeholder='email@example.com'
          />

          <label htmlFor='pass'> <h2 className='text-base font-medium mb-1'> What's Your Password </h2> </label>
          <input
            className='bg-[#eeeeee] mb-5 px-4 py-2 w-full border rounded-md'
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
            Create Account
          </button>

        </form>

        <p className='text-center'>
          Already have an account?
          <Link
            to='/login'
            className='text-blue-600'> Login here
          </Link>
        </p>
      </div>

    </div>
  )
}

export default UserSignUp