import PDFDocument from "pdfkit";
import { Invoice } from "./invoice";
import { InvoiceRepository } from "./invoiceRepository";

export class InvoiceService {
  private invoiceRepository: InvoiceRepository;

  constructor(invoiceRepository?: InvoiceRepository) {
    this.invoiceRepository = invoiceRepository ?? new InvoiceRepository();
  }

  findAll(): Promise<Invoice[]> {
    return this.invoiceRepository.findAll();
  }

  async generatePdf(invoiceId: number): Promise<Buffer> {
    const invoice = await this.invoiceRepository.findById(invoiceId);
    if (!invoice) {
      throw new Error("Invoice not found");
    }

    return new Promise<Buffer>((resolve, reject) => {
      const doc = new PDFDocument();
      const chunks: Buffer[] = [];

      doc.on("data", (chunk: Buffer) => chunks.push(chunk));
      doc.on("end", () => resolve(Buffer.concat(chunks)));
      doc.on("error", reject);

      doc.fontSize(18).text("Invoice Details", { underline: true });
      doc.moveDown();
      doc.fontSize(12).text(`Invoice Number: ${invoice.invoiceNumber}`);
      doc.text(`Date: ${invoice.invoiceDate}`);
      doc.text(`Amount: $${invoice.amount}`);

      if (invoice.visit) {
        doc.moveDown();
        doc.fontSize(14).text("Visit Details", { underline: true });
        doc.fontSize(12).text(`Clinic: ${invoice.visit.clinic}`);
        doc.text(`Summary: ${invoice.visit.summary}`);
        if (invoice.visit.pet) {
          doc.text(`Pet: ${invoice.visit.pet.name}`);
        }
        if (invoice.visit.vet) {
          doc.text(`Vet: ${invoice.visit.vet.name}`);
        }
      }

      doc.end();
    });
  }
}
