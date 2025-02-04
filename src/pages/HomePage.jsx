import React, { useEffect, useState } from 'react';
import banner from '../assets/Banner2.jpg';
import { Link } from 'react-router-dom';
import axios from 'axios';
const MAIN_URL = import.meta.env.VITE_MAIN_API_URL;

const HeroSection = () => {
  return (
    <div className="relative w-full h-[500px]">
      <img src={banner} alt="DineEase Banner" className="w-full h-full object-cover opacity-80" />
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50">
        <h1 className="text-5xl font-bold">Welcome to DineEase</h1>
        <p className="text-lg text-gray-300 mt-4 text-center px-6">
          Discover the best restaurants and enjoy seamless dining experiences.
        </p>
      </div>
    </div>
  )
}

const TopCategories = () => {
  return (
    <section className="container mx-auto py-12">
      <h2 className="text-3xl font-semibold text-center mb-8">Explore Categories</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 px-4">
        {['🍕 Pizza', '🍔 Burgers', '🍣 Sushi', '🍰 Desserts'].map((category, index) => (
          <div key={index} className="bg-gray-800 p-6 rounded-lg shadow-lg text-center hover:bg-gray-700 transition">
            {category}
          </div>
        ))}
      </div>
    </section>
  )
}

const TopCounters = ({ counters }) => {
  return (
    <section className="container mx-auto py-12">
      <h2 className="text-3xl font-semibold text-center mb-8">Top Counters</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
        {counters.length > 0 ? (
          counters.map(counter => (
            <Link to={`/dish/counter/${counter._id}`} key={counter._id} className="bg-gray-800 p-6 rounded-lg shadow-lg hover:bg-gray-700 transition text-center">
              {counter.name}
            </Link>
          ))
        ) : (
          <p className="text-center col-span-full text-gray-400">No counters available.</p>
        )}
      </div>
    </section>
  )
}

const TopDishes = ({ dishes }) => {
  return (
    <section className="container mx-auto py-12">
      <h2 className="text-3xl font-semibold text-center mb-8">Top Dishes</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
        {dishes.length > 0 ? (
          dishes.map(dish => (
            <div key={dish._id} className="bg-gray-800 p-6 rounded-lg shadow-lg hover:bg-gray-700 transition text-center">
              {dish.name}
            </div>
          ))
        ) : (
          <p className="text-center col-span-full text-gray-400">No dishes available.</p>
        )}
      </div>
    </section>
  )
}

const AboutSection = () => {
  return (
    <section className="container mx-auto py-12 text-center">
      <h2 className="text-3xl font-semibold mb-6">About DineEase</h2>
      <p className="text-gray-300 max-w-3xl mx-auto">
        DineEase is your go-to platform for finding the best places to eat. We connect food lovers with amazing restaurants to provide an unforgettable dining experience.
      </p>
    </section>
  )
}

const HomePage = () => {
  const [counters, setCounters] = useState([]);
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const counterRes = await axios.get(`${MAIN_URL}/counter`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setCounters(counterRes.data.slice(0, 4)); // Show top 4 counters

        const dishRes = await axios.get(`${MAIN_URL}/dish`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setDishes(dishRes.data.slice(0, 4)); // Show top 4 dishes
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-white"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      {/* Hero Section */}
      <HeroSection />

      {/* Categories Section (static) */}
      <TopCategories />

      {/* Top Counters Section */}
      <TopCounters counters={counters} />

      {/* Top Dishes Section */}
      <TopDishes dishes={dishes} />

      {/* About Section */}
      <AboutSection />

    </div>
  );
};

export default HomePage;
