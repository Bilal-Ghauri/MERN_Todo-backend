import express, { Request, response, Response } from "express";
import { IUserId } from "../types/types";

const router = express.Router();
const UserModel = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middlewares/auth");

router.post("/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ msg: "These Fields are required" });
  }

  try {
    const userExist = await UserModel.findOne({ email: email });

    if (!userExist) {
      return res.status(400).json({ msg: "User with this email does not exist" });
    }

    let isValidate = await bcrypt.compare(password, userExist.password);
    if (!isValidate) {
      return res.status(400).json({ msg: "Invalid Credentials" });
    }
    const token = jwt.sign({ user: userExist._id }, process.env.JWT_AUTH);

    return res.status(200).json({ token, user: userExist });
  } catch (error) {
    return res.status(500).json({ msg: "Server Error" });
  }
});

router.post("/register", async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ msg: "These Fields are required" });
  }

  try {
    const userExist = await UserModel.findOne({ email: email });

    if (userExist) {
      return res
        .status(400)
        .json({ msg: "User with this email already Exist" });
    }

    let newUser = new UserModel({ name, email, password });

    let salt = await bcrypt.genSalt(10);

    newUser.password = await bcrypt.hash(password, salt);

    await newUser.save();
    const token = jwt.sign({ user: newUser._id }, process.env.JWT_AUTH, {
      expiresIn: "30d",
    });
    return res.status(200).json({ token, user: newUser });
  } catch (error) {
    return res.status(500).json({
      msg: "Server Error",
    });
  }
});

router.get("/getUser", auth, async (req: any, res: any) => {
  try {
    const findUser = await UserModel.findById({ _id: req.user })
    return res.status(200).json(findUser);
  } catch (error) {
    return res.status(500).json({
      msg: "Server Error",
    });
  }
});

module.exports = router;
