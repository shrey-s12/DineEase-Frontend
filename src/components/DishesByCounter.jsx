import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom';
import { addToCart, setCart } from '../slices/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
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
        disptach(addToCart(dishId));
    };

    return (
        <div className="flex border border-gray-200 p-4 m-4 w-[60%]">
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
            </div>
        </div>
    )

}

const DishesByCounter = () => {
    const { counterId } = useParams();
    const [dishes, setDishes] = useState([]);
    const [counter, setCounter] = useState("");

    useEffect(() => {
        const fetchDishesByCounter = async () => {
            try {
                const response = await axios.get(`${MAIN_URL}/dish/counter/${counterId}`);
                console.log("Dishes by counter:", response);
                setDishes(response.data);
                setCounter(response.data[0].counter);
            } catch (error) {
                console.error(error);
            }
        };
        fetchDishesByCounter();
    }, [counterId]);

    return (
        <div>
            <h1>Dishes By Counter</h1>
            <div className='flex items-center'>
                <h1>Counter Name: {counter.name} </h1>
                <h2 className='ml-5 font-bold'>Merchants:</h2>
                {counter?.merchants?.map(merchant => <p className='ml-2' key={merchant._id}>{merchant.name}</p>)}
            </div>
            {dishes.map(dish => <Dish key={dish._id} dish={dish} />)}
        </div>
    )
}

export default DishesByCounter