import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/mongoDB.js";
import userRouter from "./routes/userRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is alive!");
});

app.use("/api/user", userRouter);
// Connect to MongoDB
connectDB()
  .then(() => {
    console.log("MongoDB Connection Initialized");

    if (!process.env.VERCEL) {
      app.listen(PORT, () => {
        console.log(`Server is running locally on http://localhost:${PORT}`);
      });
    }
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err);
    process.exit(1);
  });

export default app;
