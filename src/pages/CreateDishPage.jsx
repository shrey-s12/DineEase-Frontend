import React, { useState } from 'react'
import axios from "axios";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const MAIN_URL = import.meta.env.VITE_MAIN_API_URL;

const CreateDishPage = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState(0);
    const [inStock, setInStock] = useState(true);

    const counter = useSelector(state => state.counter.counter);
    const token = localStorage.getItem('token');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const dishData = {
            name,
            description,
            category,
            price,
            inStock,
            counter: counter._id
        };

        try {
            await axios.post(`${MAIN_URL}/dish`, dishData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            navigate(-1);
        } catch (error) {
            console.error("Error creating dish:", error);
        }
    }

    return (
        <div className="dark:bg-gray-900 dark:text-gray-100 min-h-screen flex items-center justify-center px-4">
            <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg w-full max-w-lg">
                <div className='flex justify-between'>
                    <h1 className="text-2xl font-bold mb-4">Create Dish</h1>
                    <h1 className="text-2xl font-bold mb-4">{counter.name}</h1>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">

                    <div>
                        <label className="block font-bold mb-1">Name:</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="w-full p-2 border rounded-md bg-gray-900 text-white"
                            placeholder="Enter Dish name"
                        />
                    </div>

                    <div>
                        <label className="block font-bold mb-1">Description:</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                            className="w-full p-2 border rounded-md bg-gray-900 text-white"
                            placeholder="Enter Dish description"
                        />
                    </div>

                    <div>
                        <label className="block font-bold mb-1">Category:</label>
                        <input
                            type="text"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            required
                            className="w-full p-2 border rounded-md bg-gray-900 text-white"
                            placeholder="Enter category"
                        />
                    </div>

                    <div>
                        <label className="block font-bold mb-1">Price:</label>
                        <input
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            required
                            className="w-full p-2 border rounded-md bg-gray-900 text-white"
                            placeholder="Enter price"
                        />
                    </div>

                    <div>
                        <label className="font-bold mb-1">In Stock:</label>
                        <input
                            type="checkbox"
                            checked={inStock}
                            onChange={(e) => setInStock(e.target.checked)}
                            className="ml-2"
                        />
                    </div>

                    <button
                        type="submit"
                        className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                    >
                        Create Dish
                    </button>

                </form>
            </div>
        </div>
    )
}

export default CreateDishPage