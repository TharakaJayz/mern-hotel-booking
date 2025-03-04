import express, { Request, Response } from "express";
import { body } from "express-validator";
import verifyToken from '../middleware/auth';
import Hotel from "../models/hotel";
import { HotelType } from "../shared/types";

const router = express.Router();

router.get("/",verifyToken,async(req:Request,res:Response)=>{
    try {
        const hotels  = await Hotel.find({
            bookings:{$elemMatch:{userId:req.userId}} // filter hotels that have bookings with userId
        });
        const results = hotels.map((hotel)=>{
            const userBookings = hotel.bookings.filter((booking)=>{
                return booking.userId === req.userId;
            });

            const hotelsWithUserBookings:HotelType = {
                ...hotel.toObject(), // convert mongoose object to JS object
                bookings:userBookings
            }

            return hotelsWithUserBookings;
        });

        res.status(200).send(results);
    } catch (error) {
        console.log("error when fetching bookings",error);
        res.status(500).json({message:"Unable to fetch bookings"});
    }
})


export default router;