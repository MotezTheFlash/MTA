import User from "../models/user";
import { StatusCodes } from "http-status-codes";
import asyncHandler from "express-async-handler";
import nodemailer from "nodemailer";
import {
  BadRequestError,
  UnauthenticatedError,
  NotFoundError,
} from "../errors";
import { Request, Response } from "express";

const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
});
export const getMe = asyncHandler(async (req: Request | any, res: Response) => {
  const user = req.user;
  if (!user) {
    throw new NotFoundError("User doesn't exist");
  }
  res.json(user);
});

interface LoginInput {
  email: string;
  password: string;
}

export const register = asyncHandler(
  async (req: Request | any, res: Response) => {
    const { username, email, password, location, role, phone } = req.body;
    if (!email || !password || !username || !phone) {
      throw new BadRequestError("provide credentials");
    }
    const duplicate = await User.findOne({ email });
    if (duplicate) {
      throw new BadRequestError("user with this email already exists");
    } else {
      const user = await User.create({
        email,
        password,
        username,
        location,
        phone,
        role,
      });
      res.status(StatusCodes.CREATED).json(user);
    }
  }
);

export const login = asyncHandler(
  async (req: Request<unknown, unknown, LoginInput>, res: Response) => {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new BadRequestError("provide credentials");
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      throw new BadRequestError("User doesn't exist, please check email");
    } else {
      const match = await user?.comparePassword(password);
      if (match === false) {
        throw new UnauthenticatedError("permission denied");
      }

      const token = user?.generateToken();
      const cookieOptions = {
        expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      };
      res.cookie("token", token, cookieOptions);
      res
        .status(StatusCodes.OK)
        .json({ messsage: "user logged in successfully", user, token });
    }
  }
);
export const logout = asyncHandler(
  async (req: Request | any, res: Response) => {
    res.clearCookie("token");
    res.status(StatusCodes.OK).json({ message: "Logout successful" });
  }
);

export const requestPasswordReset = asyncHandler(
  async (req: Request | any, res: Response) => {
    const { email } = req.body;

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      throw new BadRequestError("User doesn't exist");
    }
    const token = user?.generateToken();

    user.resetToken = token;
    user.resetTokenExpires = new Date(Date.now() + 30 * 60 * 1000);
    await user.save();
    const resetLink = `http://localhost:3000/reset/${token}`;

    const mailOptions = {
      from: "mta@gmail.com",
      to: user.email,
      subject: "Password Reset",
      html: `<p>Please click the following link to reset your password:</p><a href="${resetLink}">${resetLink}</a>`,
    };

    await transporter.sendMail(mailOptions);

    res.json({ message: "Password reset link sent", user });
  }
);
export const resetPassword = asyncHandler(
  async (req: Request, res: Response) => {
    const { password } = req.body;
    const { token }: any = req.params;
    const user = await User.findOne({
      resetToken: token,
      resetTokenExpires: { $gte: new Date(Date.now()) },
    });
    if (!user) {
      throw new UnauthenticatedError("Invalid or expired token");
    }
    user.password = password;
    user.resetToken = "";
    user.resetTokenExpires = new Date(0);
    await user.save();

    res.status(StatusCodes.OK).json({ message: "Password reset successful" });
  }
);
