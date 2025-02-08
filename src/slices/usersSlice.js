import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    users: [],
    loading: true,
};

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setUsers: (state, action) => {
            state.users = action.payload;
            state.loading = false;
        },
        updateUser: (state, action) => {
            state.users = state.users.map((user) =>
                user._id === action.payload._id ? action.payload : user
            );
        },
        deleteUser: (state, action) => {
            state.users = state.users.filter(
                (user) => user._id !== action.payload._id
            );
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
    },
});

export const { setUsers, updateUser, deleteUser, setLoading } = usersSlice.actions;

export default usersSlice.reducer;