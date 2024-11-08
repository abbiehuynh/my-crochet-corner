import React from 'react'
import { Card, Button } from 'react-bootstrap';

const ProfileCard = ({ user, loading, error }) => {
  
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
  </Card>
  )
}

export default ProfileCard