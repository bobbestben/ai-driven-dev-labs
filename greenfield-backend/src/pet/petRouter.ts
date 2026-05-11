import { Router, Request, Response } from "express";
import { PetService } from "./petService";

export const petRouter = Router();
const petService = new PetService();

/**
 * @openapi
 * /api/v1/pets/{id}:
 *   get:
 *     summary: Find a pet by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Pet found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Pet'
 *       404:
 *         description: Pet not found
 */
petRouter.get("/:id", async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  const pet = await petService.findById(id);
  if (!pet) {
    res.status(404).json({ message: "Pet not found" });
    return;
  }
  res.json(pet);
});

/**
 * @openapi
 * /api/v1/pets:
 *   get:
 *     summary: Find pets by name
 *     parameters:
 *       - in: query
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of pets
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Pet'
 */
petRouter.get("/", async (req: Request, res: Response) => {
  const name = req.query.name as string;
  const pets = await petService.findByName(name);
  res.json(pets);
});
