import { describe, it, expect, beforeAll, afterAll, vi } from "vitest";
import { DataSource } from "typeorm";
import { createTestDataSource } from "../testDataSource";
import { InvoiceRepository } from "../../src/invoice/invoiceRepository";
import { InvoiceService } from "../../src/invoice/invoiceService";

let dataSource: DataSource;
let invoiceService: InvoiceService;

beforeAll(async () => {
  dataSource = await createTestDataSource();
  const invoiceRepository = new InvoiceRepository(dataSource);
  invoiceService = new InvoiceService(invoiceRepository);
});

afterAll(async () => {
  await dataSource.destroy();
});

describe("InvoiceService", () => {
  it("should find all invoices", async () => {
    // when
    const invoices = await invoiceService.findAll();

    // then
    expect(invoices.length).toBeGreaterThanOrEqual(5);
  });

  it("should find invoice with visit details", async () => {
    // given
    const invoices = await invoiceService.findAll();
    const invoice = invoices[0];

    // then
    expect(invoice.invoiceNumber).toBeTruthy();
    expect(invoice.amount).toBeGreaterThan(0);
    expect(invoice.visit).not.toBeNull();
    expect(invoice.visit.pet).not.toBeNull();
  });

  it("should generate a pdf for an invoice", async () => {
    // given
    const invoiceId = 1;

    // when
    const pdf = await invoiceService.generatePdf(invoiceId);

    // then
    expect(pdf).toBeInstanceOf(Buffer);
    expect(pdf.length).toBeGreaterThan(0);
    expect(pdf.subarray(0, 4).toString()).toBe("%PDF");
  });

  it("should throw when invoice not found for pdf generation", async () => {
    // given
    const invoiceId = 99999;

    // when & then
    await expect(invoiceService.generatePdf(invoiceId)).rejects.toThrow(
      "Invoice not found",
    );
  });
});
