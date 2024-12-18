import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import UserLogin from './pages/UserLogin'
import UserSignUp from './pages/UserSignUp'
import CaptainSignUp from './pages/CaptainSignup'
import CaptainLogin from './pages/CaptainLogin'

const App = () => {
  return (
    <div className=''>
      <Routes>
        <Route path='/' element={ <Home /> } />
        <Route path='/login' element={ <UserLogin /> } />
        <Route path='/signup' element={ <UserSignUp />} />
        <Route path='/captain-signup' element={ <CaptainSignUp />} />
        <Route path='/captain-login' element={ <CaptainLogin />} />
      </Routes>
    </div>
  )
}

export default App