import React from 'react'
import { useSelector } from 'react-redux';
import Profile from '../components/Profile'

function ProfilePage() {
  const user = useSelector(state => state.auth.user)

  return (
    <div>
      <h1>Profile</h1>
      <Profile user={user} />
    </div>
  )
}

export default ProfilePage
