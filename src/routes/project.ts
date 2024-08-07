import express from "express";
import {
  createProject,
  deleteProject,
  getAllProjects,
  getProject,
  updateProject,
  getAllMyProjects,
} from "../controllers/projectController";
import { isAdmin } from "../middleware/isAdmin";

export const projectRouter = express.Router();

/**
 * @swagger
 * /projects:
 *   post:
 *     summary: Create a new project
 *     description: Only admins can create projects.
 *     responses:
 *       201:
 *         description: Project created
 *       403:
 *         description: Forbidden
 *   get:
 *     summary: Get all projects
 *     description: Retrieve a list of all projects.
 *     responses:
 *       200:
 *         description: A list of projects
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
projectRouter.route("/").post(isAdmin, createProject).get(getAllProjects);

/**
 * @swagger
 * /projects/my:
 *   get:
 *     summary: Get all my projects
 *     description: Retrieve a list of projects for the current user.
 *     responses:
 *       200:
 *         description: A list of projects for the current user
 */
projectRouter.route("/my").get(getAllMyProjects);

/**
 * @swagger
 * /projects/{id}:
 *   get:
 *     summary: Get project by ID
 *     description: Retrieve a project by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the project to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Project details
 *       404:
 *         description: Project not found
 *   put:
 *     summary: Update a project
 *     description: Only admins can update projects.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the project to update
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Project updated
 *       403:
 *         description: Forbidden
 *   delete:
 *     summary: Delete a project
 *     description: Only admins can delete projects.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the project to delete
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Project deleted
 *       403:
 *         description: Forbidden
 */
projectRouter
  .route("/:id")
  .get(getProject)
  .put(isAdmin, updateProject)
  .delete(isAdmin, deleteProject);
