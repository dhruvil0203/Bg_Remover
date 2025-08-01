import mongoose from "mongoose";

const connectDB = async () => {
  try {
    if (mongoose.connection.readyState >= 1) {
      return;
    }

    mongoose.connection.on("connected", () => {
      console.log("MongoDB connected successfully");
    });

    await mongoose.connect(`${process.env.MONGODB_URI}/Bg_removal`);
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw new Error("MongoDB connection failed");
  }
};

export default connectDB;
