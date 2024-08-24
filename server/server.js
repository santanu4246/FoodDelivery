import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import cors from "cors"
import FoodCategoryRouter from "./routes/FoodCategoryRoutes.js"

const app = express()
dotenv.config()

const PORT = process.env.PORT
const MONGO_URL = process.env.MONGO_URL

app.use(express.json())
app.use(cors({
    origin: "*"
}))

app.use("/", FoodCategoryRouter)

mongoose.connect(MONGO_URL).then(() => {
    console.log("Connected to Database");
    app.listen(PORT, () => {
        console.log(`Server is running at http://localhost:${PORT}`);
    })
}).catch(() => {
    console.log("Error while connecting to database");

})

