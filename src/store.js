import { configureStore } from '@reduxjs/toolkit';
import cartSlice from './slices/cartSlice';
import authSlice from './slices/authSlice';

export default configureStore({
    reducer: {
        cart: cartSlice,
        auth: authSlice
    },
})