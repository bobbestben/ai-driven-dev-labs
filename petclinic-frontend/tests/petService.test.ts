import { petService } from '../src/pet/petService';

describe('PetService', () => {
  test('findAll should return pets from API', async () => {
    // This test calls the actual API, so the backend should be running
    const pets = await petService.findAll();
    
    expect(pets).toBeDefined();
    expect(Array.isArray(pets)).toBe(true);
    // We don't assert on specific content since we don't know what data exists
    // but we verify the API call succeeds and returns an array
  });
});
