import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null,
    loading: false,
    error: false,
};
const namespace = 'user';
export const userSlice = createSlice({
    initialState,
    name: namespace,
    reducers: {
        loginStart: (state,action)=>{
            state.loading = true;
        },
        loginSuccess: (state,action)=>{
            state.loading = false;
            state.currentUser = action.payload;
        },
        loginFailure: (state,action)=>{
            state.loading = false;
            state.error = true;
        },
        logout: (state,action) =>{
            return initialState;
        }
    }
});

export const {loginStart, loginSuccess,loginFailure,logout} = userSlice.actions;
export default userSlice.reducer
