import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import FoodCategoryRouter from "./routes/FoodCategoryRoutes.js";
import RestrudentRouter from "./routes/RestrudentRoutes.js";
import AdminRouter from "./routes/AdminRouter.js";
import MenuRouter from "./routes/MenuRouter.js";
import userRouter from "./routes/UserRoutes.js";
import FoodRouter from "./routes/FoodRoutes.js";
import Razorpay from "razorpay";
const app = express();
dotenv.config();

// Debug environment
console.log('Environment:', process.env.NODE_ENV);
console.log('Client URL:', process.env.CLIENT_URL);
console.log('JWT Secret exists:', !!process.env.JWT_SECRET);

const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [
      process.env.CLIENT_URL,
      "http://localhost:5173",
      "http://localhost:3000",
      "https://santanu-food-delivery.vercel.app"
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
    optionsSuccessStatus: 200
  })
);

// Serve static files from uploads directory
app.use('/uploads', express.static('uploads'));

// Debug endpoint for testing cookies
app.get('/test-cookies', (req, res) => {
  console.log('All cookies:', req.cookies);
  res.json({
    message: 'Cookie test',
    cookies: req.cookies,
    headers: req.headers.cookie
  });
});

app.use("/", AdminRouter);
app.use("/", FoodCategoryRouter);
app.use("/", RestrudentRouter);
app.use('/',MenuRouter)
app.use('/',FoodRouter)
app.use('/',userRouter)

mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("Connected to Database");
    app.listen(PORT, () => {
      console.log(`Server is running at http://localhost:${PORT}`);
    });
  })
  .catch(() => {
    console.log("Error while connecting to database");
  });
