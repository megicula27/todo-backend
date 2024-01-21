import express from "express";
import { login, logout, register, user } from "../controllers/user.js";
import auth from "../middlewares/authentication.js";

const router = express.Router();

router.post("/login", login);
router.get("/logout", logout);
router.post("/register", register);
router.get("/me", auth, user);

export default router;
