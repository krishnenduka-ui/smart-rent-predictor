import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Navbar = () => {
  return (
    <div>
      <Link to="/">Home</Link>
      <Link to="/rentals">Rentals</Link>
      <Link to="/signup">SignUp</Link>
      <Link to="/login">LogIn</Link>
    </div>
  )
}

export default Navbar