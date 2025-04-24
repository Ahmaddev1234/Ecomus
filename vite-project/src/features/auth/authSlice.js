import {createSlice} from "@reduxjs/toolkit";

const initialState={
    isAuthenticated:false,
    user:null
}

const authSlice=createSlice({
    name:"user",
    initialState,
    reducers:{
        loginSuccess:(state,action)=>{
            state.isAuthenticated=true;
            state.user=action.payload;
            state.role=action.payload.role
        },
        logout:(state,action)=>{
            state.isAuthenticated=false;
            state.user=null;
            state.role = null;
        }
    }
})

export const {loginSuccess,logout}=authSlice.actions;
export default authSlice.reducer;