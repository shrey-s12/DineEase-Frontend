import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
const MAIN_URL = import.meta.env.VITE_MAIN_API_URL;

const token = localStorage.getItem('token');

const initialState = {
    items: [],
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setCart: (state, action) => {
            state.items = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(addToCart.fulfilled, (state, action) => {
            state.items = action.payload;
        });
        builder.addCase(addToCart.rejected, (state, action) => {
            console.log(action);
        });
        builder.addCase(removeFromCart.fulfilled, (state, action) => {
            state.items = action.payload;
        });
        builder.addCase(removeFromCart.rejected, (state, action) => {
            console.log(action);
        });
        builder.addCase(incrementQuantity.fulfilled, (state, action) => {
            state.items = action.payload;
        });
        builder.addCase(incrementQuantity.rejected, (state, action) => {
            console.log(action);
        });
        builder.addCase(decrementQuantity.fulfilled, (state, action) => {
            state.items = action.payload;
        });
        builder.addCase(decrementQuantity.rejected, (state, action) => {
            console.log(action);
        });
    },
});

export const { setCart } = cartSlice.actions;

export default cartSlice.reducer;

export const addToCart = createAsyncThunk('cart/addToCart', async (dishId) => {
    const response = await axios.post(`${MAIN_URL}/cart/${dishId}`, {}, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
});

export const removeFromCart = createAsyncThunk('cart/removeFromCart', async (dishId) => {
    const response = await axios.delete(`${MAIN_URL}/cart/${dishId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
});

export const incrementQuantity = createAsyncThunk('cart/incrementQuantity', async (dishId) => {
    const response = await axios.patch(`${MAIN_URL}/cart/${dishId}`, { changeQuantity: 1 }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
});

export const decrementQuantity = createAsyncThunk('cart/decrementQuantity', async (dishId) => {
    const response = await axios.patch(`${MAIN_URL}/cart/${dishId}`, { changeQuantity: -1 }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
});