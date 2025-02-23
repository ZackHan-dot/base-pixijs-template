import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    username: '',
    id: null,
    avatar: '',
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.username = action.payload.username;
            state.id = action.payload.id;
            state.avatar = action.payload.avatar;
        },
        logout: state => {
            state.username = '';
            state.id = null;
            state.avatar = '';
        },
    },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
