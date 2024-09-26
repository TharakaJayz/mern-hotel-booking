import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import userRoutes from "./routes/users";
import authRoutes from "./routes/auth";
import hotelRoutes from "./routes/my-hotel";
import cookieParser from "cookie-parser";
import hotelsRoutes  from "./routes/hotels";
import { v2 as cloudinary } from "cloudinary";
import path from "path";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string);
const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "*",
    credentials: true,
  })
);

app.use(express.static(path.join(__dirname,"../../client/dist")))

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/my-hotels", hotelRoutes);
app.use("/api/hotels",hotelsRoutes)
app.get("*", (req:Request,res:Response) =>{
    res.sendFile(path.join(__dirname,"../../client/dist/index.html"))  

    // serve files that used to testing when deploying
})

app.listen(8060, () => {
  console.log("connected 8060!");
});
