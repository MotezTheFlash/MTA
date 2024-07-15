import { Response, Request, NextFunction } from "express";
import jwt, { Secret } from "jsonwebtoken";
import User from "../models/user";
import asyncHandler from "express-async-handler";
import { UnauthenticatedError } from "../errors";
import { StatusCodes } from "http-status-codes";

export const authentification = asyncHandler(
  async (req: Request | any, res: Response | any, next: NextFunction) => {
    try {
      const auth = req.headers.authorization;
      if (!auth) {
        throw new UnauthenticatedError("user is not logged in");
      }
      const accessToken = auth.split(" ")[1];
      const jwtSecret = process.env.JWT_SECRET as Secret;
      const payload = jwt.verify(accessToken, jwtSecret);
      const { userID } = payload as any;
      if (!userID) {
        throw new UnauthenticatedError("invalid token");
      }
      const user = await User.findById(userID);
      req.user = user;
      if (req.user) {
        req.user = {
          userID: req.user._id,
          username: req.user.username,
          email: req.user.email,
          role: req.user.role,
          location: req.user.location,
          phone: req.user.phone,
          avatar: req.user.avatar,
          __v: req.user.__v,
        };
      }
      next();
    } catch (error: any) {
      console.log(error);
      if (error.name === "TokenExpiredError") {
        return res.send("token expired");
      }

      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error);
    }
  }
);
