import React, { useEffect, useState } from 'react';
import banner from '../assets/Banner2.jpg';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { StaticCategories } from '../data';
import Dish from '../components/Dish';
import Counter from '../components/Counter';
import { useSelector } from 'react-redux';
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
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleClick = () => {
    if (token) {
      navigate("/dishes");
    } else {
      navigate("/auth/login");
    }
  };

  return (
    <section className="container mx-auto py-12">
      <h2 className="text-4xl font-bold text-center mb-10">
        Explore Categories
      </h2>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-6 px-6 justify-center">
        {StaticCategories.map((category) => (
          <button
            onClick={handleClick}
            key={category._id}
            className="flex flex-col items-center gap-3 group"
          >
            {/* Rounded Image with Shadow & Hover Effect */}
            <div className="relative w-28 h-28">
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full rounded-full object-cover border-4 border-gray-300 shadow-md transition-transform duration-300 group-hover:scale-110"
              />
            </div>
            {/* Category Name */}
            <span className="text-lg font-semibold text-gray-300 group-hover:text-gray-900 transition">
              {category.name}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
};

const TopCounters = ({ counters }) => {
  return (
    <section className="container mx-auto py-12">
      <h2 className="text-3xl font-semibold text-center mb-8">Top Counters</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
        {counters.length > 0 ? (
          counters.map(counter => (
            <Link to={`/dish/counter/${counter._id}`} key={counter._id}>
              <Counter counter={counter} />
            </Link>
          ))
        ) : (
          <p className="text-center col-span-full text-gray-400">No counters available.</p>
        )}
      </div>
    </section>
  )
}

const TopDishes = ({ dishes, updateDish }) => {
  return (
    <section className="container mx-auto py-12">
      <h2 className="text-3xl font-semibold text-center mb-8">Top Dishes</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
        {dishes.length > 0 ? (
          dishes.map(dish => (
            <Dish key={dish._id} dish={dish} updateDish={updateDish} />
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
  const user = useSelector(state => state.auth.user);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        let counterRes, dishRes;

        if (user && user?.role === "Merchant") {
          counterRes = await axios.get(`${MAIN_URL}/counter/merchant/${user._id}`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          dishRes = await axios.get(`${MAIN_URL}/dish/merchant/${user._id}`, {
            headers: { Authorization: `Bearer ${token}` }
          });
        } else {
          counterRes = await axios.get(`${MAIN_URL}/counter`);
          dishRes = await axios.get(`${MAIN_URL}/dish`);
        }

        setCounters(counterRes.data.slice(0, 4));
        setDishes(dishRes.data.slice(0, 4));

      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user, token]);


  const updateDish = (updatedDish) => {
    setDishes((prevDishes) =>
      prevDishes.map((dish) =>
        dish._id === updatedDish._id ? updatedDish : dish
      )
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-white"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <HeroSection />
      <TopCategories />

      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-white"></div>
        </div>
      ) : (
        <>
          <TopCounters counters={counters} />
          <TopDishes dishes={dishes} updateDish={updateDish} />
        </>
      )}

      <AboutSection />

    </div>
  );
};

export default HomePage;
