import express from "express";
import {
  deleteUser,
  getAllUsers,
  updateUser,
} from "../controllers/userController";
import { upload } from "../middleware/multer";

export const userRouter = express.Router();

/**
 * @swagger
 * /users:
 *   put:
 *     summary: Update user information
 *     description: Update user information, including profile picture.
 *     responses:
 *       200:
 *         description: User updated
 *   delete:
 *     summary: Delete a user
 *     description: Delete the user account.
 *     responses:
 *       204:
 *         description: User deleted
 *   get:
 *     summary: Get all users
 *     description: Retrieve a list of all users.
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   email:
 *                     type: string
 */
userRouter
  .route("/")
  .put(upload.single("avatar"), updateUser)
  .delete(deleteUser)
  .get(getAllUsers);
