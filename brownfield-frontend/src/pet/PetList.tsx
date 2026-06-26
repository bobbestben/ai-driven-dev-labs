import React, { useEffect, useState } from 'react';
import { petService } from './index';
import type { Pet } from './index';

interface PetListProps {
  onPetSelect: (pet: Pet) => void;
}

const PetList: React.FC<PetListProps> = ({ onPetSelect }) => {
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadPets();
  }, []);

  const loadPets = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await petService.findAll();
      setPets(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load pets');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={{ backgroundColor: '#fbfbff', minHeight: '100vh' }}>
        <div className="container mx-auto px-8 py-8" style={{ color: '#7a7a7a' }}>Loading pets...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ backgroundColor: '#fbfbff', minHeight: '100vh' }}>
        <div className="container mx-auto px-8 py-8" style={{ color: '#7a7a7a' }}>Error: {error}</div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#fbfbff', minHeight: '100vh' }}>
      <div className="container mx-auto px-8 py-8">
        <div style={{ marginBottom: '24px' }}>
          <h2 data-testid="page-title" style={{ fontSize: '28px', fontWeight: 500, color: '#00032c', marginBottom: '4px' }}>All Pets</h2>
          <p style={{ fontSize: '16px', fontWeight: 500, color: '#747474' }}>Manage and view all pets in the directory</p>
        </div>

        {pets.length === 0 ? (
          <p style={{ color: '#7a7a7a' }}>No pets found.</p>
        ) : (
          <div style={{ borderRadius: '8px', overflow: 'hidden', border: '1px solid #e5e7eb' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ backgroundColor: '#f0f4ff' }}>
                  <th style={{ padding: '14px 24px', textAlign: 'left', fontSize: '14px', fontWeight: 600, color: '#040826' }}>User ID</th>
                  <th style={{ padding: '14px 24px', textAlign: 'left', fontSize: '14px', fontWeight: 600, color: '#040826' }}>Pet Name</th>
                  <th style={{ padding: '14px 24px', textAlign: 'left', fontSize: '14px', fontWeight: 600, color: '#040826' }}>Owner of Pet</th>
                </tr>
              </thead>
              <tbody>
                {pets.map((pet, index) => (
                  <tr
                    key={pet.id}
                    onClick={() => onPetSelect(pet)}
                    style={{
                      cursor: 'pointer',
                      borderTop: index > 0 ? '1px solid #e5e7eb' : undefined,
                      backgroundColor: '#ffffff',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f9f9ff')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#ffffff')}
                  >
                    <td style={{ padding: '14px 24px', fontSize: '14px', color: '#040826' }}>{String(pet.id).padStart(2, '0')}</td>
                    <td style={{ padding: '14px 24px', fontSize: '14px', color: '#040826' }}>{pet.name}</td>
                    <td style={{ padding: '14px 24px', fontSize: '14px', color: '#040826' }}>{pet.owner.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default PetList;
