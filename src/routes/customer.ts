import express from "express";
import {
  createCustomer,
  deleteCustomer,
  getAllCustomers,
  getCustomer,
  updateCustomer,
} from "../controllers/customerController";
import { isAdmin } from "../middleware/isAdmin";

export const customerRouter = express.Router();

customerRouter.route("/").post(isAdmin, createCustomer).get(getAllCustomers);

customerRouter
  .route("/:id")
  .get(getCustomer)
  .put(isAdmin, updateCustomer)
  .delete(isAdmin, deleteCustomer);
