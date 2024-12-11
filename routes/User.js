import express from "express";
import { register, login, logout } from "../controllers/User.js";
const router = express.Router();
import { body } from "express-validator";

router.post("/register", [
    body("fullName").notEmpty().withMessage("Full Name Is Required"),
    body("email").notEmpty().withMessage("Email Is Required").isEmail().withMessage("Must be a valid Email"),
    body("password").notEmpty().withMessage("Password Is Required").isLength({ min: 6 })
], register)

router.post("/login", [
    body("email").notEmpty().withMessage("Email Is Required").isEmail().withMessage("Must be a valid Email"),
    body("password").notEmpty().withMessage("Password Is Required")
], login);

router.get("/logout", logout)



export default router;