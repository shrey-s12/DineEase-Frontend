import React from 'react'
import { useSelector } from 'react-redux';
import Cart from '../components/Cart';

const CartPage = () => {
  const carts = useSelector(state => state.cart.items);
  return (
    <div>
      <h1>Cart Details</h1>
      <div>
        {carts.map(cart => <Cart key={cart.dish._id} cart={cart} />)}
      </div>
    </div>
  )
}

export default CartPage