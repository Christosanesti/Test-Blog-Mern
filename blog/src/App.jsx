import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Projects from './pages/Projects'
import Header from './Header'
import Dashboard from './pages/Dashboard'
import FooterComponent from './components/Footer'
function App() {
  return (
    <BrowserRouter>
        <Header />
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/sign-in' element={<SignIn />} />
            <Route path='/sign-up' element={<SignUp />} />
            <Route path='/projects' element={<Projects />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/footer' element={<FooterComponent />} />
        </Routes>
    </BrowserRouter>
  )
}

export default App