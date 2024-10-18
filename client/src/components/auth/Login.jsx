import React from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const Login = () => {
  return (
    <div>Login
        {/* should most likely go to be authorized and then go into home */}
        <Link to={`/`}>
            <Button>Log In</Button>
        </Link>
        <Link to={`/register`}>
            <Button>Create Account</Button>
        </Link>
    </div>
  )
}

export default Login;