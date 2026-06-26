import { useEffect, useState } from "react";
import { petService, type Pet } from "./petService";

function PetList() {
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    petService
      .findAll()
      .then((data) => setPets(data))
      .catch(() => setError("Failed to load pets"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p data-testid="pet-list-loading">Loading...</p>;
  if (error) return <p data-testid="pet-list-error">{error}</p>;

  return (
    <div data-testid="pet-list">
      <h2>Pets</h2>
      <ul>
        {pets.map((pet) => (
          <li key={pet.id} data-testid="pet-list-item">
            {pet.name} — {pet.ownerName}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PetList;
