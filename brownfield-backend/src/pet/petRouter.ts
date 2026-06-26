import { Router, Request, Response } from "express";
import { PetService } from "./petService";
import { Pet } from "./pet";
import { AppDataSource } from "../database";
import { Owner } from "../owner/owner";

export const petRouter = Router();
const petService = new PetService();

/**
 * @openapi
 * /api/v1/pets:
 *   get:
 *     summary: Get all pets or search by name
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of pets or single pet
 */
petRouter.get("/", async (req: Request, res: Response) => {
  if (req.query.name) {
    const pet = await petService.findByName(req.query.name as string);
    res.json(pet);
    return;
  }
  const pets = await petService.findAll();
  res.json(pets);
});

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
 *   post:
 *     summary: Create a new pet
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, ownerId]
 *             properties:
 *               name:
 *                 type: string
 *               ownerId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Pet created
 *       400:
 *         description: Validation error
 */
petRouter.post("/", async (req: Request, res: Response) => {
  const { name, ownerId } = req.body as { name: string; ownerId: number };
  const owner = await AppDataSource.getRepository(Owner).findOneBy({ id: ownerId });
  if (!owner) {
    res.status(400).json({ message: `Owner with id ${ownerId} not found` });
    return;
  }
  const pet = new Pet(name, owner);
  try {
    const saved = await petService.save(pet);
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: (err as Error).message });
  }
});

/**
 * @openapi
 * /api/v1/pets/{id}:
 *   delete:
 *     summary: Delete a pet by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Pet deleted
 */
petRouter.delete("/:id", async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  await petService.delete(id);
  res.status(204).send();
});
