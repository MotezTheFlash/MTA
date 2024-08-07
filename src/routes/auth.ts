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

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     description: Register a new user with the given credentials.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: user123
 *               password:
 *                 type: string
 *                 example: pass123
 *               email:
 *                 type: string
 *                 example: user123@example.com
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Bad request, invalid input
 */
authRouter.post("/register", register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Log in
 *     description: Authenticate a user and obtain a token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: user123
 *               password:
 *                 type: string
 *                 example: pass123
 *     responses:
 *       200:
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: jwt-token-example
 *       401:
 *         description: Unauthorized, invalid credentials
 */
authRouter.post("/login", login);

/**
 * @swagger
 * /auth/forgot-password:
 *   post:
 *     summary: Request password reset
 *     description: Request a password reset link to be sent to the user's email.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: user123@example.com
 *     responses:
 *       200:
 *         description: Password reset link sent
 *       400:
 *         description: Bad request, invalid email
 */
authRouter.post("/forgot-password", requestPasswordReset);

/**
 * @swagger
 * /auth/reset-password/{token}:
 *   post:
 *     summary: Reset password
 *     description: Reset the user's password using the provided token.
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         description: The token for password reset
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               newPassword:
 *                 type: string
 *                 example: newpass123
 *     responses:
 *       200:
 *         description: Password successfully reset
 *       400:
 *         description: Bad request, invalid token or password
 */
authRouter.post("/reset-password/:token", resetPassword);

/**
 * @swagger
 * /auth/userinfo:
 *   get:
 *     summary: Get user info
 *     description: Retrieve information about the currently authenticated user.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User information retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 username:
 *                   type: string
 *                   example: user123
 *                 email:
 *                   type: string
 *                   example: user123@example.com
 *       401:
 *         description: Unauthorized, user not authenticated
 */
authRouter.get("/userinfo", authentification, getMe);

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Log out
 *     description: Log out the currently authenticated user.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User logged out successfully
 *       401:
 *         description: Unauthorized, user not authenticated
 */
authRouter.post("/logout", logout);
