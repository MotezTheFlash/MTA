import express from "express";
import {
  createCustomer,
  deleteCustomer,
  getAllCustomers,
  getCustomer,
  updateCustomer,
  getAllMyCustomers,
} from "../controllers/customerController";
import { isAdmin } from "../middleware/isAdmin";

export const customerRouter = express.Router();

/**
 * @swagger
 * /customers:
 *   post:
 *     summary: Create a new customer
 *     description: Only admins can create customers.
 *     responses:
 *       201:
 *         description: Customer created
 *       403:
 *         description: Forbidden
 *   get:
 *     summary: Get all customers
 *     description: Retrieve a list of all customers.
 *     responses:
 *       200:
 *         description: A list of customers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   email:
 *                     type: string
 */
customerRouter.route("/").post(isAdmin, createCustomer).get(getAllCustomers);

/**
 * @swagger
 * /customers/my:
 *   get:
 *     summary: Get all my customers
 *     description: Retrieve a list of customers for the current user.
 *     responses:
 *       200:
 *         description: A list of customers for the current user
 */
customerRouter.route("/my").get(getAllMyCustomers);

/**
 * @swagger
 * /customers/{id}:
 *   get:
 *     summary: Get customer by ID
 *     description: Retrieve a customer by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the customer to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Customer details
 *       404:
 *         description: Customer not found
 *   put:
 *     summary: Update a customer
 *     description: Only admins can update customers.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the customer to update
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Customer updated
 *       403:
 *         description: Forbidden
 *   delete:
 *     summary: Delete a customer
 *     description: Only admins can delete customers.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the customer to delete
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Customer deleted
 *       403:
 *         description: Forbidden
 */
customerRouter
  .route("/:id")
  .get(getCustomer)
  .put(isAdmin, updateCustomer)
  .delete(isAdmin, deleteCustomer);
