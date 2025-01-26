import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setCart } from '../slices/cartSlice';
const MAIN_URL = import.meta.env.VITE_MAIN_API_URL;

const Dish = ({ dish }) => {
    const disptach = useDispatch();
    const quantity = useSelector(state => state.cart.items.find(item => item.dish._id === dish._id)?.quantity);

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
        console.log("dishId", dishId);
        try {
            const response = await axios.post(`${MAIN_URL}/cart/${dishId}`);
            console.log("response", response);
            disptach(setCart(response.data));
        } catch (error) {
            console.error("Error adding dish to cart:", error);
        }
    };

    return (
        <div className="flex border border-gray-200 p-4 m-4 w-[60%]">
            <div>
                <h2 className="text-lg font-bold">{dish.name}</h2>
                <p>{dish.description}</p>
                <p>Category: {dish.category}</p>
                <p>Counter: {dish.counter.name}</p>
            </div>
            <div className='ml-auto'>
                <p className="font-bold">${dish.price}</p>
                {quantity
                    ? (<div className="flex items-center">
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
                    </div>)
                    : (<button
                        onClick={() => addCartItem(dish._id)}
                        className="bg-amber-400 p-2 hover:bg-amber-500"
                    >
                        Add to Cart
                    </button>)
                }
            </div>
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