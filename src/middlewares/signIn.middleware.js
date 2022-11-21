import Joi from "joi";
import { usersCollection } from "../database/db.js";

const userSchema = Joi.object({
  email: Joi.string().required().email(),
  password: Joi.string().required().min(3),
});

export default async function signInMiddleware(req, res, next) {
  const { email, password } = req.body;

  const { error } = userSchema.validate(
    { email, password },
    { abortEarly: false }
  );

  if (error) {
    const errors = error.map((event) => event.message);
    return res.status(422).send(errors);
  }
  try {
    const verifyUser = await usersCollection.findOne({ email });

    if (!verifyUser) {
      return res.sendStatus(404);
    }

    res.locals.user = verifyUser;
    next();
  } catch (err) {
    return res.sendStatus(500, err);
  }
}
