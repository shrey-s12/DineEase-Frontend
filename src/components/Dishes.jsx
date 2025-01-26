import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setCart } from '../slices/cartSlice';
const MAIN_URL = import.meta.env.VITE_MAIN_API_URL;

const Dish = ({ dish }) => {
    const disptach = useDispatch();
    const quantity = useSelector(state => state.cart.items.find(item => item.dish._id === dish._id)?.quantity);

    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState(dish.name);
    const [description, setDescription] = useState(dish.description);
    const [category, setCategory] = useState(dish.category);
    const [price, setPrice] = useState(dish.price);
    const [inStock, setInStock] = useState(dish.inStock);

    const handleDecrement = async (dishId) => {
        try {
            const response = await axios.patch(`${MAIN_URL}/cart/${dishId}`, { changeQuantity: -1 });
            disptach(setCart(response.data));
        } catch (error) {
            console.error("Error incrementing dish quantity:", error);
        }
    };
    const handleIncrement = async (dishId) => {
        try {
            const response = await axios.patch(`${MAIN_URL}/cart/${dishId}`, { changeQuantity: 1 });
            disptach(setCart(response.data));
        } catch (error) {
            console.error("Error incrementing dish quantity:", error);
        }
    };
    const addCartItem = async (dishId) => {
        try {
            const response = await axios.post(`${MAIN_URL}/cart/${dishId}`);
            disptach(setCart(response.data));
        } catch (error) {
            console.error("Error adding dish to cart:", error);
        }
    };

    const handleEditDish = async (e, id) => {
        e.preventDefault();
        try {
            const response = await axios.put(`${MAIN_URL}/dish/${id}`, {
                name,
                description,
                category,
                price,
                inStock,
            });
            console.log("Dish updated successfully:", response.data);
            setIsEditing(false);
        } catch (error) {
            console.error("Error editing dish:", error);
        }
    };

    return (
        <div className="flex border border-gray-200 p-4 m-4 w-[60%]">
            {!isEditing ? (
                <>
                    <div>
                        <h2 className="text-lg font-bold">{dish.name}</h2>
                        <p>{dish.description}</p>
                        <p>Category: {dish.category}</p>
                        <p>Price: ${dish.price}</p>
                        <p
                            className={`text-sm ${dish.inStock ? "text-green-600" : "text-red-600"
                                }`}
                        >
                            {dish.inStock ? "In Stock" : "Out of Stock"}
                        </p>
                    </div>
                    <div className="ml-auto">
                        {quantity ? (
                            <div className="flex items-center">
                                <button
                                    onClick={() => handleDecrement(dish._id)}
                                    className="bg-amber-400 p-2 hover:bg-amber-500"
                                >
                                    -
                                </button>
                                <span className="p-2">{quantity}</span>
                                <button
                                    onClick={() => handleIncrement(dish._id)}
                                    className="bg-amber-400 p-2 hover:bg-amber-500"
                                >
                                    +
                                </button>
                            </div>
                        ) : (
                            <button
                                onClick={() => addCartItem(dish._id)}
                                className="bg-amber-400 p-2 hover:bg-amber-500"
                            >
                                Add to Cart
                            </button>
                        )}
                        <div className="p-2 mt-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md">
                            <button onClick={() => setIsEditing(true)}>Edit Dish</button>
                        </div>
                    </div>
                </>
            ) : (
                <form
                    onSubmit={(e) => handleEditDish(e, dish._id)}
                    className="flex flex-col space-y-3 w-full"
                >
                    <div>
                        <label className="block font-bold">Name:</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full p-2 border rounded-md"
                        />
                    </div>
                    <div>
                        <label className="block font-bold">Description:</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full p-2 border rounded-md"
                        />
                    </div>
                    <div>
                        <label className="block font-bold">Category:</label>
                        <input
                            type="text"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full p-2 border rounded-md"
                        />
                    </div>
                    <div>
                        <label className="block font-bold">Price:</label>
                        <input
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            className="w-full p-2 border rounded-md"
                        />
                    </div>
                    <div className="flex items-center space-x-3">
                        <label className="block font-bold">In Stock:</label>
                        <input
                            type="checkbox"
                            checked={inStock}
                            onChange={(e) => setInStock(e.target.checked)}
                        />
                    </div>
                    <div className="flex space-x-3">
                        <button
                            type="submit"
                            className="bg-green-500 p-2 text-white rounded-md hover:bg-green-600"
                        >
                            Save
                        </button>
                        <button
                            type="button"
                            onClick={() => setIsEditing(false)}
                            className="bg-red-500 p-2 text-white rounded-md hover:bg-red-600"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
};

const Dishes = () => {
    const [Dishes, setDishes] = useState([]);
    useEffect(() => {
        const fetchDishes = async () => {
            try {
                const response = await axios.get(`${MAIN_URL}/dish`);
                setDishes(response.data);
                console.log("response", response);
            } catch (error) {
                console.error(error);
            }
        };
        fetchDishes();
    }, [])
    return (
        <div>
            {Dishes.map(dish => <Dish key={dish._id} dish={dish} />)}
        </div>
    )
}

export default Dishes