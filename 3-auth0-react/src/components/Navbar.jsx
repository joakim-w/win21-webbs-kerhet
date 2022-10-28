import React from 'react'
import { NavLink } from 'react-router-dom'
import Avatar from './Avatar';

const Navbar = () => {

  const isAuthenticated = false;

  return (
    <nav className='navbar'>
      <div className='container flex'>
        <ul className='flex navbar-nav'>
          <li><NavLink className="nav-link" to="/" end>Home</NavLink></li>
          <li><NavLink className="nav-link" to="/profile" >Profile</NavLink></li>
        </ul>
        {
          !isAuthenticated && <button className='login-btn'>Log In</button>
        }
        {
          isAuthenticated && <Avatar />
        }
      </div>
    </nav>
  )
}

export default Navbar