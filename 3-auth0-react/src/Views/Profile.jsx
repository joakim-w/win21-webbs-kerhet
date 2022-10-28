import React from 'react'
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
import Loading from '../components/Loading';

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0()

  if(isLoading) {
    return <Loading />
  }

  return (
    <div className='Profile'>
      {
        isAuthenticated &&
        <div className='card flex'>
          <div className='img-container'>
            <img src={user.picture} alt={user.name} />
          </div>
          <div className='credentials'>
            <h2>{user.name}</h2>
            <p>{user.email}</p>
          </div>
        </div>
      }
    </div>
  )
}

// export default Profile
export default withAuthenticationRequired(Profile, {
  onRedirecting: () => <Loading />
})