import User from "../models/user";
import { StatusCodes } from "http-status-codes";
import asyncHandler from "express-async-handler";
import {
  BadRequestError,
  UnauthenticatedError,
  NotFoundError,
} from "../errors";
import { Request, Response } from "express";
export const updateUser = asyncHandler(
  async (req: Request | any, res: Response) => {
    const userID = req.user.id;
    const { email, username, password, ...rest } = req.body;
    const user = await User.findById(userID);
    if (!user) {
      throw new NotFoundError("User doesn't exist");
    }

    if (email) user.email = email;
    if (username) user.username = username;
    if (password) user.password = password;
    await user.save();

    res
      .status(StatusCodes.OK)
      .json({ message: "User updated successfully", user });
  }
);
export const deleteUser = asyncHandler(
  async (req: Request | any, res: Response) => {
    const userID = req.user.id;
    const { email, password } = req.body;
    const user = await User.findById(userID);
    if (!user) {
      throw new NotFoundError("User doesn't exist");
    }
    if (!email || !password) {
      throw new BadRequestError("Please provide your email and password");
    }

    await User.findByIdAndDelete(userID);

    res.status(StatusCodes.OK).json("The account is deleted successfully");
  }
);
export const getAllUsers = asyncHandler(async (req: Request, res: Response) => {
  const users = await User.find();
  if (!users) {
    throw new NotFoundError("No users found");
  }

  res.status(StatusCodes.OK).json({ users });
});
