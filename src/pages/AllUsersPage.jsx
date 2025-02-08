import axios from "axios";
import React, { useEffect, useState } from "react";
import User from "../components/User";
import { useDispatch, useSelector } from "react-redux";
import { setUsers } from "../slices/usersSlice";
import { toast } from "react-toastify";

const MAIN_URL = import.meta.env.VITE_MAIN_API_URL;

const AllUsersPage = () => {
    const dispatch = useDispatch();
    const token = localStorage.getItem("token");
    const { users, loading } = useSelector((state) => state.users);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(`${MAIN_URL}/user`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                // console.log("users", response.data);
                dispatch(setUsers(response.data));
            } catch (error) {
                console.error(error);
                toast.error("Error fetching users!");
            }
        };
        fetchUsers();
    }, []);

    console.log("object", users);
    const admins = users.filter((user) => user.role === "Admin");
    const merchants = users.filter((user) => user.role === "Merchant");
    const customers = users.filter((user) => user.role === "Customer");
    console.log("Admins:", admins);

    return (
        <div className="min-h-screen bg-gray-900 text-white p-6">
            {/* Admin Section */}
            {loading ? (
                <div className="flex justify-center items-center h-40">
                    <span className="animate-spin rounded-full h-12 w-12 border-4 border-gray-400 border-t-white"></span>
                </div>
            ) : (
                <>
                    <div className=" mb-12">
                        <h1 className="text-center text-4xl font-bold mb-4">Admin</h1>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {admins.map((user) => (
                                <User key={user._id} user={user} />
                            ))}
                        </div>
                    </div>

                    {/* Merchants and Customers Section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Merchants Section */}
                        <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
                            <h2 className="text-2xl font-semibold mb-6 text-center">
                                Merchants ({merchants.length})
                            </h2>
                            <div className="space-y-4">
                                {merchants.map((user) => (
                                    <User key={user._id} user={user} />
                                ))}
                                {merchants.length === 0 && (
                                    <p className="text-center text-gray-400">No merchants found.</p>
                                )}
                            </div>
                        </div>

                        {/* Customers Section */}
                        <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
                            <h2 className="text-2xl font-semibold mb-6 text-center">
                                Customers ({customers.length})
                            </h2>
                            <div className="space-y-4">
                                {customers.map((user) => (
                                    <User key={user._id} user={user} />
                                ))}
                                {customers.length === 0 && (
                                    <p className="text-center text-gray-400">No customers found.</p>
                                )}
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default AllUsersPage;
