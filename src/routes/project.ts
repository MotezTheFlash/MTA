import express from "express";
import {
  createProject,
  deleteProject,
  getAllProjects,
  getProject,
  updateProject,
} from "../controllers/projectController";
import { isAdmin } from "../middleware/isAdmin";

export const projectRouter = express.Router();

projectRouter.route("/").post(isAdmin, createProject).get(getAllProjects);

projectRouter
  .route("/:id")
  .get(getProject)
  .put(isAdmin, updateProject)
  .delete(isAdmin, deleteProject);
