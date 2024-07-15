import express from "express";
import {
  createProject,
  deleteProject,
  getAllProjects,
  getProject,
  updateProject,
  getAllMyProjects,
} from "../controllers/projectController";
import { isAdmin } from "../middleware/isAdmin";

export const projectRouter = express.Router();

projectRouter.route("/").post(isAdmin, createProject).get(getAllProjects);
projectRouter.route("/my").get(getAllMyProjects);
projectRouter
  .route("/:id")
  .get(getProject)
  .put(isAdmin, updateProject)
  .delete(isAdmin, deleteProject);
