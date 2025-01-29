import React from 'react'
import Profile from '../components/Profile'
import { useSelector } from 'react-redux';

const ProfilePage = () => {
  const user = useSelector(state => state.auth.user);
  return (
    <div>
      <h1>Profile</h1>
      <Profile user={user} />
    </div>
  )
}

export default ProfilePage