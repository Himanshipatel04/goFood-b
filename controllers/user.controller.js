import { validationResult } from "express-validator";
import { User } from "../models/user.model";
import ApiError from "../utils/ApiError";
import ApiResponse from "../utils/ApiResponse";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const createUser = async (req, res) => {
  try {
    const { name, password, email, location } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const exists = await User.findOne({ $or: [{ name }, { email }] });
    if (exists) {
      return res.status(400).json(new ApiError(400, "User already exists!"));
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      password: hashedPassword,
      email,
      location,
    });
    res.status(201).json(new ApiResponse(201, "User created!", user));
  } catch (error) {
    console.log(error);
    res.status(500).json(new ApiError(500, "Error creating user", error));
  }
};

const login = async (req, res) => {
  try {
    const { name, password } = req.body;
    if (!name || name === "") {
      return res.status(400).json(new ApiError(400, "Enter username!"));
    }
    if (!password || password === "") {
      return res.status(400).json(new ApiError(400, "Enter password!"));
    }

    const user = await User.findOne({ name });
    if (!user) {
      return res.status(404).json(new ApiError(404, "User not found!"));
    }

    const isPasswordCorrect = await user.isPasswordCorrect(password);

    if (!isPasswordCorrect) {
      return res.status(401).json(new ApiError(401, "Incorrect Password!"));
    }

    const data = {
      user: {
        id: user._id,
      },
    };

    const authtoken = jwt.sign(data, process.env.JWT_SECRET);

    res
      .status(200)
      .json(
        new ApiResponse(200, "User logged in successfully!", {
          user,
          authtoken,
        })
      );

  } 
  catch (error) {
    console.log(error);
    res.status(500).json(new ApiError(500, "Error while logging in!", error));
  }
};

export { createUser, login };
