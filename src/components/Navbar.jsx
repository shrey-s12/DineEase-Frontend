import React from 'react'
import { Link } from 'react-router-dom'
import { LiaShoppingCartSolid } from "react-icons/lia";
import { useSelector } from 'react-redux';

const Navbar = () => {
    const cartCount = useSelector(state => state.cart.items.length);
    return (
        <nav className='flex justify-between items-center text-white bg-gray-800'>
            <Link to='/'>
                <button className="p-2 my-1 text-white font-bold text-3xl ml-5 hover:outline hover:outline-white">DineEase</button>
            </Link>
            <Link to='/counters' className="flex items-center p-1 my-1 mr-4 no-underline hover:outline hover:outline-white">
                <button>Counters</button>
            </Link>
            <Link to='/dishes' className="flex items-center p-1 my-1 mr-4 no-underline hover:outline hover:outline-white">
                <button>Dishes</button>
            </Link>
            <Link to='/profile' className="flex items-center p-1 my-1 mr-4 no-underline hover:outline hover:outline-white">
                <button>Profile</button>
            </Link>
            <Link to='/cart' className="flex items-center p-1 my-1 mr-4 no-underline hover:outline hover:outline-white" >
                <button className="relative">
                    <LiaShoppingCartSolid className="text-4xl text-white" />
                    <div className="absolute -top-1 -right-1 bg-yellow-500 text-xs text-white font-bold rounded-full w-4 h-4 flex items-center justify-center">
                        {cartCount}
                    </div>
                </button>
                <span className="hidden font-bold md:inline text-white">Cart</span>
            </Link>
        </nav>
    )
}

export default Navbar