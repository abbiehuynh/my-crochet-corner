import React from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import UserForm from './UserForm';

const Profile = () => {
  return (
    <div>
        {/* page is for displaying user information */}
        Profile

        {/* used to edit user information */}
        <UserForm />

        {/* when the user logs out, the user will be sent to the login page */}
        <Link to={`/logout`}>
            <Button>Log Out</Button>
        </Link>
    </div>
  )
}

export default Profile;