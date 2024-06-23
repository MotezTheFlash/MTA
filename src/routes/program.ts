import express from "express";
import {
  createProgram,
  deleteProgram,
  getAllPrograms,
  getProgram,
  updateProgram,
} from "../controllers/programController";
import { isAdmin } from "../middleware/isAdmin";

export const programRouter = express.Router();

programRouter.route("/").post(isAdmin, createProgram).get(getAllPrograms);

programRouter
  .route("/:id")
  .get(getProgram)
  .put(isAdmin, updateProgram)
  .delete(isAdmin, deleteProgram);