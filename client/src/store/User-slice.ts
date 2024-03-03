import { PayloadAction, createSlice } from "@reduxjs/toolkit"

interface UserInitialStateInterface {
    isLogged:boolean
}

const initialState:UserInitialStateInterface = {
    isLogged:false
}

export const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
        add:(state,action:PayloadAction<UserInitialStateInterface>)=>{
            state.isLogged = action.payload.isLogged;
            return state;
        }
    }

});

export const userActions = userSlice.actions;
