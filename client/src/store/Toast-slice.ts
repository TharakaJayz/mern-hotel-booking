import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface InitialStateInterface {
  message: string;
  type: "SUCCESS" | "ERROR" | string ;
}

export  interface AddReducerPayloadInterface {
    message: string;
    type: "SUCCESS" | "ERROR" | string;
}

const initialState: InitialStateInterface = {
  message: "",
  type: "",
};

export const toastSlice = createSlice({
  name: "Toast",
  initialState,
  reducers: {
    add:(state,action:PayloadAction<AddReducerPayloadInterface>) =>{
        state = action.payload;
        
        return state;
    }
  },
});

export const toastActions = toastSlice.actions;

export default toastSlice.reducer;
