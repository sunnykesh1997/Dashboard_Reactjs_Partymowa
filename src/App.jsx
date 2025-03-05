import React from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'

import Admin from './Admin/Admin'
import Dashboard from './Dashboard/Dashboard'

import AddCake from './AdminCakes/AddCake'
import AddDecoration from './AddDecoration/AddDecoration'
import AddRose from './AddRose/AddRose'
import Navbar from './Navbar/Navbar'
import Footer from './Footer/Footer'



const App = () => {
  return (
    <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path='/' element={<Admin/>}/>
      <Route path='/addcake' element={<AddCake/>}/>
      <Route path="/adddecor" element={<AddDecoration />} />
      <Route path='/addrose' element={<AddRose/>}/>
      <Route path='/dashboard' element={<Dashboard/>}/>
    </Routes>
    <Footer/>
    </BrowserRouter>
  )
}

export default App
