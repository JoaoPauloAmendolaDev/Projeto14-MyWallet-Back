import { ObjectId } from "mongodb";
import {
  extractCollection,
  sessionsCollection,
  usersCollection,
} from "../database/db.js";
import { v4 as uuidV4 } from "uuid";
import dayjs from "dayjs";

export async function postExtract(req, res) {
  const day = dayjs().format("DD");
  const month = dayjs().format("MM");
  const { email } = req.headers;
  console.log(req.body);

  try {
    await extractCollection.insertOne({ ...req.body, day, month, email });
    res.status(201).send("Adicionado com sucesso");
  } catch (err) {
    res.status(500).send(err);
  }
}

export async function getExtract(req, res) {
  const { email } = req.body;

  try {
    const month = dayjs().format("MM");
    const extract = await extractCollection?.find({ email }).toArray();
    const thisMonthExtract = extract.filter((e) => e.month === month);
    console.log(thisMonthExtract);
    res.status(200).send(extract);
  } catch (err) {
    console.log(err);
  }
}
