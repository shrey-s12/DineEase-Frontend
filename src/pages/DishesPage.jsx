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
    <div>
      <h1>Dishes</h1>
      <div>
        {dishes.map(dish => <Dish key={dish._id} dish={dish} updateDish={updateDish} />)}
      </div>
    </div>
  )
}

export default DishesPage