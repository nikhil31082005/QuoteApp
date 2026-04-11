import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isAuthenticated: localStorage.getItem('isAuthenticated') === 'true',
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setLogin: (state) => {
            state.isAuthenticated = true;
            localStorage.setItem('isAuthenticated', 'true');
        },
        setLogout: (state) => {
            state.isAuthenticated = false;
            localStorage.removeItem('isAuthenticated');
        },
    },
});

export const { setLogin, setLogout } = authSlice.actions;
export default authSlice.reducer;
