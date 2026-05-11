import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { DataSource } from "typeorm";
import { createTestDataSource } from "../testDataSource";
import { VisitRepository } from "../../src/visit/visitRepository";
import { VisitService } from "../../src/visit/visitService";

let dataSource: DataSource;
let visitService: VisitService;

beforeAll(async () => {
  dataSource = await createTestDataSource();
  const visitRepository = new VisitRepository(dataSource);
  visitService = new VisitService(visitRepository);
});

afterAll(async () => {
  await dataSource.destroy();
});

describe("VisitService", () => {
  it("should find all visits", async () => {
    // when
    const visits = await visitService.findAll();

    // then
    expect(visits.length).toBeGreaterThanOrEqual(8);
  });

  it("should find visit by id", async () => {
    // given
    const id = 1;

    // when
    const visit = await visitService.findById(id);

    // then
    expect(visit).not.toBeNull();
    expect(visit?.clinic).toBe("Downtown Clinic");
    expect(visit?.pet).not.toBeNull();
  });

  it("should return null when visit id does not exist", async () => {
    // given
    const id = 99999;

    // when
    const visit = await visitService.findById(id);

    // then
    expect(visit).toBeNull();
  });

  it("should find visits by pet id", async () => {
    // given
    const petId = 1;

    // when
    const visits = await visitService.findByPetId(petId);

    // then
    expect(visits).toHaveLength(2);
    expect(visits.every((v) => v.pet.id === petId)).toBe(true);
  });

  it("should return empty list when no visits for pet", async () => {
    // given — pet id 5 (Rocky) has no visits in seed data
    const petId = 5;

    // when
    const visits = await visitService.findByPetId(petId);

    // then
    expect(visits).toHaveLength(0);
  });

  it("should verify visit has correct fields", async () => {
    // when
    const visit = await visitService.findById(1);

    // then
    expect(visit?.id).toBeDefined();
    expect(visit?.clinic).toBeTruthy();
    expect(visit?.summary).toBeTruthy();
    expect(visit?.dateTime).toBeTruthy();
    expect(visit?.pet).toBeDefined();
  });
});
