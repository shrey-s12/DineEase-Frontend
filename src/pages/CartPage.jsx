import React from 'react';
import { useSelector } from 'react-redux';
import Cart from '../components/Cart';

const CartPage = () => {
  const carts = useSelector((state) => state.cart.items);
  const subTotal = carts.reduce((total, cart) => total + cart.dish.price * cart.quantity, 0);
  const deliveryCharge = 50;
  const total = subTotal + deliveryCharge;

  return (
    <div className="dark:bg-gray-900 dark:text-gray-100 min-h-screen px-4 py-6">
      <h1 className="text-3xl font-bold text-center mb-8">Cart Details</h1>

      <div className="flex flex-col lg:flex-row lg:justify-between gap-8">
        {/* Left Side: Cart Items */}
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 flex-grow">
          {carts.length > 0 ? (
            carts.map((cart) => <Cart key={cart.dish._id} cart={cart} />)
          ) : (
            <p className="text-center">Your cart is empty.</p>
          )}
        </div>

        {/* Right Side: Subtotal */}
        {carts.length > 0 && (
          <div className="bg-gray-800 text-white p-6 rounded-lg shadow-md w-full lg:w-1/3">
            <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Subtotal ({carts.length} items):</span>
                <span>₹{subTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Charge:</span>
                <span>₹{deliveryCharge.toFixed(2)}</span>
              </div>
              <hr className="border-gray-600 my-2" />
              <div className="flex justify-between font-bold text-lg">
                <span>Total:</span>
                <span>₹{total.toFixed(2)}</span>
              </div>
            </div>
            <button className="mt-6 w-full bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
