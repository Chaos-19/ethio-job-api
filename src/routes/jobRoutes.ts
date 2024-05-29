import { Router  } from "express";
import { getJob } from "../controllers/jobController";
import { validateApiRequest } from "../middlewares/validateRequest";

const router = Router()

/**
 * @swagger
 * /api/v1/jobs:
 *   get:
 *     summary: Retrieve a list of jobs
 *     tags: [Jobs]
 *     security:
 *       - ApiKeyAuth: []
 *     parameters:
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *         description: Job title
 *       - in: query
 *         name: company
 *         schema:
 *           type: string
 *         description: Company name
 *       - in: query
 *         name: experience
 *         schema:
 *           type: string
 *         description: Experience level
 *       - in: query
 *         name: deadline
 *         schema:
 *           type: string
 *           format: date
 *         description: Application deadline
 *       - in: query
 *         name: sector
 *         schema:
 *           type: string
 *         description: Job sector
 *       - in: query
 *         name: location
 *         schema:
 *           type: string
 *         description: Job location
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *         description: Job type (e.g., full-time, part-time)
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Job category or industry
 *       - in: query
 *         name: postedDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Date the job was posted
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           enum: [postedDate, title, company, location, deadline]
 *         description: Field to sort by
 *       - in: query
 *         name: sortOrder
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *         description: Sort order (asc or desc)
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: General search term
 *     responses:
 *       200:
 *         description: A list of jobs
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: Request successful
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */

router.get('/',validateApiRequest,getJob)

export default router