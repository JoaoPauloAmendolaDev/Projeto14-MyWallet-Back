import dotenv from "dotenv";
import { MongoClient, ObjectId } from "mongodb";

dotenv.config();

const MongoClient = new MongoClient(process.env.MONGO_URI);
try {
  await MongoClient.connect();
  console.log("MongoDB connected with sucess");
} catch (err) {
  console.log("error on MongoDB conection", err);
}

const db = MongoClient.db("MyWallet");
export const usersCollection = db.collection("users");
export const extractCollection = db.collection("extract");
export const sessionsCollection = db.collection("sessions");
