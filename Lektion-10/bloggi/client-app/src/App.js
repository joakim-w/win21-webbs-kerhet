import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ProtectedRoute from './auth/ProtectedRoute'
import Navbar from './components/Navbar'
import AddPostPage from './pages/AddPostPage'
import HomePage from './pages/HomePage'

const App = () => {
  return (
    <div>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/add" element={ <ProtectedRoute component={AddPostPage} />} />
        </Routes>
      </div>
    </div>
  )
}

export default App