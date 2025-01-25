import React from 'react'
import { useSelector } from 'react-redux'

const Profile = () => {
    const user = useSelector(state => state.auth.user);
    return (
        <div>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
            <p>Role: {user.role}</p>
        </div>
    )
}

export default Profile