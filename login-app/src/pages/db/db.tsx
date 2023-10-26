import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export default async function DbConnect() {
  const connect = process.env.MONDODB_URL as string;
  console.log(connect);

  try {
    await mongoose.connect(connect);
    console.log("Connected to Mongodb");
  } catch (error) {
    console.log(error);
  }
}
