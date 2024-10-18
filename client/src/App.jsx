import React, { useEffect, useState } from 'react';
import './App.css'

const App = () => {
  
  // tests connection from express server to react client
  // creates initial state for message
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('http://localhost:3001/')
      .then(response => response.json())
      .then(data => setMessage(data.message))
      .catch(error => console.error('Error fetching data:', error));
  }, []);


  return (
    <div>App
      <p>{message}</p>
    </div>
  )
}

export default App;
