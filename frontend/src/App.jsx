import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Rentals from './pages/Rentals'
import ComparePage from './pages/ComparePage'
import UserDashboard from './pages/UserDashboard'
import AdminDashboard from './pages/AdminDashboard'
import Favorites from './pages/Favorites'
import Login from './pages/Login'
import NotFound from './pages/NotFound'
import PropertyDetails from './pages/PropertyDetails'
import SignUp from './pages/SignUp'
import ProtectedRoute from './components/ProtectedRoute'
import AddProperty from './pages/AddProperty'
import EditProperty from './pages/EditProperty'

const App = () => {
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rentals" element={<Rentals/>} />
        
        <Route path = "/login" element={<Login/>} />
        <Route path = "/userDashboard" element={<ProtectedRoute role = "user">
                                                    <UserDashboard/>
                                                </ProtectedRoute>
                                                } />
        <Route path = "/favorites" element={<ProtectedRoute role = "user">
                                              <Favorites/>
                                            </ProtectedRoute>} />
        <Route path = "/compare" element={<ProtectedRoute role = "user">
                                            <ComparePage/>
                                          </ProtectedRoute>} />
        <Route path="/adminDashboard" element={<ProtectedRoute role = "admin">
                                                    <AdminDashboard/>
                                              </ProtectedRoute>}/>
        <Route path='/addProperty' element={<ProtectedRoute role="admin">
                                              <AddProperty />
                                            </ProtectedRoute>}/>
        
        <Route path= '/editProperty/:id' element = {<ProtectedRoute role="admin">
                                                  <EditProperty/>
                                                </ProtectedRoute>}/>
        
        <Route path = "/property/:id" element={<PropertyDetails/>} />
        <Route path = "/signup" element={<SignUp/>} />
        <Route path = "*" element={<NotFound/>} />
      </Routes>
      <Footer/>
    </div>
  )
}

export default App