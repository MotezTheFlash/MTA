import express from "express";
import {
  createSale,
  deleteSale,
  getAllSales,
  getSale,
  updateSale,
} from "../controllers/saleController";
import { isAdmin } from "../middleware/isAdmin";

export const saleRouter = express.Router();

saleRouter.route("/").post(isAdmin, createSale).get(getAllSales);

saleRouter
  .route("/:id")
  .get(getSale)
  .put(isAdmin, updateSale)
  .delete(isAdmin, deleteSale);
