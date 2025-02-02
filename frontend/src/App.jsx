import { useState } from 'react'
import './App.css'
import Home from './pages/home/Home'
import Navigation from './components/Navigation'
import Loading from './components/Loading'
import Footer from './components/Footer'
import { Outlet } from 'react-router-dom'

function App() {
  

  return (
    <>
    <div className=''>
      <Navigation/>
      <Outlet></Outlet>
      {/* <Footer/> */}

    </div>
    </>
  )
}

export default App
