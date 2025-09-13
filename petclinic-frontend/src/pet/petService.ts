import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api';

export interface Pet {
  id?: number;
  name: string;
  ownerName: string;
}

export class PetService {
  private apiClient = axios.create({
    baseURL: BASE_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  async findAll(): Promise<Pet[]> {
    const response = await this.apiClient.get<Pet[]>('/pets');
    return response.data;
  }

  async findById(id: number): Promise<Pet> {
    const response = await this.apiClient.get<Pet>(`/pets/${id}`);
    return response.data;
  }

  async findByName(name: string): Promise<Pet[]> {
    const response = await this.apiClient.get<Pet[]>(`/pets/search?name=${name}`);
    return response.data;
  }

  async save(pet: Pet): Promise<Pet> {
    const response = await this.apiClient.post<Pet>('/pets', pet);
    return response.data;
  }
}

export const petService = new PetService();
