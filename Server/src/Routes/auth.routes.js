import { login, signup } from "../Contollers/auth.controller.js";
import express from "express";

const router = express.Router();

router.post("/signup", signup)
router.post("/login", login)

export default router