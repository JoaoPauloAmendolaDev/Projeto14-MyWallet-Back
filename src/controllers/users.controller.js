import { sessionsCollection, usersCollection } from "../database/db.js";
import { v4 as uuidV4 } from "uuid";
import bcrypt from "bcrypt";

export async function signUp(req, res) {
  const { password, email } = req.body;

  try {
    const cryptedPassword = bcrypt.hashSync(password, 10);

    await usersCollection.insertOne({
      ...req.body,
      password: cryptedPassword,
    });

    const token = uuidV4();
    await sessionsCollection.insertOne({ email, token });
    res.status(201).send(token);
  } catch (err) {
    console.log(err, "ERRO AQUI");
    res.sendStatus(500);
  }
}

export async function signIn(req, res) {
  const { email, password } = req.body;
  const user = res.locals.user;

  try {
    const correctPassword = bcrypt.compareSync(password, user.password);

    if (!correctPassword) {
      return res.sendStatus(400);
    }
    const token = uuidV4();
    await sessionsCollection.updateOne({ email }, { $set: { token } });
    res.status(201).send({ token, name: user.name });
  } catch (err) {
    console.log(err);
  }
}
