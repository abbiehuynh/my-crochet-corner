import React from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Login from './Login';

const Logout = () => {
  return (
    <div>
        {/* will show users confirmation that they have been logged out */}
        Logout

        {/* include Login Form here */}
        <Login />
        


    </div>
  )
}

export default Logout;