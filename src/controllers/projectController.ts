import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import asyncHandler from "express-async-handler";
import Project from "../models/project";
import { BadRequestError, NotFoundError } from "../errors";

export const createProject = asyncHandler(
  async (req: Request | any, res: Response) => {
    const { projectName, price, photo, type, details, status, program } =
      req.body;
    if (!projectName || !price || !status || !program) {
      throw new BadRequestError(
        "Please provide projectName, price, status, and program"
      );
    }
    const { userID } = req.user;
    const project = await Project.create({
      projectName,
      price,
      photo,
      type,
      details,
      status,
      program,
      createdBy: userID,
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
    const { status } = req.query;
    const query: any = {};

    if (status) {
      query.status = status;
    }

    const projects = await Project.find(query).populate("program");

    if (!projects.length) {
      throw new NotFoundError("No projects found");
    }

    res.status(StatusCodes.OK).json({ projects, count: projects.length });
  }
);

export const getAllMyProjects = asyncHandler(
  async (req: Request | any, res: Response) => {
    const { userID } = req.user;
    const { status } = req.query;
    const query: any = { createdBy: userID };

    if (status) {
      query.status = status;
    }

    const projects = await Project.find(query).populate("program");

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
