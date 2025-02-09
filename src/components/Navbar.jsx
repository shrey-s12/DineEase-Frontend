import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import { LiaShoppingCartSolid } from "react-icons/lia";
import { useDispatch, useSelector } from 'react-redux';

const Navbar = () => {
    const cartCount = useSelector(state => state.cart.items.length);
    const loading = useSelector((state) => state.cart.loading);
    const user = useSelector(state => state.auth.user);
    const dispatch = useDispatch();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('refresh_token');
        dispatch(setUser(null));
    }
    return (
        <>
            <nav className="flex justify-between items-center bg-gray-900 px-6 py-3 shadow-md sticky top-0 z-50">

                {/* if no user */}
                {!user && (
                    <>
                        < Link to="/" className="text-white font-extrabold text-3xl hover:text-yellow-400">
                            DineEase
                        </Link>
                        <div className="flex space-x-6">
                            <Link to="/auth/login" className="text-white text-lg font-medium hover:text-yellow-400 transition" >
                                Login
                            </Link>
                        </div>
                    </>
                )}

                {/* if user */}
                {user && (
                    <>
                        <Link to="/" className="text-white font-extrabold text-3xl hover:text-yellow-400">
                            <span>DineEase</span>
                            <span className='text-sm font-semibold ml-2'>{user.name}</span>
                        </Link>

                        <div className="flex space-x-6">
                            {user.role === "Admin" && (
                                <Link to="/allUsers" className="text-white text-lg font-medium hover:text-yellow-400 transition" >
                                    All Users
                                </Link>
                            )}

                            {user.role === "Merchant" && (
                                <Link to="/merchantCounters" className="text-white text-lg font-medium hover:text-yellow-400 transition" >
                                    My Counters
                                </Link>
                            )}

                            {(user.role === "Customer" || user.role === "Admin") && (
                                <Link to="/counters" className="text-white text-lg font-medium hover:text-yellow-400 transition">
                                    Counters
                                </Link>
                            )}

                            <Link to="/dishes" className="text-white text-lg font-medium hover:text-yellow-400 transition" >
                                Dishes
                            </Link>

                            <Link to="/profile" className="text-white text-lg font-medium hover:text-yellow-400 transition" >
                                Profile
                            </Link>

                            <Link onClick={handleLogout} to="/auth/login" className="text-white text-lg font-medium hover:text-yellow-400 transition" >
                                Logout
                            </Link>

                            {/* Cart */}
                            {user.role === "Customer" && (
                                <Link to="/cart" className="relative flex items-center text-white font-medium hover:text-yellow-400 transition" >
                                    <button className="relative">
                                        <LiaShoppingCartSolid className="text-3xl" />
                                        <div className="absolute -top-1 -right-2 bg-yellow-500 text-xs text-white font-bold rounded-full w-5 h-5 flex items-center justify-center">
                                            {loading ? (
                                                <span className="animate-spin rounded-full h-3 w-3 border-2 border-white border-t-transparent"></span>
                                            ) : (
                                                <span>{cartCount}</span>
                                            )}

                                        </div>
                                    </button>
                                    <span className="hidden md:inline ml-2">Cart</span>
                                </Link>
                            )}
                        </div>

                    </>
                )}
            </nav >
            <Outlet />
        </>

    )
}

export default Navbar