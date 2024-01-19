import express from "express";
import { login, logout, register } from "../controllers/user.js";

const router = express.Router();

router.post("/login", login);
router.get("/logout", logout);
router.post("/register", register);

export default router;
