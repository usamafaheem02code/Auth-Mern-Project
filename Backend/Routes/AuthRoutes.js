import express from "express";
import { allUser, signUp, signIn, product } from "../Controllers/AuthControllers.js";
import { signupValidation, signinValidation } from "../Middleware/validateMiddleware.js";
import authMiddleWare from "../Middleware/jwt.js";

const router = express.Router();

router.get("/", allUser);
// Protected route
router.get("/product", authMiddleWare, product);

// Validation middleware + controllers
router.post("/signup", signupValidation, signUp);
router.post("/signin", signinValidation, signIn);

export default router;
