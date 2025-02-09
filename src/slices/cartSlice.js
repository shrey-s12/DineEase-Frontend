import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { retryApi } from '../utils';

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
        builder.addCase(addToCart.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(addToCart.fulfilled, (state, action) => {
            state.items = action.payload;
            state.loading = false;
            toast.success("Dish added to cart! 🛒");
        });
        builder.addCase(addToCart.rejected, (state) => {
            console.log(action);
            state.loading = false;
            toast.error("Failed to add to cart! 🛒");
        });

        // ✅ Remove from Cart
        builder.addCase(removeFromCart.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(removeFromCart.fulfilled, (state, action) => {
            state.items = action.payload;
            state.loading = false;
            toast.success("Dish removed from cart! 🛒");
        });
        builder.addCase(removeFromCart.rejected, (state, action) => {
            console.log(action);
            state.loading = false;
            toast.error("Failed to remove from cart! 🛒");
        });

        // ✅ Increment Quantity
        builder.addCase(incrementQuantity.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(incrementQuantity.fulfilled, (state, action) => {
            state.items = action.payload;
            state.loading = false;
        });
        builder.addCase(incrementQuantity.rejected, (state, action) => {
            console.log(action);
            state.loading = false;
        });

        // ✅ Decrement Quantity
        builder.addCase(decrementQuantity.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(decrementQuantity.fulfilled, (state, action) => {
            state.items = action.payload;
            state.loading = false;
        });
        builder.addCase(decrementQuantity.rejected, (state, action) => {
            console.log(action);
            state.loading = false;
        });
    },
});

export const { setCart, setCartLoading } = cartSlice.actions;

export default cartSlice.reducer;


export const addToCart = createAsyncThunk('cart/addToCart', async (dishId) => {
    const response = await retryApi('post', `/cart/${dishId}`, {})
    return response;
});

export const removeFromCart = createAsyncThunk('cart/removeFromCart', async (dishId) => {
    const response = await retryApi('delete', `/cart/${dishId}`);
    return response;
});

export const incrementQuantity = createAsyncThunk('cart/incrementQuantity', async (dishId) => {
    const response = await retryApi('patch', `/cart/${dishId}`, { changeQuantity: 1 });
    return response;
});

export const decrementQuantity = createAsyncThunk('cart/decrementQuantity', async (dishId) => {
    const response = await retryApi('patch', `/cart/${dishId}`, { changeQuantity: -1 });
    return response;
});

// Note: useRetryApi is a custom React Hook because it uses useDispatch(),
// which means it can only be used inside a React component or another hook.
// However, createAsyncThunk is not a React component,
// so using useRetryApi inside it will cause the Invalid Hook Call error.