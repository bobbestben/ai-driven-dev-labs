import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { DataSource } from "typeorm";
import { PetService } from "../../src/pet/petService";
import { PetRepository } from "../../src/pet/petRepository";
import { createTestDataSource } from "../testDataSource";

describe("PetService", () => {
  let dataSource: DataSource;
  let petService: PetService;

  beforeEach(async () => {
    dataSource = await createTestDataSource();
    petService = new PetService(new PetRepository(dataSource));
  });

  afterEach(async () => {
    await dataSource.destroy();
  });

  it("should find pet by id", async () => {
    // given
    const id = 1;

    // when
    const result = await petService.findById(id);

    // then
    expect(result).not.toBeNull();
    expect(result?.id).toBe(1);
    expect(result?.name).toBe("Buddy");
    expect(result?.ownerName).toBe("Alice Smith");
  });

  it("should return null when pet not found", async () => {
    // given
    const id = 9999;

    // when
    const result = await petService.findById(id);

    // then
    expect(result).toBeNull();
  });

  it("should find pets by name", async () => {
    // given
    const name = "Buddy";

    // when
    const result = await petService.findByNameOrOwnerName(name);

    // then
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe("Buddy");
  });

  it("should find pets by ownerName", async () => {
    // given
    const ownerName = "Alice Smith";

    // when
    const result = await petService.findByNameOrOwnerName(undefined, ownerName);

    // then
    expect(result).toHaveLength(2);
    expect(result.every((p) => p.ownerName === "Alice Smith")).toBe(true);
  });

  it("should return all pets when no filter provided", async () => {
    // when
    const result = await petService.findByNameOrOwnerName();

    // then
    expect(result).toHaveLength(3);
  });
});
