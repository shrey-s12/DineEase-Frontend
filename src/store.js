import { configureStore } from '@reduxjs/toolkit';
import cartSlice from './slices/cartSlice';
import authSlice from './slices/authSlice';
import counterSlice from './slices/counterSlice';

export default configureStore({
    reducer: {
        cart: cartSlice,
        auth: authSlice,
        counter: counterSlice,
    },
})