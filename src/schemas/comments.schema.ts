import Joi from "joi";

const commentAddSchema = Joi.object({
  username: Joi.string().min(3).max(12).required().messages({
    "string.base": `'username' should be a type of 'text'`,
    "string.empty": `'username' cannot be an empty field`,
    "any.required": `missing required 'username' field`,
  }),
  email: Joi.string().email().required().messages({
    "string.base": `'email' should be a type of 'email'`,
    "string.empty": `'email' cannot be an empty field`,
    "any.required": `missing required 'email' field`,
  }),

  homepage: Joi.string().messages({
    "string.base": `'homepage' should be a type of 'text'`,
  }),
  text: Joi.string().messages({
    "string.empty": `'text' cannot be an empty field`,
    "any.required": `missing required 'text' field`,
  }),
});
export default commentAddSchema;
