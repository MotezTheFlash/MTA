import { Response, Request, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";

export const isAdmin = (
  req: Request | any,
  res: Response,
  next: NextFunction
) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    return res
      .status(StatusCodes.FORBIDDEN)
      .json({ message: "Access denied, admin only" });
  }
};
