import express from "express";
import {
  createPayment,
  deletePayment,
  getAllPayments,
  getPayment,
  updatePayment,
  getAllMyPayments,
} from "../controllers/paymentController";
import { isAdmin } from "../middleware/isAdmin";

export const paymentRouter = express.Router();

/**
 * @swagger
 * /payments:
 *   post:
 *     summary: Create a new payment
 *     description: Only admins can create payments.
 *     responses:
 *       201:
 *         description: Payment created
 *       403:
 *         description: Forbidden
 *   get:
 *     summary: Get all payments
 *     description: Retrieve a list of all payments.
 *     responses:
 *       200:
 *         description: A list of payments
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
 *                   method:
 *                     type: string
 */
paymentRouter.route("/").post(isAdmin, createPayment).get(getAllPayments);

/**
 * @swagger
 * /payments/my:
 *   get:
 *     summary: Get all my payments
 *     description: Retrieve a list of payments for the current user.
 *     responses:
 *       200:
 *         description: A list of payments for the current user
 */
paymentRouter.route("/my").get(getAllMyPayments);

/**
 * @swagger
 * /payments/{id}:
 *   get:
 *     summary: Get payment by ID
 *     description: Retrieve a payment by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the payment to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Payment details
 *       404:
 *         description: Payment not found
 *   put:
 *     summary: Update a payment
 *     description: Only admins can update payments.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the payment to update
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Payment updated
 *       403:
 *         description: Forbidden
 *   delete:
 *     summary: Delete a payment
 *     description: Only admins can delete payments.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the payment to delete
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Payment deleted
 *       403:
 *         description: Forbidden
 */
paymentRouter
  .route("/:id")
  .get(getPayment)
  .put(isAdmin, updatePayment)
  .delete(isAdmin, deletePayment);
