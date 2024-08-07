import express from "express";
import {
  createDeveloper,
  deleteDeveloper,
  getAllDevelopers,
  getDeveloper,
  updateDeveloper,
  getAllMyDevelopers,
} from "../controllers/developerController";
import { isAdmin } from "../middleware/isAdmin";

export const developerRouter = express.Router();

/**
 * @swagger
 * /developers:
 *   post:
 *     summary: Create a new developer
 *     description: Only admins can create developers.
 *     responses:
 *       201:
 *         description: Developer created
 *       403:
 *         description: Forbidden
 *   get:
 *     summary: Get all developers
 *     description: Retrieve a list of all developers.
 *     responses:
 *       200:
 *         description: A list of developers
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
 *                   expertise:
 *                     type: string
 */
developerRouter.route("/").post(isAdmin, createDeveloper).get(getAllDevelopers);

/**
 * @swagger
 * /developers/my:
 *   get:
 *     summary: Get all my developers
 *     description: Retrieve a list of developers for the current user.
 *     responses:
 *       200:
 *         description: A list of developers for the current user
 */
developerRouter.route("/my").get(getAllMyDevelopers);

/**
 * @swagger
 * /developers/{id}:
 *   get:
 *     summary: Get developer by ID
 *     description: Retrieve a developer by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the developer to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Developer details
 *       404:
 *         description: Developer not found
 *   put:
 *     summary: Update a developer
 *     description: Only admins can update developers.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the developer to update
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Developer updated
 *       403:
 *         description: Forbidden
 *   delete:
 *     summary: Delete a developer
 *     description: Only admins can delete developers.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the developer to delete
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Developer deleted
 *       403:
 *         description: Forbidden
 */
developerRouter
  .route("/:id")
  .get(getDeveloper)
  .put(isAdmin, updateDeveloper)
  .delete(isAdmin, deleteDeveloper);
