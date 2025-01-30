import React from 'react'
import { useSelector } from 'react-redux';
import Profile from '../components/Profile'

function ProfilePage() {
  const user = useSelector(state => state.auth.user);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-6">
      <div className="w-full max-w-2xl bg-gray-800 shadow-lg rounded-lg p-6 mx-auto mt-10">
        <h1 className="text-3xl font-bold text-center text-gray-200 mb-4">Profile</h1>
        <Profile user={user} />
      </div>
    </div>
  )
}

export default ProfilePage;
