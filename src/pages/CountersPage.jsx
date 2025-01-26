import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Counter from '../components/Counter';
const MAIN_URL = import.meta.env.VITE_MAIN_API_URL;

const CountersPage = () => {
    const [counters, setCounters] = useState([]);
    useEffect(() => {
        const fetchCounters = async () => {
            try {
                const response = await axios.get(`${MAIN_URL}/counter`);
                setCounters(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchCounters();
    }, [])

    return (
        <div>
            <h1>Counters</h1>
            <div>
                {counters.map(counter => (
                    <Link to={`/dish/counter/${counter._id}`} key={counter._id}>
                        <Counter counter={counter} />
                    </Link>
                )
                )}
            </div>
        </div>
    )
}

export default CountersPage