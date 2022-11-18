import React from 'react'
import { withAuthenticationRequired } from '@auth0/auth0-react'
import Loader from '../components/Loader'

const ProtectedRoute = ({ component, ...rest }) => {

  const Comp = withAuthenticationRequired( component, { onRedirecting: () => <Loader /> } )

  return <Comp {...rest} />
}

export default ProtectedRoute