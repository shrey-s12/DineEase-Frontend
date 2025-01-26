import { createSlice } from '@reduxjs/toolkit';

const initialState = {

};

export const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {

    },
});

export const { } = counterSlice.actions;

export default counterSlice.reducer;