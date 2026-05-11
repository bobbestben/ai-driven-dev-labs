import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { DataSource } from "typeorm";
import { createTestDataSource } from "../testDataSource";
import { VetRepository } from "../../src/vet/vetRepository";
import { VetService } from "../../src/vet/vetService";

let dataSource: DataSource;
let vetService: VetService;

beforeAll(async () => {
  dataSource = await createTestDataSource();
  const vetRepository = new VetRepository(dataSource);
  vetService = new VetService(vetRepository);
});

afterAll(async () => {
  await dataSource.destroy();
});

describe("VetService", () => {
  it("should find all vets", async () => {
    // when
    const vets = await vetService.findAll();

    // then
    expect(vets.length).toBeGreaterThanOrEqual(4);
  });

  it("should find vet by id", async () => {
    // given
    const id = 1;

    // when
    const vet = await vetService.findById(id);

    // then
    expect(vet).not.toBeNull();
    expect(vet?.name).toBe("Dr. Sarah Martinez");
    expect(vet?.specialty).toBe("Surgery");
  });

  it("should return null when vet id does not exist", async () => {
    // given
    const id = 99999;

    // when
    const vet = await vetService.findById(id);

    // then
    expect(vet).toBeNull();
  });

  it("should find vet by name", async () => {
    // when
    const vet = await vetService.findByName("Dr. Sarah Martinez");

    // then
    expect(vet).not.toBeNull();
    expect(vet?.specialty).toBe("Surgery");
  });

  it("should return null when vet name does not exist", async () => {
    // when
    const vet = await vetService.findByName("Dr. NonExistent");

    // then
    expect(vet).toBeNull();
  });

  it("should find vets with different specialties", async () => {
    // when
    const surgeryVet = await vetService.findByName("Dr. Sarah Martinez");
    const dentistryVet = await vetService.findByName("Dr. James Chen");
    const generalVet = await vetService.findByName("Dr. Emily Rodriguez");
    const cardiologyVet = await vetService.findByName("Dr. Michael Thompson");

    // then
    expect(surgeryVet?.specialty).toBe("Surgery");
    expect(dentistryVet?.specialty).toBe("Dentistry");
    expect(generalVet?.specialty).toBe("General Practice");
    expect(cardiologyVet?.specialty).toBe("Cardiology");
  });
});
