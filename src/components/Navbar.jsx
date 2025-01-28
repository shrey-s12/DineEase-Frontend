import React from 'react'
import { Link } from 'react-router-dom'
import { LiaShoppingCartSolid } from "react-icons/lia";
import { useSelector } from 'react-redux';

const Navbar = () => {
    const cartCount = useSelector(state => state.cart.items.length);
    return (
        <nav className="flex justify-between items-center bg-gray-900 px-6 py-3 shadow-md sticky top-0 z-50">
            {/* Logo */}
            <Link to="/" className="text-white font-extrabold text-3xl hover:text-yellow-400">
                DineEase
            </Link>

            {/* Links */}
            <div className="flex space-x-6">
                <Link
                    to="/allUsers"
                    className="text-white text-lg font-medium hover:text-yellow-400 transition"
                >
                    All Users
                </Link>
                <Link
                    to="/counters"
                    className="text-white text-lg font-medium hover:text-yellow-400 transition"
                >
                    Counters
                </Link>
                <Link
                    to="/dishes"
                    className="text-white text-lg font-medium hover:text-yellow-400 transition"
                >
                    Dishes
                </Link>
                <Link
                    to="/profile"
                    className="text-white text-lg font-medium hover:text-yellow-400 transition"
                >
                    Profile
                </Link>
                <Link
                    to="/auth/login"
                    className="text-white text-lg font-medium hover:text-yellow-400 transition"
                >
                    Login
                </Link>

                {/* Cart */}
                <Link
                    to="/cart"
                    className="relative flex items-center text-white font-medium hover:text-yellow-400 transition"
                >
                    <button className="relative">
                        <LiaShoppingCartSolid className="text-3xl" />
                        <div className="absolute -top-1 -right-2 bg-yellow-500 text-xs text-white font-bold rounded-full w-5 h-5 flex items-center justify-center">
                            {cartCount}
                        </div>
                    </button>
                    <span className="hidden md:inline ml-2">Cart</span>
                </Link>
            </div>
        </nav>

    )
}

export default Navbar