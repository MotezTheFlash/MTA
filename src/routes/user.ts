import express from "express";
import {
  deleteUser,
  getAllUsers,
  updateUser,
} from "../controllers/userController";
export const userRouter = express.Router();
userRouter.route("/").put(updateUser).delete(deleteUser).get(getAllUsers);
