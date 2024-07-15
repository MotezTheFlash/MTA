import express from "express";
import {
  createSale,
  deleteSale,
  getAllSales,
  getSale,
  updateSale,
  getAllMySales,
} from "../controllers/saleController";
import { isAdmin } from "../middleware/isAdmin";

export const saleRouter = express.Router();

saleRouter.route("/").post(isAdmin, createSale).get(getAllSales);
saleRouter.route("/my").get(getAllMySales);
saleRouter
  .route("/:id")
  .get(getSale)
  .put(isAdmin, updateSale)
  .delete(isAdmin, deleteSale);
