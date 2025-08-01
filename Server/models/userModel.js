import mongoose, { mongo, Mongoose } from "mongoose";

const userSchema = new mongoose.Schema({
  clerkID: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  photo: { type: String, required: true },
  firstName: { type: String },
  lastName: { type: String },
  creditBalance: { type: Number, default: 5 },
});

const userModel =
  mongoose.model.userSchema || mongoose.model("user", userSchema);

export default userModel;
