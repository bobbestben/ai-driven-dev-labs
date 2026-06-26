import { Router, Request, Response } from "express";
import { PetService } from "./petService";

const router = Router();
const petService = new PetService();

/**
 * @openapi
 * /api/v1/pets/{id}:
 *   get:
 *     summary: Get a pet by ID
 *     tags: [Pet]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Pet found
 *       400:
 *         description: Invalid pet ID
 *       404:
 *         description: Pet not found
 */
router.get("/api/v1/pets/:id", async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    res.status(400).json({ error: "Invalid pet ID" });
    return;
  }
  const pet = await petService.findById(id);
  if (!pet) {
    res.status(404).json({ error: "Pet not found" });
    return;
  }
  res.json(pet);
});

/**
 * @openapi
 * /api/v1/pets:
 *   get:
 *     summary: Search pets by name or owner name
 *     tags: [Pet]
 *     parameters:
 *       - in: query
 *         name: name
 *         required: false
 *         schema:
 *           type: string
 *       - in: query
 *         name: ownerName
 *         required: false
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of pets
 */
router.get("/api/v1/pets", async (req: Request, res: Response) => {
  const { name, ownerName } = req.query as { name?: string; ownerName?: string };
  const pets = await petService.findByNameOrOwnerName(name, ownerName);
  res.json(pets);
});

export { router as petRouter };
