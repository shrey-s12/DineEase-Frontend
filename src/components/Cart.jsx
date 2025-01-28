import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { decrementQuantity, incrementQuantity, removeFromCart } from '../slices/cartSlice';

const Cart = ({ cart }) => {
  const dispatch = useDispatch();
  const quantity = useSelector(state => state.cart.items.find(item => item.dish._id === cart.dish._id)?.quantity);

  const handleDecrement = async (dishId) => {
    dispatch(decrementQuantity(dishId));
  };
  const handleIncrement = async (dishId) => {
    dispatch(incrementQuantity(dishId));
  };
  const removeCartItem = async (dishId) => {
    dispatch(removeFromCart(dishId));
  };

  return (
    <div className="flex flex-col border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 space-y-4 w-full max-w-md">

      <div className="flex justify-between items-center">
        <img
          src={cart.dish.image}
          alt={cart.dish.name}
          className="w-24 h-24 rounded-full object-cover"
        />
        <div className="ml-4">
          <h2 className="text-lg font-bold">{cart.dish.name}</h2>
          <p className="text-sm min-h-16 text-gray-600 dark:text-gray-400">{cart.dish.description}</p>
          <p
            className={`text-sm mt-2 ${cart.dish.inStock ? "text-green-500" : "text-red-500"}`}
          >
            {cart.dish.inStock ? "In Stock" : "Out of Stock"}
          </p>
        </div>
      </div>

      <div className='flex justify-between items-center'>
        <span className="font-bold">Price: ₹{cart.dish.price}</span>
        <span className="font-bold">Category: {cart.dish.category}</span>
      </div>

      <div className="mt-1 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => handleDecrement(cart.dish._id)}
            className={`rounded-lg px-4 py-2 ${cart.dish.inStock
              ? "bg-amber-500 text-white hover:bg-amber-600"
              : "bg-gray-400 text-gray-700 cursor-not-allowed"
              }`}
            disabled={!cart.dish.inStock}
          >
            -
          </button>
          <span>{quantity}</span>
          <button
            onClick={() => handleIncrement(cart.dish._id)}
            className={`rounded-lg px-4 py-2 ${cart.dish.inStock
              ? "bg-amber-500 text-white hover:bg-amber-600"
              : "bg-gray-400 text-gray-700 cursor-not-allowed"
              }`}
          disabled={!cart.dish.inStock}
          >
            +
          </button>
        </div>
        <button
          onClick={() => removeCartItem(cart.dish._id)}
          className="bg-red-500 text-white rounded-lg px-4 py-2 hover:bg-red-600"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default Cart