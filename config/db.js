import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectToDb = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("DB Connected Successfully")
    } catch (error) {
        console.log(`Error While Connecting with DB`,error.message)
    }
}

export default connectToDb ;