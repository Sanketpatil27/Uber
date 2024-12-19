import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { CaptainDataContext } from '../context/CaptainContext';
import axios from 'axios';

function CaptainSignup() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [color, setColor] = useState('');
  const [plate, setPlate] = useState('');
  const [capacity, setCapacity] = useState('');
  const [vehicleType, setVehicleType] = useState('');

  const { captain, setCaptain } = useContext(CaptainDataContext);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    const captainData = {
      fullname: {
        firstname: firstName,
        lastname: lastName,
      },
      email: email,
      password: password,
      vehicle: {
        color: color,
        plate: plate,
        capacity: capacity,
        vehicleType: vehicleType
      }
    }

    const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`, captainData);
    if(res.status === 201) {
      const data = res.data;
      setCaptain(data.captain);
      localStorage.setItem('token', data.token);
      navigate('/captain-home');
    }


    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
    setColor('');
    setPlate('');
    setCapacity('');
    setVehicleType('');
  }


  return (
    <div className='py-5 px-5 h-screen flex flex-col justify-between'>
      <div>
        <img className='w-20 mb-10' src="/logo.png" alt="logo" />
        <form onSubmit={submitHandler}>

          <h3 className='text-base font-medium mb-1'>Whats Our Captain's Name</h3>
          <div className='flex overflow-hidden gap-2 mb-7'>
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
            className='bg-[#eeeeee] mb-7 px-4 py-2 w-full border rounded-md text-base'
            required
            value={email}
            onChange={(e) => { setEmail(e.target.value) }}
            type="email"
            id='email'
            placeholder='email@example.com'
          />

          <label htmlFor='pass'> <h2 className='text-base font-medium mb-1'> What's Your Password </h2> </label>
          <input
            className='bg-[#eeeeee] mb-7 px-4 py-2 w-full border rounded-md'
            required
            value={password}
            onChange={(e) => { setPassword(e.target.value) }}
            type="password"
            id='pass'
            placeholder='password'
          />

          <h3 className='text-base font-medium mb-1'>Vehicle Information</h3>
          <div className='flex gap-2 mb-2'>
            <input
              className='bg-[#eeeeee] mb-5 px-4 py-2 w-1/2 border rounded-md'
              required
              value={color}
              onChange={(e) => { setColor(e.target.value) }}
              type="text"
              placeholder='Vehicle Color'
            />

            <input
              className='bg-[#eeeeee] mb-5 px-4 py-2 w-1/2 border rounded-md'
              required
              value={plate}
              onChange={(e) => { setPlate(e.target.value) }}
              type="Number"
              placeholder='Vehicle Plate'
            />
          </div>

          <div className='flex gap-2 mb-5'>
            <input
              className='bg-[#eeeeee] mb-5 px-4 py-2 w-1/2 border rounded-md'
              required
              value={capacity}
              onChange={(e) => { setCapacity(e.target.value) }}
              type="Number"
              placeholder='vehicle Capacity'
            />

            <select
              className='bg-[#eeeeee] mb-5 px-4 py-2 w-1/2 border rounded-md'
              required
              value={vehicleType}
              onChange={(e) => { setVehicleType(e.target.value) }}
            >
              <option value="" disabled> Select Vehicle Type </option>
              <option value="car">Car</option>
              <option value="auto">Auto</option>
              <option value="moto">Moto</option>
            </select>
          </div>

          <button
            className='bg-[#111] font-semibold text-white mt-4 px-4 py-2 w-full rounded-md'
          >
            Create Account
          </button>

        </form>

        <p className='text-center'>
          Already have an account?
          <Link
            to='/captain-login'
            className='text-blue-600'> Login here
          </Link>
        </p>
      </div>

    </div>
  )
}

export default CaptainSignup