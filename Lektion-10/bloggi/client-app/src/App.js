import { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import ProtectedRoute from './auth/ProtectedRoute'
import Navbar from './components/Navbar'
import AddPostPage from './pages/AddPostPage'
import HomePage from './pages/HomePage'

import { useAuth0 } from '@auth0/auth0-react'

const App = () => {

  const { getAccessTokenSilently, isAuthenticated } = useAuth0()

  useEffect(() => {

    const getToken = async () => {
      if(isAuthenticated) {
        // vi är inloggade - hämta accessToken och spara i localstorage
        try {
          
          const token = await getAccessTokenSilently({
            audience: process.env.REACT_APP_AUTH0_AUDIENCE
          })
  
          localStorage.setItem('accessToken', token)
        } catch (err) {
          console.log(err.message)
        }
      } else {
        // vi har loggat ut - ta bort accessToken från localstorage
        localStorage.removeItem('accessToken')
      }
    }

    getToken()

  }, [getAccessTokenSilently, isAuthenticated])

  return (
    <div>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* <Route path="/add" element={<AddPostPage />} /> */}
          <Route path="/add" element={ <ProtectedRoute component={AddPostPage} />} />
        </Routes>
      </div>
    </div>
  )
}

export default App