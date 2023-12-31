import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
import dotenv from "dotenv"
import { errorHandler } from "./middlewares"
import userRouter from "./routes/user.route"
dotenv.config({
    path: "./.env"
})

const app = express();
app.use(express.json({ limit: "16KB" }))
app.use(express.urlencoded({ extended: true, limit: "16KB" }))
app.use(cookieParser())
app.use(cors({
    credentials: true,
    origin: process.env.CORS_ORIGINS!
}))


app.use("/api/v1/auth", userRouter)

app.use(errorHandler)


export default app;