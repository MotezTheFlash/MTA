import express from "express";
import {
  createDeveloper,
  deleteDeveloper,
  getAllDevelopers,
  getDeveloper,
  updateDeveloper,
} from "../controllers/developerController";
import { isAdmin } from "../middleware/isAdmin";
export const developerRouter = express.Router();
developerRouter.route("/").post(isAdmin, createDeveloper).get(getAllDevelopers);
developerRouter
  .route("/:id")
  .get(getDeveloper)
  .put(isAdmin, updateDeveloper)
  .delete(isAdmin, deleteDeveloper);