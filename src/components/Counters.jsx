import React, { useEffect, useState } from 'react'
import axios from 'axios'
const MAIN_URL = import.meta.env.VITE_MAIN_API_URL;

const Counter = ({ counter }) => {
  return (
    <div className="border border-gray-200 p-4 m-4">
      <h2 className="text-lg font-bold">{counter.name}</h2>
      <p>{counter.description}</p>
    </div>
  )
}

const Counters = () => {
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
      {counters.map(counter => <Counter key={counter._id} counter={counter} />)}
    </div>
  )
}

export default Counters