import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { decrementQuantity, incrementQuantity, removeFromCart } from '../slices/cartSlice';

const Cart = ({ cart }) => {
  const disptach = useDispatch();
  const quantity = useSelector(state => state.cart.items.find(item => item.dish._id === cart.dish._id)?.quantity);

  const handleDecrement = async (dishId) => {
    disptach(decrementQuantity(dishId));
  };
  const handleIncrement = async (dishId) => {
    disptach(incrementQuantity(dishId));
  };
  const removeCartItem = async (dishId) => {
    disptach(removeFromCart(dishId));
  };

  return (
    <div className="flex flex-col md:flex-row justify-between items-center p-4 m-5 bg-gray-50 shadow-md rounded-lg w-full md:w-[60%]">
      {/* Dish Details */}
      <div className="flex-1 space-y-2">
        <p className="font-bold text-lg text-gray-700">{cart.dish.name}</p>
        <p className="text-sm text-gray-500">Category: {cart.dish.category}</p>
        <p className="text-sm text-gray-500">Price: ₹{cart.dish.price}</p>
        <p className={`text-sm ${cart.dish.inStock ? 'text-green-600' : 'text-red-600'}`}>
          {cart.dish.inStock ? 'In Stock' : 'Out of Stock'}
        </p>

        {/* Quantity Controls */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => handleDecrement(cart.dish._id)}
            className="bg-amber-400 px-3 py-1 rounded-md hover:bg-amber-500 text-white font-medium"
          >
            -
          </button>
          <span className="px-4 py-1 border rounded-md text-gray-700">{quantity}</span>
          <button
            onClick={() => handleIncrement(cart.dish._id)}
            className="bg-amber-400 px-3 py-1 rounded-md hover:bg-amber-500 text-white font-medium"
          >
            +
          </button>
        </div>
      </div>

      {/* Remove Button */}
      <button
        onClick={() => removeCartItem(cart.dish._id)}
        className="mt-4 md:mt-0 md:ml-4 bg-red-500 px-4 py-2 text-white font-bold rounded-lg hover:bg-red-600 transition"
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