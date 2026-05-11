import { Router, Request, Response } from "express";
import { VetService } from "./vetService";

export const vetRouter = Router();
const vetService = new VetService();

/**
 * @openapi
 * /api/v1/vets:
 *   get:
 *     summary: Get all vets
 *     responses:
 *       200:
 *         description: List of vets
 */
vetRouter.get("/", async (_req: Request, res: Response) => {
  const vets = await vetService.findAll();
  res.json(vets);
});

/**
 * @openapi
 * /api/v1/vets/{id}:
 *   get:
 *     summary: Find a vet by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Vet found
 *       404:
 *         description: Vet not found
 */
vetRouter.get("/:id", async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  const vet = await vetService.findById(id);
  if (!vet) {
    res.status(404).json({ message: "Vet not found" });
    return;
  }
  res.json(vet);
});
