import express from "express"
const app = express();
import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT || 4000;
import cookieParser from "cookie-parser";

import taskRoute from "./routes/Task.js"
import userRouter from "./routes/User.js"

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())


import connectToDb from "./config/db.js";


connectToDb();

app.use("/api/v1/tasks", taskRoute);
app.use("/api/v1/user", userRouter);


app.listen(PORT, () => {
    console.log(`App is Listening to Port ${PORT}`)
})