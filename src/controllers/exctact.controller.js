import { ObjectId } from "mongodb";
import {
  extractCollection,
  sessionsCollection,
  usersCollection,
} from "../database/db";
import { v4 as uuidV4 } from "uuid";

export async function postExctract(req, res) {
  const { date, text, value, type } = req.body;
  const user = req.user;
}
