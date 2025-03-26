import express from "express";
import dotenv from "dotenv";
import { connectDB } from "../db/db.js";
import userRouter from '../routes/user.route.js';
import messageRouter from '../routes/message.route.js'
import cookieParser from "cookie-parser";
import cors from "cors";
const app = express();
const PORT = process.env.PORT || 8080;

dotenv.config();
app.use(express.json());
app.use(cookieParser()); 
app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true
    })
);

//apis
app.use('/api/v1/auth', userRouter);
app.use('/api/v1/message', messageRouter);

app.listen(PORT, () => {
    connectDB()
    console.log(`app is listening on PORT: ${PORT}`);
});