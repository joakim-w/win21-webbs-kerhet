import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import LogoutButton from './LogoutButton'
import LoginButton from './LoginButton'

const Navbar = () => {

  const { isAuthenticated } = useAuth0()

  return (
    <nav className='navbar navbar-expand-sm bg-light'>
      <div className="container">
        <Link className='navbar-brand' to="/">Bloggi</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id='navbarSupportedContent'>
          <div className='navbar-nav ms-auto'>
            <Link className='nav-link' to="/">Home</Link>
            {
              isAuthenticated
              ? <>
                <Link className='btn btn-primary mx-3' to="/add">Add Post</Link>
                <LogoutButton />
              </>
              : <LoginButton />
            }
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar