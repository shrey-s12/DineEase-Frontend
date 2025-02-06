import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom';
import Dish from './Dish';
import { useDispatch, useSelector } from 'react-redux';
import { setCounter } from '../slices/counterSlice';
const MAIN_URL = import.meta.env.VITE_MAIN_API_URL;

const DishesByCounter = () => {
    const { counterId } = useParams();

    const dispatch = useDispatch();
    const counter = useSelector(state => state.counter.counter);
    const [dishes, setDishes] = useState([]);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchDishesByCounter = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`${MAIN_URL}/dish/counter/${counterId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setDishes(response.data);
                try {
                    const counterResponse = await axios.get(`${MAIN_URL}/counter/${counterId}`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    dispatch(setCounter(counterResponse.data));
                } catch (error) {
                    console.error("Error fetching counter:", error);
                    dispatch(setCounter(null));
                }
            } catch (error) {
                console.error("Error fetching dishes:", error);
                setDishes([]);
            }
            setLoading(false);
        };
        fetchDishesByCounter();
    }, [counterId]);

    const updateDish = (updatedDish) => {
        setDishes((prevDishes) =>
            prevDishes.map((dish) =>
                dish._id === updatedDish._id ? updatedDish : dish
            )
        );
    };

    return (
        <div className="min-h-screen bg-gray-900 text-gray-100 py-8 px-4">
            {loading ? (
                <div className="flex justify-center items-center h-40">
                    <span className="animate-spin rounded-full h-12 w-12 border-4 border-gray-400 border-t-white"></span>
                </div>
            ) : (
                <>

                    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                        <div className="flex justify-between items-center mb-4">
                            <h1 className="text-2xl font-bold text-gray-200">{counter.name}</h1>
                            <Link to="/dish/create">
                                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition">
                                    Create Dish
                                </button>
                            </Link>
                        </div>
                        <div>
                            {counter.merchants.length > 1 ? (
                                <h2 className="text-lg font-semibold text-gray-300">Merchants:</h2>
                            ) : (
                                <h2 className="text-lg font-semibold text-gray-300">Merchant:</h2>
                            )}
                            {counter.merchants.length > 0 ? (
                                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 mt-2">
                                    {counter.merchants.map((merchant) => (
                                        <p
                                            key={merchant._id}
                                            className="bg-gray-700 px-3 py-1 rounded-md text-gray-300"
                                        >
                                            {merchant.name}
                                        </p>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-400 mt-2">No merchants assigned.</p>
                            )}
                        </div>
                    </div>

                    <div className="mt-6">
                        {dishes.length > 0 ? (
                            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                                {dishes.map((dish) => (
                                    <Dish key={dish._id} dish={dish} updateDish={updateDish} />
                                ))}
                            </div>
                        ) : (
                            <p className="text-center text-gray-400 text-lg">No dishes available for this counter.</p>
                        )}
                    </div>
                </>
            )}
        </div>
    );

}

export default DishesByCounter