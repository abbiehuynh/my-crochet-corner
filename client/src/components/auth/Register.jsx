import React from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const Register = () => {
  return (
    <div>Register
        {/* after registering, user must login again */}
        <Link to={`/login`}>
            <Button>Create Account</Button>
        </Link>


    </div>
  )
}

export default Register;