import { useState } from 'react'
import './App.css'
import AppBar from './components/AppBar'
import { Route, Routes } from 'react-router'
import Home from './pages/Home'
import Create from './pages/Create'
import Show from './pages/Show'

function App() {

  return (
    <>
      <AppBar />
      <div className='container my-5'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/create' element={<Create />} />
          <Route path='/users/edit/:id' element={<Create />} />
          <Route path='/users/show/:id' element={<Show />} />
        </Routes>
      </div>
    </>
  )
}

export default App
