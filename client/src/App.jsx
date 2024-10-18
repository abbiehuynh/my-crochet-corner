import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './components/home/Home';
import Favorites from './components/favorites-page/Favorites';
import Profile from './components/profile-page/Profile';
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
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/profile" element={<Profile />} />

        </Routes>
      </Router>


    </div>
  )
}

export default App;
