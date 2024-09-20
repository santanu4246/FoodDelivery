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
const app = express();
dotenv.config();

const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true
  })
);

app.use("/", AdminRouter);
app.use("/", FoodCategoryRouter);
app.use("/", RestrudentRouter);
app.use('/',MenuRouter)
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
