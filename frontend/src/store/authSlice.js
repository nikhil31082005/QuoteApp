import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    token: localStorage.getItem('token') || null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setLogin: (state, action) => {
            state.token = action.payload;
            localStorage.setItem('token', action.payload);
        },
        setLogout: (state) => {
            state.token = null;
            localStorage.removeItem('token');
        },
    },
});

export const { setLogin, setLogout } = authSlice.actions;
export default authSlice.reducer;
