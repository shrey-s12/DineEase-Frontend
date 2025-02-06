import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null,
    loading: true,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        removeUser: (state) => {
            state.user = null;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
    },
});

export const { setUser, removeUser, setLoading } = authSlice.actions;

export default authSlice.reducer;