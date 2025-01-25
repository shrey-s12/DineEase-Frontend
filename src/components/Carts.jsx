import axios from 'axios';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setCart } from '../slices/cartSlice';
const MAIN_URL = import.meta.env.VITE_MAIN_API_URL;

const Cart = ({ cart }) => {
  const disptach = useDispatch();
  const removeCartItem = async (dishId) => {
    try {
      const response = await axios.delete(`${MAIN_URL}/cart/${dishId}`);
      disptach(setCart(response.data));
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  return (
    <div className="flex justify-between items-center p-2 m-5 bg-gray-100 w-[40%]">
      <div>
        <p className="font-bold">{cart.dish.name}</p>
        <p>{cart.dish.category}</p>
        <p>{cart.dish.price}</p>
        <p>{cart.dish.inStock}</p>
        <p>Quantity: {cart.quantity}</p>
      </div>
      <button
        onClick={() => removeCartItem(cart.dish._id)} // Pass dish ID to the remove handler
        className="p-2 bg-red-500 text-white font-bold"
      >
        Remove
      </button>
    </div>
  );
};

const Carts = () => {
  const carts = useSelector(state => state.cart.items);
  return (
    <div>
      {carts.map(cart => <Cart key={cart.dish._id} cart={cart} />)}
    </div>
  )
}

export default Carts