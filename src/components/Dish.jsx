import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, decrementQuantity, incrementQuantity } from '../slices/cartSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useRetryApi } from '../hooks';

const Dish = ({ dish, updateDish }) => {
    const user = useSelector(state => state.auth.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const quantity = useSelector(state => state.cart.items.find(item => item.dish._id === dish._id)?.quantity);

    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState(dish.name);
    const [description, setDescription] = useState(dish.description);
    const [category, setCategory] = useState(dish.category);
    const [price, setPrice] = useState(dish.price);
    const [inStock, setInStock] = useState(dish.inStock);
    const [loadingDish, setLoadingDish] = useState(false);
    const retryPutApi = useRetryApi('put');

    const handleDecrement = async (dishId) => {
        setLoadingDish(true);
        await dispatch(decrementQuantity(dishId));
        setLoadingDish(false);
    };

    const handleIncrement = async (dishId) => {
        setLoadingDish(true);
        console.log("shreys12")
        await dispatch(incrementQuantity(dishId));
        setLoadingDish(false);
    };

    const addCartItem = async (dishId) => {
        setLoadingDish(true);
        await dispatch(addToCart(dishId));
        setLoadingDish(false);
    };


    const handleEditDish = async (e, id) => {
        e.preventDefault();
        const dishData = { name, description, category, price, inStock };
        try {
            const response = await retryPutApi(`/dish/${id}`, dishData);
            updateDish(response);
            toast.success("Dish updated successfully");
            setIsEditing(false);
        } catch (error) {
            console.error("Error editing dish:", error);
            toast.error("Error editing dish");
        }
    };

    return (
        <div className="flex flex-col border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 space-y-4 w-full max-w-md">
            {!isEditing ? (
                <>
                    <div className="flex justify-between items-center">
                        <img
                            src={dish.image}
                            alt={dish.name}
                            className="w-24 h-24 rounded-full object-cover"
                        />
                        <div className="ml-4">
                            <h2 className="text-lg font-bold">{dish.name}</h2>
                            <p className="text-sm min-h-16 text-gray-600 dark:text-gray-400">{dish.description}</p>
                            <p
                                className={`text-sm mt-2 ${dish.inStock ? "text-green-500" : "text-red-500"}`}
                            >
                                {dish.inStock ? "In Stock" : "Out of Stock"}
                            </p>
                        </div>
                    </div>
                    <div className='mb-1'>
                        <span className='font-bold'>Counter: </span>
                        <span>{dish.counter.name}</span>
                    </div>
                    <div className='flex justify-between items-center'>
                        <span className="font-bold">Price: ₹{dish.price}</span>
                        <span className="font-bold">Category: {dish.category}</span>
                    </div>
                    <div className="mt-1 flex justify-between items-center">
                        {/* No user */}
                        {!user && (
                            <button
                                onClick={() => navigate("/auth/login")}
                                className={`rounded-lg px-4 py-2 ${dish.inStock
                                    ? "bg-amber-500 text-white hover:bg-amber-600"
                                    : "bg-gray-400 text-gray-700 cursor-not-allowed"
                                    }`}
                                disabled={!dish.inStock}
                            >
                                Add to Cart
                            </button>
                        )}

                        {/* user role === Customer */}
                        {user?.role === "Customer" && (
                            quantity ? (
                                <div className="flex items-center space-x-2">
                                    <button
                                        onClick={() => handleDecrement(dish._id)}
                                        className={`rounded-lg px-4 py-2 ${dish.inStock && !loadingDish
                                            ? "bg-amber-500 text-white hover:bg-amber-600"
                                            : "bg-gray-400 text-gray-700 cursor-not-allowed"
                                            }`}
                                        disabled={!dish.inStock || loadingDish}
                                    >
                                        -
                                    </button>

                                    {loadingDish ? (
                                        <span className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></span>
                                    ) : (
                                        <span className="text-lg font-bold">{quantity}</span>
                                    )}

                                    <button
                                        onClick={() => handleIncrement(dish._id)}
                                        className={`rounded-lg px-4 py-2 ${dish.inStock && !loadingDish
                                            ? "bg-amber-500 text-white hover:bg-amber-600"
                                            : "bg-gray-400 text-gray-700 cursor-not-allowed"
                                            }`}
                                        disabled={!dish.inStock || loadingDish}
                                    >
                                        +
                                    </button>
                                </div>
                            ) : (
                                <button
                                    onClick={() => addCartItem(dish._id)}
                                    className={`rounded-lg px-4 py-2 flex items-center justify-center space-x-2 transition-all duration-300 ${dish.inStock && !loadingDish
                                        ? "bg-amber-500 text-white hover:bg-amber-600"
                                        : "bg-gray-400 text-gray-700 cursor-not-allowed"
                                        }`}
                                    disabled={!dish.inStock || loadingDish}
                                >
                                    {loadingDish ? (
                                        <>
                                            <span className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></span>
                                            <span className="ml-2">Adding...</span>
                                        </>
                                    ) : (
                                        "Add to Cart"
                                    )}
                                </button>
                            )
                        )}

                        {/* user role === Merchant */}
                        {user?.role === "Merchant" && (
                            <button
                                onClick={() => setIsEditing(true)}
                                className="bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600"
                            >
                                Edit Dish
                            </button>
                        )}
                    </div>
                </>
            ) : (
                <form
                    onSubmit={(e) => handleEditDish(e, dish._id)}
                    className="flex flex-col space-y-4"
                >
                    <div>
                        <label className="block font-bold">Name:</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-100 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block font-bold">Description:</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-100 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block font-bold">Category:</label>
                        <input
                            type="text"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-100 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block font-bold">Price:</label>
                        <input
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-100 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="flex items-center space-x-3">
                        <label className="block font-bold">In Stock:</label>
                        <input
                            type="checkbox"
                            checked={inStock}
                            onChange={(e) => setInStock(e.target.checked)}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-600"
                        />
                    </div>
                    <div className="flex space-x-4">
                        <button
                            type="submit"
                            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                        >
                            Save
                        </button>
                        <button
                            type="button"
                            onClick={() => setIsEditing(false)}
                            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            )}
        </div >

    );
};

export default Dish