import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Dish from '../components/Dish';
const MAIN_URL = import.meta.env.VITE_MAIN_API_URL;

const DishesPage = () => {

  const [dishes, setDishes] = useState([]);
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem('token');

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  useEffect(() => {
    const fetchDishes = async () => {
      setLoading(true);
      try {
        const query = filter === "inStock" ? "?inStock=true" : "";
        const response = await axios.get(`${MAIN_URL}/dish${query}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setDishes(response.data);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };
    fetchDishes();
  }, [filter]);

  const updateDish = (updatedDish) => {
    setDishes((prevDishes) =>
      prevDishes.map((dish) =>
        dish._id === updatedDish._id ? updatedDish : dish
      )
    );
  };
  return (
    <div className="dark:bg-gray-900 dark:text-gray-100 py-1 min-h-screen">

      <div className='container mx-auto py-4'>
        <h1 className="text-3xl font-bold text-center mb-6">Dishes</h1>
        <div className="flex justify-center mb-4">
          <select
            className="bg-gray-800 text-white px-4 py-2 rounded-md"
            value={filter}
            onChange={handleFilterChange}
          >
            <option value="">All Dishes</option>
            <option value="inStock">In Stock</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <span className="animate-spin rounded-full h-12 w-12 border-4 border-gray-400 border-t-white"></span>
        </div>
      ) : (
        <div className="grid gap-6 px-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {dishes.length > 0 ? (
            dishes.map((dish) => (
              <Dish key={dish._id} dish={dish} updateDish={updateDish} />
            ))
          ) : (
            <p className="text-center col-span-full text-gray-400">
              No dishes available.
            </p>
          )}
        </div>
      )}

    </div>
  );
};

export default DishesPage