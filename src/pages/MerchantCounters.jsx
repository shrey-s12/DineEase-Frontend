import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import Counter from '../components/Counter';
import { setCounters } from '../slices/counterSlice';
import { useDispatch, useSelector } from 'react-redux';

const MAIN_URL = import.meta.env.VITE_MAIN_API_URL;

const MerchantCounters = () => {
    const dispatch = useDispatch();
    const counters = useSelector(state => state.counter.counters);
    const user = useSelector(state => state.auth.user);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchMerchantCounters = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`${MAIN_URL}/counter/merchant/${user._id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                dispatch(setCounters(response.data));
            } catch (error) {
                console.error(error);
            }
            setLoading(false);
        };
        fetchMerchantCounters();
    }, []);

    return (
        <div className="min-h-screen bg-gray-900 text-gray-100 py-1">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-200 flex-1 text-center">
                    My Counters
                </h1>
            </div>

            {loading ? (
                <div className="flex justify-center items-center h-40">
                    <span className="animate-spin rounded-full h-12 w-12 border-4 border-gray-400 border-t-white"></span>
                </div>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 px-4 gap-6">
                    {counters.length > 0 ? (
                        counters.map(counter => (
                            <Link to={`/dish/counter/${counter._id}`} key={counter._id}>
                                <Counter counter={counter} />
                            </Link>
                        ))
                    ) : (
                        <p className="text-center text-gray-400 col-span-full">
                            No counters available.
                        </p>
                    )}
                </div>
            )}
        </div>
    )
}

export default MerchantCounters