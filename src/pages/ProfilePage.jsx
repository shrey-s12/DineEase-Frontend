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
    <div className="min-h-screen bg-gray-900 text-gray-100 p-6 flex justify-center items-center">
      <div className="w-full max-w-2xl bg-gray-800 shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold text-center text-gray-200 mb-4">Profile</h1>

        {/* Show loading spinner while fetching data */}
        {loading ? (
          <div className="flex justify-center items-center">
            <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-white"></div>
          </div>
        ) : (
          <Profile user={user} />
        )}
      </div>
    </div>
  );
}

export default ProfilePage;
