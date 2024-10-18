import React from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import User from './User';

const Profile = () => {
  return (
    <div>Profile

        <User />
        <Button>Edit</Button>
        <Link to={`/login`}>
            <Button>Log Out</Button>
        </Link>
    </div>
  )
}

export default Profile;