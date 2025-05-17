import React from 'react';

import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './components/Header';
import {Route,Routes} from "react-router-dom"

import Inicio from './pages/Inicio';
import PedirTurno from "./pages/PedirTurno"
import Login from "./pages/Login"
import Panel from "./pages/Panel"
function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='bg-white min-h-svh w-screen '>
      <Header/>
      <main>
        <Routes>
            <Route path='/' element={<Inicio/>} />
            <Route path="/pedirturno/:id" element={<PedirTurno/>}/>
            <Route path="/login" element={<Login/>} />
            <Route path="/panel" element={<Panel/>} />
        </Routes>

      </main>
      
    </div>
  )
}

export default App
