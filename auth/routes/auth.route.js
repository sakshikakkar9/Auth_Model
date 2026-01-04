import Router from "express";
import { register } from "../controller/auth.controller.js";
const router = Router()
app.post("/register",register)
export default router