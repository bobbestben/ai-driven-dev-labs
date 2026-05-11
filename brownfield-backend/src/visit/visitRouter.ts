import { Router, Request, Response } from "express";
import { VisitService } from "./visitService";

export const visitRouter = Router();
const visitService = new VisitService();

/**
 * @openapi
 * /api/v1/visits:
 *   get:
 *     summary: Get all visits or filter by petId
 *     parameters:
 *       - in: query
 *         name: petId
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of visits
 */
visitRouter.get("/", async (req: Request, res: Response) => {
  if (req.query.petId) {
    const petId = parseInt(req.query.petId as string, 10);
    const visits = await visitService.findByPetId(petId);
    res.json(visits);
    return;
  }
  const visits = await visitService.findAll();
  res.json(visits);
});

/**
 * @openapi
 * /api/v1/visits/{id}:
 *   get:
 *     summary: Find a visit by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Visit found
 *       404:
 *         description: Visit not found
 */
visitRouter.get("/:id", async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  const visit = await visitService.findById(id);
  if (!visit) {
    res.status(404).json({ message: "Visit not found" });
    return;
  }
  res.json(visit);
});
