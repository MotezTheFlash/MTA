import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import asyncHandler from "express-async-handler";
import Program from "../models/program";
import { BadRequestError, NotFoundError } from "../errors";

export const createProgram = asyncHandler(
  async (req: Request, res: Response) => {
    const {
      programName,
      totalAmount,
      photo,
      type,
      details,
      status,
      developer,
    } = req.body;

    if (!programName || !totalAmount || !status || !developer) {
      throw new BadRequestError(
        "Please provide program name, total amount, status, and developer"
      );
    }

    const program = await Program.create({
      programName,
      totalAmount,
      photo,
      type,
      details,
      status,
      developer,
    });

    res.status(StatusCodes.CREATED).json({ program });
  }
);

export const getProgram = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const program = await Program.findById(id).populate("developer");

  if (!program) {
    throw new NotFoundError("Program not found");
  }

  res.status(StatusCodes.OK).json({ program });
});
export const getAllPrograms = asyncHandler(
  async (req: Request, res: Response) => {
    const programs = await Program.find({}).populate("developer");

    if (!programs.length) {
      throw new NotFoundError("No programs found");
    }

    res.status(StatusCodes.OK).json({ programs });
  }
);
export const updateProgram = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const updates = req.body;

    const program = await Program.findByIdAndUpdate(id, updates, { new: true });

    if (!program) {
      throw new NotFoundError("Program not found");
    }

    res
      .status(StatusCodes.OK)
      .json({ message: "Program updated successfully", program });
  }
);
export const deleteProgram = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const program = await Program.findByIdAndDelete(id);

    if (!program) {
      throw new NotFoundError("Program not found");
    }
    res
      .status(StatusCodes.OK)
      .json({ message: "Program deleted successfully" });
  }
);
