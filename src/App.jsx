import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import CustomerDetails from './pages/CustomerDetails'
import ViewPage from './pages/ViewPage'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<CustomerDetails />} />
        <Route path='/view/:company_id' element={<ViewPage />} />
      </Routes>
    </Router>
  )
}

export default App