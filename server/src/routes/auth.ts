import express, { Request, Response } from "express";
import { check, validationResult } from "express-validator";
import User from "../models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const router = express.Router();
router.post(
  "/ ",
  [
    check("email", "This is not a valid email").isEmail(),
    check("password", "Password should with 5 or more characters").isLength({
      min: 5,
    }),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array() });
    }

    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email: email });

      if (!user) {
        return res.status(400).json({ message: "Invalid Credentials" });
      }

      const ismatch = bcrypt.compare(password, user.password);
      if (!ismatch) {
        return res.status(400).json({ message: "Invalid Credentials" });
      }

      const token = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET_KEY as string,
        {
          expiresIn: "1d",
        }
      );
      res.cookie("auth_token",token,{
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 86400000,
      })

      res.status(200).json({userId:user._id})
    } catch (err: any) {
      console.log("This is /register error", err);
      res.status(500).send({ message: "Something went wrong" });
    }
  }
);

export default router;
