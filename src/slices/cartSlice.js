import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
const MAIN_URL = import.meta.env.VITE_MAIN_API_URL;

const initialState = {
    items: [],
    loading: false,
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setCart: (state, action) => {
            state.items = action.payload;
        },
        setCartLoading: (state, action) => {
            state.loading = action.payload
        }
    },
    extraReducers: (builder) => {
        // ✅ Add to Cart
        builder.addCase(addToCart.fulfilled, (state, action) => {
            state.items = action.payload;
            toast.success("Dish added to cart! 🛒");
        });
        builder.addCase(addToCart.rejected, (state, action) => {
            console.log(action);
            toast.error("Failed to add to cart! 🛒");
        });

        // ✅ Remove from Cart
        builder.addCase(removeFromCart.fulfilled, (state, action) => {
            state.items = action.payload;
            toast.success("Dish removed from cart! 🛒");
        });
        builder.addCase(removeFromCart.rejected, (state, action) => {
            console.log(action);
            toast.error("Failed to remove from cart! 🛒");
        });

        // ✅ Increment Quantity
        builder.addCase(incrementQuantity.fulfilled, (state, action) => {
            state.items = action.payload;
        });
        builder.addCase(incrementQuantity.rejected, (state, action) => {
            console.log(action);
        });

        // ✅ Decrement Quantity
        builder.addCase(decrementQuantity.fulfilled, (state, action) => {
            state.items = action.payload;
        });
        builder.addCase(decrementQuantity.rejected, (state, action) => {
            console.log(action);
        });
    },
});

export const { setCart, setCartLoading } = cartSlice.actions;

export default cartSlice.reducer;


export const addToCart = createAsyncThunk('cart/addToCart', async (dishId) => {
    const token = localStorage.getItem('token');
    const response = await axios.post(`${MAIN_URL}/cart/${dishId}`, {}, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
});

export const removeFromCart = createAsyncThunk('cart/removeFromCart', async (dishId) => {
    const token = localStorage.getItem('token');
    const response = await axios.delete(`${MAIN_URL}/cart/${dishId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
});

export const incrementQuantity = createAsyncThunk('cart/incrementQuantity', async (dishId) => {
    const token = localStorage.getItem('token');
    const response = await axios.patch(`${MAIN_URL}/cart/${dishId}`, { changeQuantity: 1 }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
});

export const decrementQuantity = createAsyncThunk('cart/decrementQuantity', async (dishId) => {
    const token = localStorage.getItem('token');
    const response = await axios.patch(`${MAIN_URL}/cart/${dishId}`, { changeQuantity: -1 }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
});