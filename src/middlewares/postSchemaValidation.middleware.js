import Joi from "joi";

const postSchema = Joi.object({
  text: Joi.string().required().max(64).min(3),
  value: Joi.number().required(),
  type: Joi.string().required().valid("debit", "credit"),
});

export async function postSchemaValidation(req, res, next) {
  const { error } = postSchema.validate(req.body, { abortEarly: false });
  if (error) {
    const errors = error.details.map((event) => event.message);
    return res.status(422).send(errors);
  }

  next();
}
