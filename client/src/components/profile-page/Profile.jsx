import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import UserForm from './UserForm';
import Logout from '../auth/Logout';
import { useAuth } from '../auth/AuthProvider';

const Profile = () => {
  const { token, userId, axiosInstance } = useAuth();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // fetches user data if token is available
    const fetchUserData = async () => {
      if (!token || !userId) {
        setError('User not authenticated');
        setLoading(false);
        return;
      }

      try {
        // send GET request to fetch user data using userId
        const response = await axiosInstance.get(`/user/${userId}`, {
        });

        setUser(response.data[0]); 
        console.log(user)
      } catch (err) {
        setError('Failed to fetch user data');
        console.error(err);
      } finally {
        setLoading(false); 
      }
    };

    fetchUserData();  
  }, [token, userId, axiosInstance]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  
  return (
    <Card className="profile-card" data-test="profile-page">
      {/* TODO: add profile image */}
      <Card.Body>
        <Card.Title>{user ? `${user.name}'s Profile` : 'Profile'}</Card.Title>
          <Card.Text>Pronouns:</Card.Text>
          <Card.Text>About me:</Card.Text>
        { user && (
          <div>
            <h3>Account Information</h3>
            <p>Email: {user.email}</p>
            <p>Username: {user.username}</p>
            <p>Joined: {new Date(user.created_at).toLocaleDateString()}</p>
            <Button variant="primary">Edit Details</Button>
          </div>
        )}
      </Card.Body>
      
      <Logout />
    </Card>
  )
}

export default Profile;