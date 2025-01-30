import React, { useState, useEffect } from "react";
import axios from "axios";

const MAIN_URL = import.meta.env.VITE_MAIN_API_URL;

const CreateCounterPage = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [merchants, setMerchants] = useState([]);
    const [selectedMerchants, setSelectedMerchants] = useState([]);

    const token = localStorage.getItem("token");
    useEffect(() => {
        const fetchMerchants = async () => {
            try {
                const response = await axios.get(`${MAIN_URL}/user/merchants`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setMerchants(response.data);
                console.log(response);
            } catch (error) {
                console.error("Error fetching merchants:", error);
            }
        };
        fetchMerchants();
    }, []);

    // Handle checkbox selection
    const handleMerchantSelect = (merchantId) => {
        if (selectedMerchants.includes(merchantId)) {
            setSelectedMerchants(selectedMerchants.filter((id) => id !== merchantId));
        } else {
            setSelectedMerchants([...selectedMerchants, merchantId]);
        }
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        const counterData = {
            name,
            description,
            merchants: selectedMerchants,
        };

        try {
            await axios.post(`${MAIN_URL}/counter`, counterData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
        } catch (error) {
            console.error("Error creating counter:", error);
        }
    };

    return (
        <div className="dark:bg-gray-900 dark:text-gray-100 min-h-screen flex items-center justify-center px-4">
            <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg w-full max-w-lg">
                <h1 className="text-2xl font-bold mb-4">Create Counter</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Name Field */}
                    <div>
                        <label className="block font-bold mb-1">Name:</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="w-full p-2 border rounded-md bg-gray-900 text-white"
                            placeholder="Enter counter name"
                        />
                    </div>

                    {/* Description Field */}
                    <div>
                        <label className="block font-bold mb-1">Description:</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                            className="w-full p-2 border rounded-md bg-gray-900 text-white"
                            placeholder="Enter counter description"
                        />
                    </div>

                    {/* Merchants Dropdown and Checkbox */}
                    <div>
                        <label className="block font-bold mb-1">Select Merchants:</label>
                        {merchants.length > 0 ? (
                            <div className="space-y-2">
                                {merchants.map((merchant) => (
                                    <div key={merchant._id} className="flex items-center">
                                        <input
                                            type="checkbox"
                                            id={merchant._id}
                                            value={merchant._id}
                                            onChange={() => handleMerchantSelect(merchant._id)}
                                            checked={selectedMerchants.includes(merchant._id)}
                                            className="mr-2"
                                        />
                                        <label htmlFor={merchant._id}>{merchant.name}</label>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p>No merchants available.</p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                    >
                        Create Counter
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateCounterPage;
