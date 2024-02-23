import mongoose from "mongoose";
import bcrypt from "bcryptjs";
export type UserType = {
  _id: string;
  email: string;
  password: string | any;
  firstName: string;
  lastName: string;
};

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  firstName: {
    type: String,
    require: true,
  },
  lastName: {
    type: String,
    require: true,
  },
});


userSchema.pre("save", async function (next) {
  if (this.isModified("password") && typeof this.password === 'string') {
    this.password = await bcrypt.hash(this.password, 8);
  }

  next();
});


const User = mongoose.model<UserType>("User", userSchema);
export default User;
