import mongoose from "mongoose";
import { BookingType, HotelType } from "../shared/types";

const bookingSchema = new mongoose.Schema<BookingType>({
  firstName: {
    type: String, // booking id
    required: true, // required field
  },
  lastName: {
    type: String, // booking id ,
    required: true, // required field
  },
  email: {
    type: String, // booking id ,
    required: true, // required field
  },
  adultCount: {
    type: Number, // booking id ,
    required: true,
  },
  childCount: {
    type: Number, // booking id ,
    required: true,
  },
  checkIn: {
    type: Date, // booking id ,
    required: true,
  },
  CheckOut: {
    type: Date, // booking id ,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  totalCost: {
    type: Number, // booking id ,
    required: true,
  },
});

const hotelSchema = new mongoose.Schema<HotelType>({
  userId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  adultCount: {
    type: Number,
    required: true,
  },
  childCount: {
    type: Number,
    required: true,
  },
  facilities: [
    {
      type: String,
      required: true,
    },
  ],

  pricePerNight: {
    type: Number,
    required: true,
  },
  starRating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  imageUrls: [
    {
      type: String,
      required: true,
    },
  ],
  lastUpdated: { type: Date, required: true },
  bookings: [bookingSchema],
});

const Hotel = mongoose.model<HotelType>("Hotel", hotelSchema);
export default Hotel;
