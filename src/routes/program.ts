import express from "express";
import {
  createProgram,
  deleteProgram,
  getAllPrograms,
  getProgram,
  updateProgram,
  getAllMyPrograms,
} from "../controllers/programController";
import { isAdmin } from "../middleware/isAdmin";

export const programRouter = express.Router();

/**
 * @swagger
 * /programs:
 *   post:
 *     summary: Create a new program
 *     description: Only admins can create programs.
 *     responses:
 *       201:
 *         description: Program created
 *       403:
 *         description: Forbidden
 *   get:
 *     summary: Get all programs
 *     description: Retrieve a list of all programs.
 *     responses:
 *       200:
 *         description: A list of programs
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
 *                   description:
 *                     type: string
 */
programRouter.route("/").post(isAdmin, createProgram).get(getAllPrograms);

/**
 * @swagger
 * /programs/my:
 *   get:
 *     summary: Get all my programs
 *     description: Retrieve a list of programs for the current user.
 *     responses:
 *       200:
 *         description: A list of programs for the current user
 */
programRouter.route("/my").get(getAllMyPrograms);

/**
 * @swagger
 * /programs/{id}:
 *   get:
 *     summary: Get program by ID
 *     description: Retrieve a program by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the program to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Program details
 *       404:
 *         description: Program not found
 *   put:
 *     summary: Update a program
 *     description: Only admins can update programs.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the program to update
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Program updated
 *       403:
 *         description: Forbidden
 *   delete:
 *     summary: Delete a program
 *     description: Only admins can delete programs.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the program to delete
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Program deleted
 *       403:
 *         description: Forbidden
 */
programRouter
  .route("/:id")
  .get(getProgram)
  .put(isAdmin, updateProgram)
  .delete(isAdmin, deleteProgram);
