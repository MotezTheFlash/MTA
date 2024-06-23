import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import asyncHandler from "express-async-handler";
import Project from "../models/project";
import { BadRequestError, NotFoundError } from "../errors";

export const createProject = asyncHandler(
  async (req: Request, res: Response) => {
    const { projectName, price, photo, type, details, status, program } =
      req.body;
    if (!projectName || !price || !status || !program) {
      throw new BadRequestError(
        "Please provide projectName, price, status, and program"
      );
    }
    const project = await Project.create({
      projectName,
      price,
      photo,
      type,
      details,
      status,
      program,
    });

    res.status(StatusCodes.CREATED).json({ project });
  }
);
export const getProject = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const project = await Project.findById(id).populate("program");
  if (!project) {
    throw new NotFoundError("Project not found");
  }
  res.status(StatusCodes.OK).json({ project });
});
export const getAllProjects = asyncHandler(
  async (req: Request, res: Response) => {
    const projects = await Project.find({}).populate("program");

    if (!projects.length) {
      throw new NotFoundError("No projects found");
    }

    res.status(StatusCodes.OK).json({ projects });
  }
);

export const updateProject = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const updates = req.body;

    const project = await Project.findByIdAndUpdate(id, updates, { new: true });

    if (!project) {
      throw new NotFoundError("Project not found");
    }

    res
      .status(StatusCodes.OK)
      .json({ message: "Project updated successfully", project });
  }
);
export const deleteProject = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const project = await Project.findByIdAndDelete(id);

    if (!project) {
      throw new NotFoundError("Project not found");
    }

    res
      .status(StatusCodes.OK)
      .json({ message: "Project deleted successfully" });
  }
);
