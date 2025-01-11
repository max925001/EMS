import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'
import ADMIN from './pages/ADMIN'
import RequiredAuth from './components/Auth/RequiredAuth'
import Dienied from './pages/Dienied'
import AddEmployee from './pages/AddEmployee'
import AllEmployee from './pages/AllEmployee'
import Profile from './pages/Profile'

function App() {
 

  return (
    <BrowserRouter>
    <Routes>
<Route path='/' element={<Home/>}/>
<Route  element={<RequiredAuth allowedRoles={["ADMIN"]}/>}>

<Route path='/admin' element={<ADMIN />}/>
<Route path='/add-employee' element={<AddEmployee/>}/>
<Route path='/all-employees' element={<AllEmployee/>}/>


</Route>
<Route path="/profile" element={<Profile />} />
<Route path='/denied' element={<Dienied/>}/>
<Route path='/login' element={<Login/>}/>



    </Routes>
    </BrowserRouter>
  )
}

export default App
