
import * as apiClient from "../api-client";
import {  useQuery } from 'react-query';
import BookingForm from '../forms/BookingForm/BookingForm';
import { useAppSeleter } from '../hooks/hooks';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react";


const Booking = () => {
    const serch = useAppSeleter((state)=> state.search);
    const {hotelId} = useParams();
    const [numberOfNights,setNumberOfNights] = useState<number>(0);
console.log("nn",numberOfNights)
    useEffect(() => {
        if(serch.checkIn && serch.checkOut){
            const diff = serch.checkOut.getTime() - serch.checkIn.getTime();
            setNumberOfNights(diff/(1000*60*60*24))
        }
    }, [])
    const {data:hotel} = useQuery("getHotelById",()=> apiClient.fetchHotelById(hotelId as string),{
        enabled:!!hotelId
    })

    console.log("hotel",hotel)
    const {data:currentUser} = useQuery("fetchCurrectUser",apiClient.fetchCurrentUser);
    
    return (
        <div className='grid md:grid-cols-[1fr_2fr]'>
           <div className='bg-blue-200'>BOOKING SUMMARY</div>
           {currentUser && (<BookingForm currentUser = {currentUser}  /> )}
           
        </div>
    )
}

export default Booking
