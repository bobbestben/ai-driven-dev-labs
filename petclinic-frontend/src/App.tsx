import { useState, useEffect } from 'react';
import './App.css';
import { petService, type Pet } from './pet/petService';

function App() {
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const petsData = await petService.findAll();
        setPets(petsData);
      } catch (err) {
        setError('Failed to fetch pets');
        console.error('Error fetching pets:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPets();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Pet Clinic</h1>
        <h2>Our Pets</h2>
        
        {loading && <p>Loading pets...</p>}
        {error && <p className="error">{error}</p>}
        
        {!loading && !error && (
          <div className="pets-table-container">
            <table className="pets-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Pet Name</th>
                  <th>Owner Name</th>
                </tr>
              </thead>
              <tbody>
                {pets.map((pet) => (
                  <tr key={pet.id}>
                    <td>{pet.id}</td>
                    <td>{pet.name}</td>
                    <td>{pet.ownerName}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {pets.length === 0 && (
              <p className="no-pets">No pets found.</p>
            )}
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
