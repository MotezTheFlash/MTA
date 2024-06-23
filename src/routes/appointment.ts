import express from "express";
import {
  createAppointment,
  deleteAppointment,
  getAllAppointments,
  getAppointment,
  updateAppointment,
} from "../controllers/appointmentController";
import { isAdmin } from "../middleware/isAdmin";

export const appointmentRouter = express.Router();

appointmentRouter
  .route("/")
  .post(isAdmin, createAppointment)
  .get(getAllAppointments);

appointmentRouter
  .route("/:id")
  .get(getAppointment)
  .put(isAdmin, updateAppointment)
  .delete(isAdmin, deleteAppointment);
