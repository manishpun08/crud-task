import * as Yup from "yup";
import { registerUserValidation } from "./user.validation.js";

export const userValidationSchema = async (req, res, next) => {
  const newUser = req.body;
  try {
    const validatedData = await registerUserValidation.validate(newUser);
    req.body = validatedData;
  } catch (error) {
    return res.status(400).send({ message: error.message });
  }
  next();
};
