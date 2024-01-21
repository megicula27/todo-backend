import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import sendCookie from "../utils/handleCookie.js";
import errorHandler from "../middlewares/error.js";

export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    let user = await User.findOne({ email });
    if (user) {
      next(new errorHandler("User Already Registered", 403));
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    sendCookie(user, res, "User Created successfully", 201);
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      next(new errorHandler("Please Register First", 404));
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      next(new errorHandler("Invalid Credentials!", 404));
    }

    sendCookie(user, res, `Welcome back ${user.name}`, 200);
  } catch (err) {
    next(err);
  }
};

export const logout = (req, res) => {
  res
    .status(200)
    .cookie("token", "", {
      expires: new Date(Date.now()),
      sameSite: process.env.NODE_ENV === "Develpoment" ? "lax" : "none",
      secure: process.env.NODE_ENV === "Develpoment" ? false : true,
    })
    .json({
      success: true,
      user: req.user,
    });
};
export const user = (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
};
