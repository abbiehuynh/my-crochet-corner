import React from 'react'
import { Card, Button } from 'react-bootstrap';

const ProfileCard = ({ user, loading, error }) => {

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!user) return <p>No user data available.</p>

  return (
    <div className="profile-container">
      <Card className="profile-card" data-test="profile-page">
        {/* TODO: add profile image */}
        <Card.Body>
          <Card.Title>{user ? `${user.name}'s Profile` : 'Profile'}</Card.Title>
            <div className="profile-bio">
              {user.pronouns && <Card.Text>Pronouns: {user.pronouns}</Card.Text>}
              {user.bio && <Card.Text>About me: {user.bio}</Card.Text>}
              <Button variant="primary" className="edit-bio-btn">Edit Details</Button>
            </div>
          </Card.Body>
      </Card>

      <Card className="account-card">
        <Card.Body>
          <Card.Title>Account Information</Card.Title>
          { user && (
            <div className="account-info">
                <Card.Text>Email: {user.email}</Card.Text>
                <Card.Text>Username: {user.username}</Card.Text>
                <Card.Text>Joined: {new Date(user.created_at).toLocaleDateString()}</Card.Text>
            </div>
          )}
        </Card.Body>
      </Card>
    </div>
  )
}

export default ProfileCard