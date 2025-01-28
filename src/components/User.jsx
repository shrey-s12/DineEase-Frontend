import React, { useState } from "react";
import axios from "axios";

const MAIN_URL = import.meta.env.VITE_MAIN_API_URL;

const User = ({ user, updateUser, deleteUser }) => {
    const [role, setRole] = useState(user.role);

    const handleEditUser = async () => {
        try {
            const response = await axios.put(`${MAIN_URL}/user/${user._id}`, {
                role: role === "Merchant" ? "Customer" : "Merchant",
            });
            updateUser(response.data);
            setRole(response.data.role);
        } catch (error) {
            console.error("Error updating user role:", error);
        }
    };

    const handleDeleteUser = async () => {
        try {
            await axios.delete(`${MAIN_URL}/user/${user._id}`);
            deleteUser(user);
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    return (
        <div className="flex items-center bg-gray-700 rounded-lg p-4 shadow-md hover:shadow-lg transition hover:scale-105">
            {/* Profile Image */}
            <img
                src={user.image}
                alt={user.name}
                className="w-16 h-16 rounded-full border-2 border-gray-500 mr-4"
            />
            {/* User Details */}
            <div className="flex-1">
                <h3 className="text-lg font-semibold">{user.name}</h3>
                <p className="text-gray-400 text-sm">{user.email}</p>
                <span className="text-sm mt-2">
                    <span className="font-semibold">Role:</span> {role}
                </span>
            </div>
            {/* Role Toggle Button */}
            {user.role !== "Admin" && (
                <button
                    onClick={handleEditUser}
                    className="bg-blue-500 text-white px-4 py-2 mr-4 rounded-md hover:bg-blue-600"
                >
                    Toggle Role
                </button>
            )}
            {user.role !== "Admin" && (
                <button
                    onClick={handleDeleteUser}
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                >
                    Delete User
                </button>
            )}
        </div>
    );
};

export default User;
