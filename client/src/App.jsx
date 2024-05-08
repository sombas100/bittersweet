import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import Navbar from './components/Navbar';
import { useState } from 'react';
import axios from 'axios'
import { redirect } from 'react-router-dom'
import BlogPostForm from './components/BlogPostForm';
import Upload from './components/Upload';
import Sidebar from './components/Sidebar';
import About from './components/About';
import Settings from './components/Settings';
import Footer from './components/Footer';
import OAuth from './components/OAuth';



function App() {
  const [authenticated, setAuthenticated] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  
  
  const handleLogout = async () => {
    try {
        await axios.get('http://localhost:3000/api/auth/logout');
        setAuthenticated(false)
        redirect('/login')
    } catch (error) {
        console.error('Logut failed:', error)
    }
};



  return (
    <Router>
      <Navbar authenticated={authenticated} 
      handleLogout={handleLogout}/>
      
      <Routes>
        <Route path='/' element={<Home authenticated={authenticated} setAuthenticated={setAuthenticated} handleLogout={handleLogout}/>}/>
        <Route path='/login' element={<Login setAuthenticated={setAuthenticated}/>}/>
        <Route path='/register' element={<Register />}/>
        <Route path='/about' element={<About />}/>  
        <Route path='/settings' element={<Settings />}/>  
        <Route path='/dashboard' element={<Dashboard authenticated={authenticated} isAdmin={isAdmin}/>}/>  
        <Route path='/uploads/new' element={<Upload authenticated={authenticated} isAdmin={isAdmin}/>}/>  
        <Route path="/oauth" render={() => <OAuth setAuthenticated={setAuthenticated} />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App
