import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import CreatePost from './pages/CreatePost'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Projects from './pages/Projects'
import Header from './components/Header'
import Dashboard from './pages/Dashboard'
import FooterComponent from './components/Footer'
import PrivateRoute from './components/PrivateRoute'
import OnlyAdminPrivateRoute from './components/OnlyAdminPrivateRoute'
import UpdatePost from './pages/UpdatePosts'
import PostPage from './pages/PostPage'
import ScrollToTop from './components/ScrollToTop'
import Search from './pages/Search'


function App() {
  return (
    <BrowserRouter>
    <ScrollToTop />
        <Header />
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/sign-in' element={<SignIn />} />
            <Route path='/sign-up' element={<SignUp />} />
            <Route path='/search' element={<Search />} />
            <Route path='/projects' element={<Projects />} />
            <Route path='/post/:postId' element={<PostPage />} />
            

            <Route element={<PrivateRoute />}>
                <Route path='/dashboard' element={<Dashboard />} />
            </Route>
            <Route element={<OnlyAdminPrivateRoute />}>
                <Route path='/create-post' element={<CreatePost />} />
                <Route path='/update-post:/postId' element={<UpdatePost />} />
            </Route>
            <Route path='/footer' element={<FooterComponent />} />
        </Routes>
    </BrowserRouter>
  )
}

export default App