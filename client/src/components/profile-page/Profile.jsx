import React, { useState, useEffect } from 'react';
import ProfileCard from './ProfileCard';
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
        const response = await axiosInstance.get(`/user/${userId}`);

        const foundUser = response.data.find(user => user.id === userId);

        if (foundUser) {
          setUser(foundUser);
        } else {
          setError('User not found');
        }
      } catch (error) {
        setError('Failed to fetch user data');
        console.error(error);
      } finally {
        setLoading(false); 
      }
    };

    fetchUserData();  
  }, [token, userId, axiosInstance]);
  
  return (
    <div className="profile-page" data-test="profile-page">
      <ProfileCard user={user} loading={loading} error={error} />
      <Logout />
    </div>
  )
}

export default Profile;