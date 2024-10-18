import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './components/home/Home';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Logout from './components/auth/Logout';
import Favorites from './components/favorites-page/Favorites';
import Profile from './components/profile-page/Profile';
import Project from './components/home/Project';
import AIChatBot from './components/ai/AIChatBot';
import AddProjectNameForm from './components/home/AddProjectNameForm';
import './App.css'

const App = () => {
  
  // tests connection from express server to react client
  // creates initial state for message
  // documenting test connection, will remove after PR
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('http://localhost:3001/')
      .then(response => response.json())
      .then(data => setMessage(data.message))
      .catch(error => console.error('Error fetching data:', error));
  }, []);


  return (
    <div>App
      {/* test connection, will remove after documented in PR */}
      <p>{message}</p>

      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/logout" element={<Logout />} />

          <Route path="/favorites" element={<Favorites />} />
          {/* should be updated to profile/{$userId} */}
          <Route path="/profile" element={<Profile />} /> 
          {/* should be updated to /user/${userId}/project/${projectId} */}
          
          <Route path="/user/project" element={<Project />} />
          <Route path="/ai-chat" element={<AIChatBot />} />
          <Route path="/add-project" element={<AddProjectNameForm />} />
        </Routes>
      </Router>


    </div>
  )
}

export default App;
