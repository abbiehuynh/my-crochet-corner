import React from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import UserForm from './UserForm';
import Logout from '../auth/Logout';

const Profile = () => {
  return (
    <div data-test="profile-page">
        {/* page is for displaying user information */}
        Profile

        {/* used to edit user information */}
        <UserForm />

        {/* when the user logs out, the user will be sent to the login page */}
        <Logout />
    </div>
  )
}

export default Profile;