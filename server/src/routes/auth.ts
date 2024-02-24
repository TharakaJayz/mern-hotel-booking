import express, { Request, Response } from "express"
import { check, validationResult } from "express-validator";
import User from "../models/user";
import bcrypt from "bcryptjs";
const router = express.Router();
router.post("",[ check("email","This is not a valid email").isEmail(),check("password","Password should with 5 or more characters").isLength({min:5})], async (req:Request,res:Response)=>{
    const errors  = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({message:errors.array()});
    }

    const {email,password} = req.body;

    try{

        const user = await User.findOne({email:email});
        
        if(!user){
            return res.status(400).json({message:"Invalid Credentials"});
        }

        const ismatch = bcrypt.compare(password,user.password);
        if(!ismatch){
            return res.status(400).json({message:"Invalid Credentials"});
        }

    }catch (err: any) {
    console.log("This is /register error", err);
    res.status(500).send({ message: "Something went wrong" });
  }


} )


export default router;