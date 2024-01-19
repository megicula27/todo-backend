import jwt from "jsonwebtoken";
import { User } from "../models/user.js";

const auth = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token)
    return res.status(404).json({
      success: false,
      message: "Login First",
    });

  const userId = jwt.verify(token, process.env.SECRET_KEY);
  req.user = await User.findById(userId);
  next();
};
export default auth;
