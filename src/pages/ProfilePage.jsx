import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Profile from '../components/Profile';

function ProfilePage() {
  const [loading, setLoading] = useState(true);
  const user = useSelector(state => state.auth.user);

  useEffect(() => {
    if (user) {
      setLoading(false);
    }
  }, [user]);

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 flex flex-col items-center  p-6">
      <h1 className="text-5xl font-bold text-blue-500 mb-6">Your Profile</h1>

      <div className="w-full max-w-xl bg-gray-900 shadow-lg rounded-xl p-8 flex flex-col items-center relative">
        {loading ? (
          <div className="flex justify-center items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
          </div>
        ) : (
          <Profile user={user} />
        )}
      </div>
    </div>
  );
}

export default ProfilePage;