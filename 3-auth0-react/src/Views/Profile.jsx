import React from 'react'

const Profile = () => {
  const isAuthenticated = true;

  return (
    <div className='Profile'>
      {
        isAuthenticated &&
        <div className='card flex'>
          <div className='img-container'>
            <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80" alt="joakim wahlström" />
          </div>
          <div className='credentials'>
            <h2>Joakim Wahlström</h2>
            <p>wahlstrom.joakim@gmail.com</p>
          </div>
        </div>
      }
    </div>
  )
}

export default Profile