import express from "express";
import { userValidationSchema } from "./user.middleware.js";
import { User } from "./user.model.js";
import * as bcrypt from "bcrypt";
import { loginUserValidation } from "./user.validation.js";
import jwt from "jsonwebtoken";

const router = express.Router();

// create user
router.post(
  "/user/register",

  // validating data
  userValidationSchema,
  // register  user
  async (req, res) => {
    const newUser = req.body;
    // find user email
    const user = await User.findOne({ email: newUser.email });

    // if user throw error
    if (user) {
      return res
        .status(409)
        .send({ message: "User with this email already exists." });
    }
    // hash password using bcrypt
    const hashedPassword = await bcrypt.hash(newUser.password, 10);
    newUser.password = hashedPassword;

    // create user
    await User.create(newUser);
    return res
      .status(201)
      .send({ message: "User is registered successfully." });
  }
);

// login user
router.post(
  "/user/login",
  // validation
  async (req, res, next) => {
    // extract login credentials from req.body
    const loginCredentials = req.body;

    //validate data
    try {
      const validatedData = await loginUserValidation.validate(
        loginCredentials
      );
      req.body = validatedData;
      next();
    } catch (error) {
      return res.status(400).send({ message: error.message });
    }
  },

  // for login
  async (req, res) => {
    // extract login credentials from req.body
    const loginCredentials = req.body;
    // find user using email
    const user = await User.findOne({ email: loginCredentials.email });

    // if no user, throw error
    if (!user) {
      return res.status(400).send({ message: "Invalid Credentials" });
    }
    // check for password match
    const isPassword = await bcrypt.compare(
      loginCredentials.password,
      user.password
    );
    // if password not match, throw error
    if (!isPassword) {
      return res.status(400).send({ message: "Invalid Credentials" });
    }
    // password not exposed
    user.password = undefined;
    // generate token
    const payload = { userId: user._id };
    const token = jwt.sign(payload, "hello", {
      expiresIn: "5h",
    });
    // send response
    return res.status(200).send({
      message: "User is logged in successfully.",
      user: user,
      token: token,
    });
  }
);

export default router;
