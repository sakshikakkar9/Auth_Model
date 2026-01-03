import Router from "express";
import { registerUser } from "../services/auth.service.js";
const router = Router()
app.post("/register",registerUser)
export default router