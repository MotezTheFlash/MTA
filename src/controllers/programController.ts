import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import asyncHandler from "express-async-handler";
import Program from "../models/program";
import { BadRequestError, NotFoundError } from "../errors";

export const createProgram = asyncHandler(
  async (req: Request | any, res: Response) => {
    const {
      programName,
      totalAmount,
      photo,
      type,
      details,
      status,
      developer,
    } = req.body;
    const { userID } = req.user;
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
      createdBy: userID,
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
    const { status } = req.query;
    const query: any = {};

    if (status) {
      query.status = status;
    }

    const programs = await Program.find(query).populate("developer");

    /* if (!programs.length) {
      throw new NotFoundError("No programs found");
    } */

    res.status(StatusCodes.OK).json({ programs, count: programs.length });
  }
);

export const getAllMyPrograms = asyncHandler(
  async (req: Request | any, res: Response) => {
    const { userID } = req.user;
    const { status } = req.query;
    const query: any = { createdBy: userID };

    if (status) {
      query.status = status;
    }

    const programs = await Program.find(query).populate("developer");

    /* if (!programs.length) {
      throw new NotFoundError("No programs found");
    } */

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
