import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    favourateMovies: [],
    favourateTv: []
}

export const userData = createSlice({
    name: 'userData',
    initialState,
    reducers: {
        storeUserData(state, action){
            if(action.payload.favourateMovies && action.payload.favourateTv){
                const { favourateMovies , favourateTv } = action.payload;
                state.favourateMovies = favourateMovies;
                state.favourateTv = favourateTv;
            }
        },
        clearUserData(state){
            state.favourateMovies = [];
            state.favourateTv = [];
        }
    }
})

export const { storeUserData, clearUserData } = userData.actions;

export default userData.reducer;