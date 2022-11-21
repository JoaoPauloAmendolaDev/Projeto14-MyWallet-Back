import { sessionsCollection } from "../database/db.js";

export default async function sessionTest(req, res, next) {
  const  {email}  = req.headers;
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");

  if (!token || !email) {
    return res.status(401).send("wrong 123123123123123123123");
  }

  try {
    const sessionExist = await sessionsCollection.findOne({ email });
    console.log(sessionExist)

    if (!sessionExist) {
      return res.sendStatus(404);
    }

    if (sessionExist.token != token) {
      console.log(sessionExist, token)
      return res.status(433).send("wrong token");
    }

    next();
  } catch (err) {
    console.log(err);
  }
}
