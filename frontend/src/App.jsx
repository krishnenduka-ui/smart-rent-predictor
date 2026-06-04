import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Rentals from './pages/Rentals'
import ComparePage from './pages/ComparePage'
import Dashboard from './pages/Dashboard'
import Favorites from './pages/Favorites'
import Login from './pages/Login'
import Neighbourhoods from './pages/Neighbourhoods'
import NotFound from './pages/NotFound'
import Profile from './pages/Profile'
import PropertyDetails from './pages/PropertyDetails'
import SignUp from './pages/SignUp'
import ProtectedRoute from './components/ProtectedRoute'

const App = () => {
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rentals" element={<Rentals/>} />
        <Route path = "/favorites" element={<Favorites/>} />
        <Route path = "/login" element={<Login/>} />
        <Route path = "/compare" element={<ComparePage/>} />
        <Route path = "/dashboard" element={<Dashboard/>} />
        <Route path = "/neighbourhoods" element={<Neighbourhoods/>} />
        <Route path = "/profile" element={<Profile/>} />
        <Route path = "/properties" element={<PropertyDetails/>} />
        <Route path = "/signup" element={<SignUp/>} />
        <Route path = "*" element={<NotFound/>} />
      </Routes>
      <Footer/>
    </div>
  )
}

export default App