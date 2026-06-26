import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import PetList from "../src/pet/PetList";
import { petService } from "../src/pet/petService";
import type { Pet } from "../src/pet/petService";

vi.mock("../src/pet/petService", () => ({
  petService: {
    findAll: vi.fn(),
  },
}));

describe("PetList", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should display loading state initially", () => {
    vi.mocked(petService.findAll).mockImplementation(() => new Promise(() => {}));

    render(<PetList />);

    expect(screen.getByTestId("pet-list-loading")).toBeDefined();
  });

  it("should display pet list when loaded successfully", async () => {
    const mockPets: Pet[] = [
      { id: 1, name: "Max", ownerName: "John" },
      { id: 2, name: "Bella", ownerName: "Jane" },
    ];

    vi.mocked(petService.findAll).mockResolvedValue(mockPets);

    render(<PetList />);

    await waitFor(() => {
      expect(screen.getByTestId("pet-list")).toBeDefined();
      const items = screen.getAllByTestId("pet-list-item");
      expect(items).toHaveLength(2);
      expect(items[0].textContent).toContain("Max");
      expect(items[1].textContent).toContain("Bella");
    });
  });

  it("should display error message when fetch fails", async () => {
    vi.mocked(petService.findAll).mockRejectedValue(new Error("Network error"));

    render(<PetList />);

    await waitFor(() => {
      expect(screen.getByTestId("pet-list-error")).toBeDefined();
      expect(screen.getByTestId("pet-list-error").textContent).toContain(
        "Failed to load pets"
      );
    });
  });
});
