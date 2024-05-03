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
      handleLogout={handleLogout}
      />
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/login' element={<Login setAuthenticated={setAuthenticated}/>}/>
        <Route path='/register' element={<Register />}/>
        <Route path='/dashboard' element={<Dashboard authenticated={authenticated} isAdmin={isAdmin}/>}/>  
        <Route path='/uploads/new' element={<Upload authenticated={authenticated} isAdmin={isAdmin}/>}/>  
      </Routes>
      
    </Router>
  )
}

export default App
