import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    username: '',
    email: '',
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.username = action.payload.username;
            state.email = action.payload.email;
        },
        logout: state => {
            state.username = '';
            state.email = '';
        },
    },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
