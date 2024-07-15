import express from "express";
import {
  register,
  login,
  getMe,
  logout,
  requestPasswordReset,
  resetPassword,
} from "../controllers/authController";
import { authentification } from "../middleware/authentification";

export const authRouter = express.Router();

authRouter
  .post("/register", register)
  .post("/login", login)
  .post("/forgot-password", requestPasswordReset)
  .post("/reset-password/:token", resetPassword)
  .get("/userinfo", authentification, getMe)
  .post("/logout", logout);
