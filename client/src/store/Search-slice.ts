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
    destination: sessionStorage.getItem("destination") || "",
    checkIn: new Date(sessionStorage.getItem("checkIn")|| new Date().toISOString()),
    checkOut:new Date(sessionStorage.getItem("checkOut") ||  new Date().toISOString()),
    adultCount: parseInt(sessionStorage.getItem("adultCount")|| "1") ,
    childCount: parseInt(sessionStorage.getItem("childCount") || "0") ,
    hotelId: sessionStorage.getItem("hotelId") ||"",

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
            state.hotelId = action.payload.hotelId || ""

            sessionStorage.setItem("destination",action.payload.destination)
            sessionStorage.setItem("checkIn",action.payload.checkIn.toISOString())
            sessionStorage.setItem("checkOut",action.payload.checkOut.toISOString())
            sessionStorage.setItem("adultCount",action.payload.adultCount.toString())
            sessionStorage.setItem("childCount",action.payload.childCount.toString())
            sessionStorage.setItem("hotelId",action.payload.hotelId || "")

            return state;
        }
    }
})

export const searchActions = searchSlice.actions;

export default searchSlice.reducer