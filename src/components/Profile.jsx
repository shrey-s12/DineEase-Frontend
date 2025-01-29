import React from 'react'

const Profile = ({ user }) => {
    return (
        <div>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
            <p>Role: {user.role}</p>
        </div>
    )
}

export default Profile