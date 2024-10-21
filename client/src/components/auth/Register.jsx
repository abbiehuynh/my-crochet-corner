import React from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const Register = () => {
  return (
    <div>Register
        {/* after registering, user will be redirected to the login screen to login */}
        <Link to={`/login`}>
            <Button>Create Account</Button>
        </Link>


    </div>
  )
}

export default Register;