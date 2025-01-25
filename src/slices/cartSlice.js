import { createSlice } from '@reduxjs/toolkit';

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
});

export const { setCart } = cartSlice.actions;

export default cartSlice.reducer;