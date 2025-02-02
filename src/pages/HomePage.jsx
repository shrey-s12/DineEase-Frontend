// import React, { useState, useEffect } from 'react';
// import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi2";
// import CarouselImage1 from '../assets/Banner1.jpg';
// import CarouselImage2 from '../assets/Banner2.jpg';
// import CarouselImage3 from '../assets/Banner3.jpg';

// const images = [CarouselImage1, CarouselImage2, CarouselImage3];

// const Carousel = () => {
//     const [currentIndex, setCurrentIndex] = useState(0);

//     const nextSlide = () => {
//         setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
//     };

//     const prevSlide = () => {
//         setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
//     };

//     useEffect(() => {
//         const interval = setInterval(() => {
//             nextSlide();
//         }, 5000);
//         return () => clearInterval(interval);
//     }, []);

//     return (
//         <div className="relative w-full max-w-5xl mx-auto overflow-hidden rounded-xl shadow-lg">
//             <div className="flex transition-transform duration-500 ease-in-out"
//                 style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
//                 {images.map((image, index) => (
//                     <img key={index} src={image} className="w-full object-cover" alt={`Slide ${index + 1}`} />
//                 ))}
//             </div>

//             {/* Navigation Buttons */}
//             <button onClick={prevSlide} className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black/50 p-2 rounded-full text-white hover:bg-black/70">
//                 <HiOutlineChevronLeft size={30} />
//             </button>
//             <button onClick={nextSlide} className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black/50 p-2 rounded-full text-white hover:bg-black/70">
//                 <HiOutlineChevronRight size={30} />
//             </button>

//             {/* Dots Indicator */}
//             <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
//                 {images.map((_, index) => (
//                     <button key={index} className={`w-3 h-3 rounded-full ${currentIndex === index ? 'bg-white' : 'bg-gray-500'}`} onClick={() => setCurrentIndex(index)}></button>
//                 ))}
//             </div>
//         </div>
//     );
// };

// const HomePage = () => {
//     return (
//         <div className="bg-gray-900 min-h-screen flex justify-center items-start p-4">
//             <Carousel />
//         </div>
//     );
// };

// export default HomePage;

import React, { useEffect, useState } from 'react';
import banner from '../assets/Banner2.jpg';
import { Link } from 'react-router-dom';
import axios from 'axios';

const MAIN_URL = import.meta.env.VITE_MAIN_API_URL;
const HomePage = () => {
  const [counters, setCounters] = useState([]);
  const [dishes, setDishes] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchData = async () => {
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
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      {/* Hero Section */}
      <div className="relative w-full h-[500px]">
        <img src={banner} alt="DineEase Banner" className="w-full h-full object-cover opacity-80" />
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50">
          <h1 className="text-5xl font-bold">Welcome to DineEase</h1>
          <p className="text-lg text-gray-300 mt-4 text-center px-6">
            Discover the best restaurants and enjoy seamless dining experiences.
          </p>
        </div>
      </div>

      {/* Categories Section (static) */}
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

      {/* Top Counters Section */}
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

      {/* Top Dishes Section */}
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

      {/* About Section */}
      <section className="container mx-auto py-12 text-center">
        <h2 className="text-3xl font-semibold mb-6">About DineEase</h2>
        <p className="text-gray-300 max-w-3xl mx-auto">
          DineEase is your go-to platform for finding the best places to eat. We connect food lovers with amazing restaurants to provide an unforgettable dining experience.
        </p>
      </section>

    </div>
  );
};

export default HomePage;
