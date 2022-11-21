import Joi from "joi";
import { usersCollection } from "../database/db.js";

const userSchema = Joi.object({
  name: Joi.string().required().min(3),
  email: Joi.string().required().email(),
  password: Joi.string().required().min(3),
});

export default async function ValidateSignUp(req, res, next) {
  const { name, email, password } = req.body;

  const { error } = userSchema.validate(req.body, { abortEarly: false });

  if (error) {
    const errors = error.details.map((event) => event.message);
    return res.status(422).send(errors);
  }

  try {
    const existUser = await usersCollection.findOne({
      $or: [{ email }, { name }],
    });
    if (existUser) {
      return res.status(409).send("email/nome já cadastrado");
    }

    next();
  } catch (err) {
    res.status(500).send(err);
  }
}
