const API_BASE_URL = "http://localhost:8080/api/v1/pets";

export interface Pet {
  id?: number;
  name: string;
  ownerName: string;
}

export const petService = {
  async findAll(): Promise<Pet[]> {
    const response = await fetch(API_BASE_URL);
    if (!response.ok) {
      throw new Error("Failed to fetch pets");
    }
    return response.json();
  },
};
