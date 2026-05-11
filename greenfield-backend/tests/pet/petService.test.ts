import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { DataSource } from "typeorm";
import { createTestDataSource } from "../testDataSource";
import { PetRepository } from "../../src/pet/petRepository";
import { PetService } from "../../src/pet/petService";

let dataSource: DataSource;
let petService: PetService;

beforeAll(async () => {
  dataSource = await createTestDataSource();
  const petRepository = new PetRepository(dataSource);
  petService = new PetService(petRepository);
});

afterAll(async () => {
  await dataSource.destroy();
});

describe("PetService", () => {
  it("should find a pet by id", async () => {
    // given
    const id = 1;

    // when
    const pet = await petService.findById(id);

    // then
    expect(pet).not.toBeNull();
    expect(pet?.name).toBe("Leo");
    expect(pet?.ownerName).toBe("George Franklin");
  });

  it("should return null when pet id does not exist", async () => {
    // given
    const id = 99999;

    // when
    const pet = await petService.findById(id);

    // then
    expect(pet).toBeNull();
  });

  it("should find pets by name", async () => {
    // given
    const name = "Leo";

    // when
    const pets = await petService.findByName(name);

    // then
    expect(pets).toHaveLength(1);
    expect(pets[0].name).toBe("Leo");
  });

  it("should return empty list when no pet matches name", async () => {
    // given
    const name = "NonExistentPet";

    // when
    const pets = await petService.findByName(name);

    // then
    expect(pets).toHaveLength(0);
  });
});
