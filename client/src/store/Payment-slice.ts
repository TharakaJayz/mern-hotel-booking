import { createSlice } from "@reduxjs/toolkit"
import {loadStripe,Stripe} from '@stripe/stripe-js';
const STRIPE_PUB_KEY = import.meta.env.VITE_STRIPE_PUB_KEY || "";

const stripePromise = loadStripe(STRIPE_PUB_KEY);

const initialState :{stripePromise:Promise<Stripe|null>}= {
    stripePromise:stripePromise
}

export  const paymentSlice = createSlice({
    name:"payment",
    initialState,
    reducers:{}
})


export const paymentActions = paymentSlice.actions;