import express from "express";
import {
  createPayment,
  deletePayment,
  getAllPayments,
  getPayment,
  updatePayment,
} from "../controllers/paymentController";
import { isAdmin } from "../middleware/isAdmin";

export const paymentRouter = express.Router();

paymentRouter.route("/").post(isAdmin, createPayment).get(getAllPayments);

paymentRouter
  .route("/:id")
  .get(getPayment)
  .put(isAdmin, updatePayment)
  .delete(isAdmin, deletePayment);
