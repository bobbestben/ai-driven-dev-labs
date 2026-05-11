import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { DataSource } from "typeorm";
import { createTestDataSource } from "../testDataSource";
import { PetRepository } from "../../src/pet/petRepository";
import { PetService } from "../../src/pet/petService";
import { Pet } from "../../src/pet/pet";

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
  it("should find all pets", async () => {
    // when
    const pets = await petService.findAll();

    // then
    expect(pets.length).toBeGreaterThanOrEqual(5);
  });

  it("should find pet by id", async () => {
    // given
    const id = 1;

    // when
    const pet = await petService.findById(id);

    // then
    expect(pet).not.toBeNull();
    expect(pet?.name).toBe("Max");
  });

  it("should return null when pet id does not exist", async () => {
    // given
    const id = 99999;

    // when
    const pet = await petService.findById(id);

    // then
    expect(pet).toBeNull();
  });

  it("should save a new pet", async () => {
    // given
    const pet = new Pet("Buddy", "Alice");

    // when
    const saved = await petService.save(pet);

    // then
    expect(saved.id).toBeDefined();
    expect(saved.name).toBe("Buddy");
    expect(saved.ownerName).toBe("Alice");
  });

  it("should not allow duplicate pet name for the same owner", async () => {
    // given
    const pet1 = new Pet("Rex", "Bob");
    await petService.save(pet1);
    const duplicate = new Pet("Rex", "Bob");

    // when & then
    await expect(petService.save(duplicate)).rejects.toThrow(
      "Owner Bob already has a pet named Rex",
    );
  });

  it("should allow different owners to have pets with the same name", async () => {
    // given
    const pet1 = new Pet("Charlie", "Carol");
    const pet2 = new Pet("Charlie", "Dave");

    // when
    const saved1 = await petService.save(pet1);
    const saved2 = await petService.save(pet2);

    // then
    expect(saved1.id).toBeDefined();
    expect(saved2.id).toBeDefined();
    expect(saved1.id).not.toBe(saved2.id);
  });
});
