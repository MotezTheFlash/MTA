import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import asyncHandler from "express-async-handler";
import Developer from "../models/developer";
import {
  BadRequestError,
  NotFoundError,
  UnauthenticatedError,
} from "../errors";

export const createDeveloper = asyncHandler(
  async (req: Request, res: Response) => {
    const { username, email, phone, location, status } = req.body;
    if (!username || !email || !phone) {
      throw new BadRequestError("Please provide username, email, and phone");
    }
    const developer = await Developer.create({
      username,
      email,
      phone,
      location,
      status,
    });

    res.status(StatusCodes.CREATED).json({ developer });
  }
);

export const getDeveloper = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const developer = await Developer.findById(id).populate("programs");

    if (!developer) {
      throw new NotFoundError("Developer not found");
    }

    res.status(StatusCodes.OK).json({ developer });
  }
);

export const getAllDevelopers = asyncHandler(
  async (req: Request, res: Response) => {
    const developers = await Developer.find({}).populate("programs");

    if (!developers.length) {
      throw new NotFoundError("No developers found");
    }

    res.status(StatusCodes.OK).json({ developers });
  }
);

export const updateDeveloper = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const { username, email, phone, location, status } = req.body;

    const developer = await Developer.findById(id);

    if (!developer) {
      throw new NotFoundError("Developer not found");
    }

    if (username) developer.username = username;
    if (email) developer.email = email;
    if (phone) developer.phone = phone;
    if (location) developer.location = location;
    if (status) developer.status = status;

    await developer.save();

    res
      .status(StatusCodes.OK)
      .json({ message: "Developer updated successfully", developer });
  }
);

export const deleteDeveloper = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const developer = await Developer.findById(id);

    if (!developer) {
      throw new NotFoundError("Developer not found");
    }

    await Developer.findByIdAndDelete(id);

    res
      .status(StatusCodes.OK)
      .json({ message: "Developer deleted successfully" });
  }
);
