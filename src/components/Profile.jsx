import React from 'react'

const Profile = ({ user }) => {
    return (
        <div className="flex items-center bg-gray-700 p-6 rounded-lg shadow-lg text-gray-300 w-full max-w-md mx-auto">
            {/* Profile Image */}
            <div className="w-24 h-24 mr-6 flex-shrink-0">
                <img
                    src={user?.image}
                    alt="Profile"
                    className="w-full h-full rounded-full border-2 border-gray-500 object-cover"
                />
            </div>

            {/* User Info */}
            <div>
                <p className="text-lg font-semibold mb-2"><span className="text-gray-400">Name:</span> {user?.name || 'N/A'}</p>
                <p className="text-lg font-semibold mb-2"><span className="text-gray-400">Email:</span> {user?.email || 'N/A'}</p>
                <p className="text-lg font-semibold"><span className="text-gray-400">Role:</span> {user?.role || 'N/A'}</p>
            </div>
        </div>
    )
}

export default Profile
