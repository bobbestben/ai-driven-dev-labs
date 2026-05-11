import { Router, Request, Response } from "express";
import { InvoiceService } from "./invoiceService";

export const invoiceRouter = Router();
const invoiceService = new InvoiceService();

/**
 * @openapi
 * /api/v1/invoices:
 *   get:
 *     summary: Get all invoices
 *     responses:
 *       200:
 *         description: List of invoices
 */
invoiceRouter.get("/", async (_req: Request, res: Response) => {
  const invoices = await invoiceService.findAll();
  res.json(invoices);
});

/**
 * @openapi
 * /api/v1/invoices/{id}/pdf:
 *   get:
 *     summary: Download invoice as PDF
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: PDF file
 *         content:
 *           application/pdf:
 *             schema:
 *               type: string
 *               format: binary
 *       404:
 *         description: Invoice not found
 */
invoiceRouter.get("/:id/pdf", async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  try {
    const pdf = await invoiceService.generatePdf(id);
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=invoice-${id}.pdf`,
    );
    res.setHeader("Content-Type", "application/pdf");
    res.send(pdf);
  } catch (err) {
    res.status(404).json({ message: (err as Error).message });
  }
});
