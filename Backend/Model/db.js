import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const URL = process.env.mongo_url;

const userConfig = async () => {
  try {
    await mongoose.connect(URL);
    console.log("MongoDB connected");
  } catch (error) {
    console.log(error);
  }
};

export default userConfig;
