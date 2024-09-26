import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IntialStateInterface {
  destination: string;
  checkIn: Date;
  checkOut: Date;
  adultCount: number;
  childCount: number;
  hotelId: string;
  saveSearchValues?: (
    destination: string,
    checkIn: Date,
    checkOut: Date,
    adultCount: number,
    childCount: number,
    hotelId?:string
  ) => void;
}

export  interface SaveSearchValuesReducerPayloadInterface {
    destination: string;
    checkIn: Date;
    checkOut: Date;
    adultCount: number;
    childCount: number;
    hotelId?:string
}

const initialState:IntialStateInterface = {
    destination:"",
    checkIn:new Date(),
    checkOut:new Date(),
    adultCount:0,
    childCount:0,
    hotelId:"",

}

export const searchSlice = createSlice({
    name:"Search",
    initialState,
    reducers:{
        saveSearchValues:(state,action:PayloadAction<SaveSearchValuesReducerPayloadInterface>) =>{
            state.destination = action.payload.destination;
            state.checkIn = action.payload.checkIn;
            state.checkOut = action.payload.checkOut;
            state.adultCount = action.payload.adultCount;
            state.childCount = action.payload.childCount;

            return state;
        }
    }
})

export const searchActions = searchSlice.actions;

export default searchSlice.reducer