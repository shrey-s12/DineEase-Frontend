import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    dishes: [],
    counters: [],
    counter: null,
};

export const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        setDishes: (state, action) => {
            state.dishes = action.payload;
        },
        setCounters: (state, action) => {
            state.counters = action.payload;
        },
        setCounter: (state, action) => {
            state.counter = action.payload;
        },
    },
});

export const { setDishes, setCounters, setCounter } = counterSlice.actions;

export default counterSlice.reducer;