import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Dish from '../components/Dish';
const MAIN_URL = import.meta.env.VITE_MAIN_API_URL;

const DishesPage = () => {
  const [dishes, setDishes] = useState([]);
  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const response = await axios.get(`${MAIN_URL}/dish`);
        setDishes(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchDishes();
  }, []);

  const updateDish = (updatedDish) => {
    setDishes((prevDishes) =>
      prevDishes.map((dish) =>
        dish._id === updatedDish._id ? updatedDish : dish
      )
    );
  };
  return (
    <div className="dark:bg-gray-900 dark:text-gray-100 py-1 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6">Dishes</h1>
      <div className="grid gap-6 px-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {dishes.map(dish => (
          <Dish key={dish._id} dish={dish} updateDish={updateDish} />
        ))}
      </div>
    </div>

  )
}

export default DishesPage