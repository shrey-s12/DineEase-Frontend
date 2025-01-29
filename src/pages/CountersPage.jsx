import React, { useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Counter from '../components/Counter';
import { setCounters } from '../slices/counterSlice';
import { useDispatch, useSelector } from 'react-redux';

const MAIN_URL = import.meta.env.VITE_MAIN_API_URL;

const CountersPage = () => {
    const dispatch = useDispatch();
    const counters = useSelector(state => state.counter.counters);

    useEffect(() => {
        const fetchCounters = async () => {
            try {
                const response = await axios.get(`${MAIN_URL}/counter`);
                dispatch(setCounters(response.data));
            } catch (error) {
                console.error(error);
            }
        };
        fetchCounters();
    }, []);

    return (
        <div className="min-h-screen bg-gray-900 text-gray-100 py-1">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-200 flex-1 text-center">
                    Counters
                </h1>
                <Link to="/dish/counter/create">
                    <button className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-700 transition">
                        Create Counter
                    </button>
                </Link>
            </div>

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
        </div>
    );

};

export default CountersPage;
