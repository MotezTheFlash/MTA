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

/**
 * @swagger
 * /sales:
 *   post:
 *     summary: Create a new sale
 *     description: Only admins can create sales.
 *     responses:
 *       201:
 *         description: Sale created
 *       403:
 *         description: Forbidden
 *   get:
 *     summary: Get all sales
 *     description: Retrieve a list of all sales.
 *     responses:
 *       200:
 *         description: A list of sales
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   amount:
 *                     type: number
 *                   date:
 *                     type: string
 */
saleRouter.route("/").post(isAdmin, createSale).get(getAllSales);

/**
 * @swagger
 * /sales/my:
 *   get:
 *     summary: Get all my sales
 *     description: Retrieve a list of sales for the current user.
 *     responses:
 *       200:
 *         description: A list of sales for the current user
 */
saleRouter.route("/my").get(getAllMySales);

/**
 * @swagger
 * /sales/{id}:
 *   get:
 *     summary: Get sale by ID
 *     description: Retrieve a sale by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the sale to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Sale details
 *       404:
 *         description: Sale not found
 *   put:
 *     summary: Update a sale
 *     description: Only admins can update sales.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the sale to update
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Sale updated
 *       403:
 *         description: Forbidden
 *   delete:
 *     summary: Delete a sale
 *     description: Only admins can delete sales.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the sale to delete
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Sale deleted
 *       403:
 *         description: Forbidden
 */
saleRouter
  .route("/:id")
  .get(getSale)
  .put(isAdmin, updateSale)
  .delete(isAdmin, deleteSale);
