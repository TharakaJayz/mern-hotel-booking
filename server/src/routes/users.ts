import express, { Request, Response } from "express";
import User from "../models/user";
import jwt from "jsonwebtoken";
import { check, validationResult } from "express-validator";
const router = express.Router();

// /api/users/register

router.post(
  "/register",
  [
    check("firstName", "FirstName required!").isString(),
    check("lastName", "lastName required!").isString(),
    check("email", "Email required!").isEmail(),
    check("password", "Password Length is not enough!").isLength({ min: 5 }),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array() });
    }
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({ message: "User alredy exists" });
      }

      user = new User(req.body);
      await user.save();

      const token = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET_KEY as string,
        {
          expiresIn: "1d",
        }
      );

      res.cookie("auth_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 86400000,
      });

      res.status(200).send({ message: "user register ok" });
      
    } catch (err: any) {
    
      res.status(500).send({ message: "Something went wrong" });
    }
  }
);

export default router;
