import mongoose from "mongoose";
import dotenv from "dotenv";
import { DB_Name } from "../constant.js";

dotenv.config({
    path: './.env'
});

const MONGO_URI = process.env.MONGO_URI;

const connectDB = async () => {
    try {
        const connectDBInstance = await mongoose.connect(`${MONGO_URI}/${DB_Name}`);
        console.log('DB connected', `${connectDBInstance.connection.host}`);
    } catch (error) {
        exit.process(1);
    }
}

export default connectDB;