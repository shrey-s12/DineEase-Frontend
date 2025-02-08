import React, { useState } from "react";
import axios from "axios";
import { updateUser, deleteUser } from "../slices/usersSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const MAIN_URL = import.meta.env.VITE_MAIN_API_URL;

const User = ({ user }) => {
    const [role, setRole] = useState(user.role);
    const token = localStorage.getItem("token");
    const dispatch = useDispatch();

    const handleEditUser = async (role) => {
        try {
            const response = await axios.put(`${MAIN_URL}/user/${user._id}`,
                { role },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            dispatch(updateUser(response.data));
            setRole(response.data.role);
            toast.success("User role updated!");
        } catch (error) {
            console.error("Error updating user role:", error);
            toast.error("Error updating user role!");
        }
    };

    const handleDeleteUser = async () => {
        try {
            await axios.delete(`${MAIN_URL}/user/${user._id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            dispatch(deleteUser(user));
            toast.success("User deleted successfully!");
        } catch (error) {
            console.error("Error deleting user:", error);
            toast.error("Error deleting user!");
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

            <select
                value={role}
                onChange={(e) => handleEditUser(e.target.value)}
                className="bg-gray-800 text-white px-4 py-2 mr-4 rounded-md"
            >
                <option value="Admin">Admin</option>
                <option value="Merchant">Merchant</option>
                <option value="Customer">Customer</option>
            </select>

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
